import React from 'react';
import { education } from '../data/education';
import { useT } from '../data/i18n';

const logos: Record<string, string> = {
  'Gdańsk University of Technology': '/logos/after-effects.svg',
  'The Gdańsk School of Banking': '/logos/vite.png',
};

const Education: React.FC = () => {
  const t = useT();
  return (
    <section id="education" className="education-section">
      <h2>{t.education.title}</h2>
      <div className="education-list">
        {education.map((item) => (
          <div key={item.slug} className="education-item fancy-card" style={{ borderColor: '#61dafb' }}>
            <div className="education-header">
              <img src={logos[item.organization] || '/logos/no-img.svg'} alt={item.organization} className="education-logo" />
              <div>
                <span className="education-degree">{item.degree}</span>
                <span className="education-organization">{(t.about.schools as Record<string, string>)[item.organization] || item.organization}</span>
              </div>
            </div>
            <div className="education-period-location">
              <span>{item.location}</span>
              <span>
                {item.period.from.getFullYear()} - {item.period.to.getFullYear()}
              </span>
            </div>
            <div className="education-subjects">
              <strong>{t.education.subjects}</strong> {item.subjects.join(', ')}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .education-section {
          background: none !important;
          max-width: 900px;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
        }
        .education-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem;
          margin-top: 2.5rem;
        }
        .education-item.fancy-card {
          background: rgba(255,255,255,0.85);
          border-radius: 1.2rem;
          border: 2.5px solid #1976d2;
          box-shadow: 0 4px 32px 0 rgba(31,38,135,0.10);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s, background 0.18s;
          position: relative;
        }
        .education-item.fancy-card:hover, .education-item.fancy-card:focus {
          background: rgba(227,241,255,0.92);
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 48px 0 rgba(31,38,135,0.18);
          border-color: #1976d2;
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
          font-weight: bold;
          font-size: 1.1em;
        }
        .education-organization {
          display: block;
          color: #1976d2;
          font-size: 1.05em;
        }
        .education-period-location {
          margin: 0.7em 0 0.5em 0;
          font-size: 1.08em;
          display: flex;
          justify-content: space-between;
        }
        .education-subjects {
          margin-top: 0.7em;
          font-size: 1.05em;
          color: #222b3a;
        }
        @media (prefers-color-scheme: dark) {
          .education-item.fancy-card {
            background: rgba(35,43,58,0.92) !important;
            color: #e3eaf7;
            box-shadow: 0 4px 32px 0 rgba(31,38,135,0.18);
          }
          .education-item.fancy-card:hover, .education-item.fancy-card:focus {
            background: rgba(34,48,74,0.98) !important;
            border-color: #fff;
          }
          .education-subjects {
            color: #e3eaf7;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
