#!/bin/bash
# Deploys the Chan-Ko website to a Google Cloud Platform GCE instance

set -e

DOMAIN="$1"
CERTBOT_EMAIL="$2"
GCE_INSTANCE_NAME="$3"
GCE_ZONE="$4"

if ! gcloud compute instances describe "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE"; then
  gcloud compute instances create "$GCE_INSTANCE_NAME" \
    --zone="$GCE_ZONE" \
    --machine-type=e2-micro \
    --tags=http-server,https-server \
    --metadata=startup-script='#! /bin/bash
      apt-get update
      apt-get install -y nginx certbot python3-certbot-nginx
      systemctl enable nginx
      systemctl start nginx
    '
fi

echo "Waiting for instance to be ready..."
sleep 90

echo "Ensure nginx is installed and running"
gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command="
  if ! command -v nginx &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y nginx certbot python3-certbot-nginx
  fi
  sudo systemctl enable nginx
  sudo systemctl start nginx
  sudo mkdir -p /var/www/html
  sudo chown -R \$(whoami):\$(whoami) /var/www/html

  echo 'Obtaining SSL certificate'
  if sudo certbot certificates | grep -q '$DOMAIN'; then
    echo 'Certificate for $DOMAIN already exists. Attempting renewal if necessary.'
    sudo certbot renew --nginx --non-interactive
  else
    echo 'No certificate found for $DOMAIN. Creating a new one.'
    sudo certbot --nginx -d '$DOMAIN' --non-interactive --agree-tos --email '$CERTBOT_EMAIL'
  fi
"

echo "Copying files..."
gcloud compute scp --recurse --zone="$GCE_ZONE" packages/chan-ko-website/dist/* "$GCE_INSTANCE_NAME":/var/www/html/

echo "Setting permissions and updating Nginx config..."
gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command='
  sudo chown -R www-data:www-data /var/www/html

  echo "Updating Nginx config to force HTTPS and improve SSL settings"
  cat << "ENDOFNGINXCONF" | sudo tee /etc/nginx/sites-available/default
server {
    listen 80;
    server_name chan-ko.com;

    # Add debugging information
    add_header X-Debug-Message "HTTP server block" always;
    add_header X-Host $host always;
    add_header X-Server-Name $server_name always;

    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name chan-ko.com;

    # Add debugging information
    add_header X-Debug-Message "HTTPS server block" always;
    add_header X-Host $host always;
    add_header X-Server-Name $server_name always;
    add_header X-URI $uri always;
    add_header X-Request-URI $request_uri always;

    ssl_certificate /etc/letsencrypt/live/chan-ko.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chan-ko.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    ssl_stapling on;
    ssl_stapling_verify on;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Disable SSL handshake debugging for better performance
    error_log /var/log/nginx/error.log warn;
}
ENDOFNGINXCONF

  echo "Nginx configuration created. Checking syntax..."
  sudo nginx -t

  if [ $? -eq 0 ]; then
    echo "Nginx syntax is correct. Restarting Nginx..."
    sudo systemctl restart nginx
  else
    echo "Nginx syntax check failed. Printing configuration file:"
    cat /etc/nginx/sites-available/default
    exit 1
  fi

  echo "Nginx status:"
  sudo systemctl status nginx

  echo "Printing Nginx configuration:"
  sudo cat /etc/nginx/sites-available/default

  echo "Testing Nginx variables:"
  echo "SERVER_NAME: chan-ko.com"
  curl -H "Host: chan-ko.com" -I http://localhost
  curl -H "Host: chan-ko.com" -I https://localhost
'

gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command="sudo mkdir -p /var/www/html && sudo chown -R \$(whoami):\$(whoami) /var/www/html"
gcloud compute scp --recurse --zone="$GCE_ZONE" packages/chan-ko-website/dist/* "$GCE_INSTANCE_NAME":/var/www/html/
gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command="sudo systemctl restart nginx"

echo "Verifying Nginx configuration file content:"
gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command="sudo cat /etc/nginx/sites-available/default"

echo "Debugging Nginx and SSL setup..."
gcloud compute ssh "$GCE_INSTANCE_NAME" --zone="$GCE_ZONE" --command="
  echo 'Nginx configuration:'
  sudo cat /etc/nginx/sites-available/default

  echo 'Nginx error log:'
  sudo tail -n 50 /var/log/nginx/error.log

  echo 'Certbot certificates:'
  sudo certbot certificates

  echo 'SSL certificate files:'
  sudo ls -l /etc/letsencrypt/live/$DOMAIN

  echo 'Nginx test output:'
  sudo nginx -t

  echo 'Firewall rules:'
  sudo iptables -L

  echo 'Listening ports:'
  sudo netstat -tuln
"

echo 'Nginx configuration in use:'
sudo nginx -T | grep -v '#'

echo 'Testing HTTP to HTTPS redirect:'
curl -I http://$DOMAIN

echo 'SSL certificate information:'
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text

echo 'Nginx warnings or errors:'
sudo journalctl -u nginx
