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
          background: rgba(30,40,60,0.85);
          border-radius: 1.5rem;
          color: var(--text-color);
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
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
          background: rgba(40,50,80,0.92);
          border-radius: 1.2rem;
          border: 2.5px solid #61dafb;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          padding: 2rem 1.2rem 1.2rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          position: relative;
        }
        .about-card.fancy-card:hover, .about-card.fancy-card:focus {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.28);
          border-color: #fff;
          outline: none;
        }
        .about-card-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: #fff;
          border-radius: 0.5em;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
          margin-bottom: 0.7em;
        }
      `}</style>
		</section>
	);
};

export default About;
