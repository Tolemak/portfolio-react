import React from 'react';
import { useT } from '../data/i18n';

const About: React.FC = () => {
	const t = useT();
	return (
		<section id="about" className="about-section" aria-label="O mnie">
			<h2>{t.about.title}</h2>
			<div className="about-intro">
				<p>{t.about.intro}</p>
			</div>
			<div className="about-cards">
				{t.about.cards.map((card) => (
					<div className="about-card fancy-card" key={card.title} tabIndex={0}>
						<img
							src={card.icon}
							alt={card.title}
							className="about-card-icon"
							loading="lazy"
							role="img"
							aria-label={card.title}
						/>
						<div>
							{card.link ? (
								<a
									href={card.link}
									aria-label={card.title + ' – ' + card.desc}
									target="_blank"
									rel="noopener noreferrer"
								>
									<h3>{card.title}</h3>
									<p dangerouslySetInnerHTML={{ __html: card.desc }} />
								</a>
							) : (
								<>
									<h3>{card.title}</h3>
									<p>{card.desc}</p>
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default About;
