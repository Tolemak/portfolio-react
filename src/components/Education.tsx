import React from 'react';
import { education } from '../data/education';

const Education: React.FC = () => {
  return (
    <section id="education" className="education-section">
      <h2>Edukacja</h2>
      <div className="education-list">
        {education.map((item) => (
          <div key={item.slug} className="education-item">
            <div className="education-header">
              <span className="education-degree">{item.degree}</span>
              <span className="education-organization">{item.organization}</span>
            </div>
            <div className="education-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to.getFullYear()}
              </span>
            </div>
            <div className="education-subjects">
              <strong>Subjects:</strong> {item.subjects.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
