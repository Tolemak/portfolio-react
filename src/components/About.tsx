import React from 'react';
import { useT } from '../data/i18n';
import Reveal from './Reveal';

const PILLAR_ACCENT: Record<string, string> = {
  '/logos/symfony.svg': '#777BB4',
  '/logos/docker.svg': '#2496ed',
  '/logos/react.svg': '#61dafb'
};

const About: React.FC = () => {
  const t = useT();
  const pillars = t.about.cards.filter((card) => !card.link);
  const contacts = t.about.cards.filter((card) => card.link);

  return (
    <section id="about" className="about-section" aria-label={t.about.title}>
      <h2>{t.about.title}</h2>
      <div className="about-intro">
        <p>{t.about.intro}</p>
      </div>
      <div className="about-cards">
        {pillars.map((card, idx) => (
          <Reveal key={card.title} delay={idx * 0.05} className="about-card-wrap">
            <div
              className="about-card fancy-card"
              style={{ '--card-accent': PILLAR_ACCENT[card.icon] ?? 'var(--accent)' } as React.CSSProperties}
            >
              <span className="about-card-badge">
                <img src={card.icon} alt="" loading="lazy" aria-hidden="true" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="about-contact">
        {contacts.map((card, idx) => (
          <Reveal key={card.title} delay={(pillars.length + idx) * 0.05}>
            <a
              className="about-contact-pill"
              href={card.link}
              aria-label={`${card.title} - ${card.desc}`}
              target={card.link!.startsWith('mailto:') ? undefined : '_blank'}
              rel={card.link!.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              <img src={card.icon} alt="" loading="lazy" aria-hidden="true" />
              <span>
                <strong>{card.title}</strong>
                <em>{card.desc}</em>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default About;
