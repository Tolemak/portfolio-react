import React from 'react';
import { hero } from '../data/hero';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <h1>Cześć, jestem {hero.name} {hero.lastName}</h1>
      <p>{hero.description}</p>
      <div className="hero-links">
        {hero.links.map((link) => (
          <a key={link.platform} href={link.link} target="_blank" rel="noopener noreferrer">
            {link.platform}
          </a>
        ))}
      </div>
      <div className="hero-skills">
        <strong>Stack:</strong> {hero.skills.join(', ')}
      </div>
    </section>
  );
};

export default Hero;
