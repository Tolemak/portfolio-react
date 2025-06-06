import React from 'react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <h2>Projekty</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.slug} className="project-card" style={{ borderColor: project.color }}>
            <div className="project-header">
              <img src={project.logo} alt={project.name} className="project-logo" />
              <h3>{project.name}</h3>
            </div>
            <p>{project.shortDescription}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">{link.label}</a>
              ))}
            </div>
            <div className="project-skills">
              <strong>Stack:</strong> {project.skills.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
