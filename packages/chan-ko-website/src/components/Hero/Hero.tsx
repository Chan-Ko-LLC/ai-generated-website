// Hero.tsx
import React, { useEffect, useState, useMemo } from 'react';
// Updated imports for the new packages
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
// Import the loadFull preset (or whichever preset you installed, e.g., loadDefaultPreset)
import { loadAll } from "@tsparticles/all"; // if you installed @tsparticles/all

import { handleScroll } from '../../shared/handlers';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  // State to track if the engine is initialized
  const [init, setInit] = useState(false);

  // This useEffect initializes the tsParticles engine once on component mount
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // You can initialize the tsParticles instance (engine) here, adding custom shapes or presets
      // Load the chosen preset. loadFull provides all features.
      // Make sure the package providing loadFull (e.g., @tsparticles/all) is installed correctly
      await loadAll(engine);
      // or await loadSlim(engine);
      // or await loadBasic(engine);
    }).then(() => {
      // Once initialized, set the state to true
      setInit(true);
    });
  }, []); // Empty dependency array ensures this runs only once

  // Memoize the options object to prevent unnecessary re-renders
  const particleOptions = useMemo(() => ({
    // The options structure itself *should* be largely the same
    // as it's defined by the core engine, not the React wrapper.
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: { enable: true }, // Ensure this is correctly typed boolean or object per docs
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800, // Ensure 'value_area' wasn't the old name if density changed
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
    // Removed background configuration to let CSS handle it
  } as const), []); // Empty dependency array for useMemo as options are static

  // Render the particles component only after the engine is initialized
  if (init) {
    return (
      <section className={styles.hero}>
        <Particles
          id="tsparticles"
          options={particleOptions}
          className={styles.particles}
        />
        {/* Content remains the same */}
        <div className={styles.content}>
          <h1>Innovate. Captivate. Educate.</h1>
          <p>
            <strong>Chan-Ko LLC</strong>
            <br />
            Empowering your Technological, Entertainment, and Educational Goals
          </p>
          <button
            className={styles.cta}
            onClick={e => handleScroll<HTMLButtonElement>(e, 'services', { behavior: 'smooth' })}>
            Discover Our Services
          </button>
        </div>
      </section>
    );
  }

  // Render nothing or a placeholder while the engine is loading
  return <section className={`${styles.hero} ${styles.loading}`} aria-busy="true"></section>; // Simple fallback
};

export default Hero;
