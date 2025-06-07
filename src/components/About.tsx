import React from 'react';
import { useT } from '../data/i18n';

const About: React.FC = () => {
	const t = useT();
	return (
		<section id="about" className="about-section">
			<h2>{t.about.title}</h2>
			<div className="about-intro">
				<p>{t.about.intro}</p>
			</div>
			<div className="about-cards">
				{t.about.cards.map((card) => (
					<div className="about-card fancy-card" key={card.title}>
						<img
							src={card.icon}
							alt={card.title}
							className="about-card-icon"
						/>
						<div>
							<h3>{card.title}</h3>
							<p>{card.desc}</p>
						</div>
					</div>
				))}
			</div>
			<style>{`
        .about-section {
          max-width: 900px;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
          background: none;
          border-radius: 1.5rem;
          color: var(--text-color);
          box-shadow: none;
        }
        .about-intro {
          margin-bottom: 2.5rem;
          font-size: 1.15em;
        }
        .about-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }
        .about-card.fancy-card {
          background: rgba(255,255,255,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.10);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.2rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, background 0.18s;
          position: relative;
        }
        .about-card.fancy-card:hover, .about-card.fancy-card:focus {
          background: rgba(227,241,255,0.92);
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.18);
          border-color: #1976d2;
          outline: none;
        }
        .about-card-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: #fff;
          border-radius: 0.5em;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .about-card h3 {
          margin: 0 0 0.5em 0;
          color: #1976d2;
        }
        .about-card p {
          margin: 0;
          color: #222b3a;
        }
        @media (prefers-color-scheme: dark) {
          .about-card.fancy-card {
            background: rgba(35,43,58,0.92) !important;
            color: #e3eaf7;
            box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          }
          .about-card.fancy-card:hover, .about-card.fancy-card:focus {
            background: rgba(34,48,74,0.98) !important;
            border-color: #fff;
          }
          .about-card h3 {
            color: #61dafb;
          }
          .about-card p {
            color: #e3eaf7;
          }
        }
      `}</style>
		</section>
	);
};

export default About;
