import React, { useState } from 'react';
import AboutUs from './components/AboutUs';
import CaseStudies from './components/CaseStudies';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import './styles/global.css';

const App: React.FC = () => {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  return (
    <div className="App">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="case-studies">
            <CaseStudies
                focusedId={focusedId}
                onFocusChange={setFocusedId}
            />
        </section>
        <section id="team">
          <Team />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
