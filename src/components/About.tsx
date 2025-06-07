import React from 'react';

const aboutCards = [
	{
		icon: '/logos/react.svg',
		title: 'Frontend & UI',
		desc: 'Tworzę nowoczesne, interaktywne interfejsy w React, TypeScript, Svelte, z naciskiem na UX, animacje i 3D.',
	},
	{
		icon: '/logos/symfony.svg',
		title: 'Backend & API',
		desc: 'Projektuję i wdrażam API oraz backendy w PHP (Symfony), Node.js, Python. Bezpieczeństwo, wydajność, integracje.',
	},
	{
		icon: '/logos/docker.svg',
		title: 'DevOps & Cloud',
		desc: 'Automatyzacja, CI/CD, Docker, chmura. Dbam o jakość wdrożeń i stabilność środowisk.',
	},
	{
		icon: '/logos/3d.svg',
		title: 'Grafika 3D & WebGL',
		desc: 'Modele 3D, animacje, Three.js, interaktywne sceny. Portfolio to także demo moich możliwości 3D.',
	},
];

const About: React.FC = () => (
	<section
		id="about"
		className="about-section"
		style={{
			maxWidth: 900,
			margin: '4rem auto',
			padding: '2.5rem 2rem',
			background: 'rgba(30,40,60,0.85)',
			borderRadius: '1.5rem',
			color: 'var(--text-color)',
			boxShadow: '0 4px 32px 0 rgba(31,38,135,0.18)',
		}}
	>
		<h2>O mnie</h2>
		<div className="about-intro" style={{ marginBottom: '2.5rem', fontSize: '1.15em' }}>
			<p>
				Cześć! Jestem pasjonatem nowoczesnych technologii webowych, grafiki 3D i interaktywnych interfejsów. Lubię łączyć
				kreatywność z inżynierią, budując aplikacje, które nie tylko działają, ale i zachwycają wizualnie.
				<br />
				<br />
				To portfolio prezentuje moje umiejętności, projekty i ścieżkę zawodową. Zapraszam do kontaktu i współpracy!
			</p>
		</div>
		<div
			className="about-cards"
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
				gap: '2rem',
			}}
		>
			{aboutCards.map((card) => (
				<div
					className="about-card fancy-card"
					key={card.title}
					style={{
						background: 'rgba(40,50,80,0.92)',
						borderRadius: '1.2rem',
						border: '2.5px solid #61dafb',
						boxShadow: '0 4px 32px 0 rgba(31,38,135,0.18)',
						padding: '2rem 1.2rem 1.2rem 1.2rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '1.1rem',
						transition:
							'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
						position: 'relative',
					}}
				>
					<img
						src={card.icon}
						alt={card.title}
						className="about-card-icon"
						style={{
							width: '48px',
							height: '48px',
							objectFit: 'contain',
							background: '#fff',
							borderRadius: '0.5em',
							boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
							marginBottom: '0.7em',
						}}
					/>
					<div>
						<h3>{card.title}</h3>
						<p>{card.desc}</p>
					</div>
				</div>
			))}
		</div>
		<style>{`
      .about-card.fancy-card:hover, .about-card.fancy-card:focus {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 8px 48px 0 rgba(31,38,135,0.28);
        border-color: #fff;
        outline: none;
      }
    `}</style>
	</section>
);

export default About;
