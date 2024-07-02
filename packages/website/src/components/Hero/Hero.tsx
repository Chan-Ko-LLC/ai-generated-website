// Hero.tsx
import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Innovate. Entertain. Transform.</h1>
        <p>Chan-Ko LLC: Empowering your Technological, Entertainment, and Edutainment Goals</p>
        <button className={styles.cta}>Discover Our Services</button>
      </div>
    </section>
  );
};

export default Hero;
