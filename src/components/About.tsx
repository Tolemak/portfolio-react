import React from 'react';
import { useT } from '../data/i18n';
import Reveal from './Reveal';

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '');

const About: React.FC = () => {
  const t = useT();
  return (
    <section id="about" className="about-section" aria-label={t.about.title}>
      <h2>{t.about.title}</h2>
      <div className="about-intro">
        <p>{t.about.intro}</p>
      </div>
      <div className="about-cards">
        {t.about.cards.map((card, idx) => (
          <Reveal key={card.title} delay={idx * 0.05}>
            <div className="about-card fancy-card" tabIndex={0}>
              <img
                src={card.icon}
                alt=""
                className="about-card-icon"
                loading="lazy"
                aria-hidden="true"
              />
              <div>
                {card.link ? (
                  <a
                    href={card.link}
                    aria-label={`${card.title} - ${stripHtml(card.desc)}`}
                    target={card.link.startsWith('mailto:') ? undefined : '_blank'}
                    rel={card.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  >
                    <h3>{card.title}</h3>
                    <p>{stripHtml(card.desc)}</p>
                  </a>
                ) : (
                  <>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default About;
