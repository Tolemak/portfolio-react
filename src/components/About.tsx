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
							loading="lazy"
						/>
						<div>
							<h3>{card.title}</h3>
							{card.link ? (
								<p dangerouslySetInnerHTML={{ __html: card.desc }} />
							) : (
								<p>{card.desc}</p>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default About;
