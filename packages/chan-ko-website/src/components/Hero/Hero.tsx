// Hero.tsx
import React, {MouseEvent} from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {

  const handleScroll = (e: MouseEvent<HTMLButtonElement>, id: string): void => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Innovate. Captivate. Educate.</h1>
        <p>
          <strong>Chan-Ko LLC</strong>
          <br></br>
          Empowering your Technological, Entertainment, and Edutainment Goals
        </p>
        <button className={styles.cta} onClick={e => handleScroll(e, 'services')}>Discover Our Services</button>
      </div>
    </section>
  );
};

export default Hero;
