import React from 'react';
import { education } from '../data/education';

const logos: Record<string, string> = {
  'Gdańsk University of Technology': '/logos/after-effects.svg', // przykładowa ikona, podmień na właściwą jeśli masz
  'The Gdańsk School of Banking': '/logos/vite.png', // przykładowa ikona
};

const Education: React.FC = () => {
  return (
    <section id="education" className="education-section">
      <h2>Edukacja</h2>
      <div className="education-list">
        {education.map((item) => (
          <div key={item.slug} className="education-item fancy-card" style={{ borderColor: '#61dafb' }}>
            <div className="education-header">
              <img src={logos[item.organization] || '/logos/no-img.svg'} alt={item.organization} className="education-logo" />
              <div>
                <span className="education-degree">{item.degree}</span>
                <span className="education-organization">{item.organization}</span>
              </div>
            </div>
            <div className="education-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to.getFullYear()}
              </span>
            </div>
            <div className="education-subjects">
              <strong>Przedmioty:</strong> {item.subjects.join(', ')}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .education-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .education-item.fancy-card {
          background: rgba(30,40,60,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          position: relative;
        }
        .education-item.fancy-card:hover, .education-item.fancy-card:focus {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.28);
          border-color: #fff;
          outline: none;
        }
        .education-header {
          display: flex;
          align-items: center;
          gap: 1.2em;
        }
        .education-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          background: #fff;
          border-radius: 0.5em;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .education-degree {
          font-size: 1.1em;
          font-weight: bold;
        }
        .education-organization {
          display: block;
          color: #61dafb;
          font-size: 1em;
        }
        .education-period-location {
          display: flex;
          gap: 1.2em;
          color: #aaa;
          font-size: 1em;
        }
        .education-subjects {
          margin-top: 0.5em;
        }
      `}</style>
    </section>
  );
};

export default Education;
