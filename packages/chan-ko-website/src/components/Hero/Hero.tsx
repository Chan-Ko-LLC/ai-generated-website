// Hero.tsx
import React from 'react';
import { handleScroll } from '../../shared/handlers';
import styles from './Hero.module.css';

const Hero: React.FC = () => {

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Innovate. Captivate. Educate.</h1>
        <p>
          <strong>Chan-Ko LLC</strong>
          <br></br>
          Empowering your Technological, Entertainment, and Edutainment Goals
        </p>
        <button
          className={styles.cta}
          onClick={e => handleScroll<HTMLButtonElement>(e, 'services', { behavior: 'smooth' })}>Discover Our Services</button>
      </div>
    </section>
  );
};

export default Hero;
