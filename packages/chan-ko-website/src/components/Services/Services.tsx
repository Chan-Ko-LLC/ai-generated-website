// Services.tsx
import React from 'react';
import styles from './Services.module.css';
import { handleScroll } from '../../shared/handlers';

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
              <li>Time Series Analysis</li>
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
              <li>E-Rate Grant Technology Services</li>
            </ul>
          </div>
        </div>
      </div>
      <br></br><br></br>
      <center>
        <button
          className={styles.link}
          onClick={e => handleScroll<HTMLButtonElement>(e, 'contact', { behavior: 'smooth' })}>
            Contact Us
        </button>
        </center>
    </div>
  );
};

export default Services;
