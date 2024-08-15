// Header.tsx
import React, {useState} from 'react';
import {MenuIcon, XIcon} from 'lucide-react';
import styles from './Header.module.css';
import {handleScroll} from '../../shared/handlers';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Chan-Ko_Logo_transparent.png" alt="Chan-Ko LLC Logo" />
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <a href="#home" onClick={e => handleScroll<HTMLAnchorElement>(e, 'home', { behavior: 'smooth' }, true)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={e => handleScroll<HTMLAnchorElement>(e, 'about', { behavior: 'smooth' }, true)}>
              About
            </a>
          </li>
          <li>
            <a href="#services" onClick={e => handleScroll<HTMLAnchorElement>(e, 'services', { behavior: 'smooth' }, true)}>
              Services
            </a>
          </li>
          <li>
            <a href="#case-studies" onClick={e => handleScroll<HTMLAnchorElement>(e, 'case-studies', { behavior: 'smooth' }, true)}>
              Case Studies
            </a>
          </li>
          <li>
            <a href="#team" onClick={e => handleScroll<HTMLAnchorElement>(e, 'team', { behavior: 'smooth' }, true)}>
              Team
            </a>
          </li>
          <li>
            <a href="#contact" onClick={e => handleScroll<HTMLAnchorElement>(e, 'contact', { behavior: 'smooth' }, true)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <XIcon /> : <MenuIcon />}
      </button>
    </header>
  );
};

export default Header;
