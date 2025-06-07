import React from 'react';

const About: React.FC = () => (
  <section id="about" className="about-section" style={{ maxWidth: 700, margin: '4rem auto', padding: '2rem', background: 'rgba(0,0,0,0.5)', borderRadius: '1.5rem', color: 'var(--text-color)' }}>
    <h2>About Me</h2>
    <p>
      Hi! I'm a passionate developer with experience in web technologies, 3D graphics, and interactive UI design. I enjoy building modern, visually engaging applications and learning new tools and frameworks. <br /><br />
      This portfolio showcases my skills, projects, and professional journey. Feel free to explore and contact me if you'd like to collaborate or learn more!
    </p>
    {/* Możesz dodać więcej szczegółów lub sekcję kontaktową */}
  </section>
);

export default About;
