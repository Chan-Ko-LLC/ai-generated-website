// AboutUs.tsx
import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <div className={styles.aboutUs}>
      <h2>About Chan-Ko LLC</h2>
      <div className={styles.content}>
        <div className={styles.description}>
          <p>
            Chan-Ko LLC is a cutting-edge consultancy at the intersection of technology, education,
            and entertainment. We bring together multiple vectors of expertise to deliver innovative
            solutions that captivate, educate, and drive business growth.
          </p>
          <p>
            With years of experience in software development, statistical analysis, artificial
            intelligence, content creation, and media production, our team is uniquely positioned to
            help clients navigate the rapidly evolving digital landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
