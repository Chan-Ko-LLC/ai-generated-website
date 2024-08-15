// Services.tsx
import React from 'react';
import styles from './Services.module.css';

const Services: React.FC = () => {
  return (
    <div className={styles.services}>
      <h2>Services</h2>
      <div className={styles.content}>
        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <h3>Technology Expertise</h3>
            <ul>
              <li>Fractional CTO Services</li>
              <li>Cloud Computing & Big Data</li>
              <li>Artificial Intelligence & Machine Learning</li>
              <li>Blockchain & Cryptocurrency</li>
            </ul>
          </div>
          <div className={styles.highlight}>
            <h3>Entertainment Focus</h3>
            <ul>
              <li>Digital Content Creation</li>
              <li>Streaming Platforms</li>
              <li>Interactive Media</li>
              <li>Gaming & eSports</li>
            </ul>
          </div>
          <div className={styles.highlight}>
            <h3>EdTech Offerings</h3>
            <ul>
              <li>Technology Integration Strategy</li>
              <li>Digital Learning Platform Evaluation</li>
              <li>Teacher Training and Skills Development</li>
              <li>Knowledge Retention Analysis Over Time</li>
            </ul>
          </div>
        </div>
      </div>
      <br></br><br></br>
      <center>
        <a href="#contact">
        <button className={styles.link}>Contact Us</button>
        </a>
        </center>
    </div>
  );
};

export default Services;
