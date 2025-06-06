import React from 'react';
import { experience } from '../data/experience';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <h2>Doświadczenie</h2>
      <div className="experience-list">
        {experience.map((item) => (
          <div key={item.slug} className="experience-item" style={{ borderColor: item.color }}>
            <div className="experience-header">
              <strong>{item.name}</strong> <span>({item.company})</span>
            </div>
            <div className="experience-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to ? item.period.to.getFullYear() : 'obecnie'}
              </span>
            </div>
            <div className="experience-description">{item.description}</div>
            <div className="experience-skills">
              <strong>Stack:</strong> {item.skills.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
