import React from 'react';
import { skills } from '../data/skills';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>Umiejętności</h2>
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.slug} className="skill-item" style={{ borderColor: skill.color }}>
            <img src={skill.logo} alt={skill.name} className="skill-logo" />
            <div className="skill-info">
              <strong>{skill.name}</strong>
              <span>{skill.category}</span>
              <p>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
