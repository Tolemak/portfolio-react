import { AnimatePresence, motion } from 'motion/react';
import { useT } from '../../data/i18n';
import { projects, type ProjectItem } from '../../data/projects';
import { useProjectText } from './projectText';

function ProjectDetails({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const t = useT();
  const text = useProjectText(project);
  return (
    <>
      <button type="button" className="planet-panel-close" onClick={onClose} aria-label={t.modal.close}>
        ×
      </button>
      <span className="planet-panel-type">{text.type}</span>
      <h3>{text.name}</h3>
      <p>{text.short}</p>
      <div className="planet-panel-links">
        {project.links.map((link) => (
          <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

export interface ProjectsDockProps {
  selected: string | null;
  onClose: () => void;
  onEnter: () => void;
}

/** The side panel of the projects stop: the stop's teaser, or the planet the visitor clicked. */
export default function ProjectsDock({ selected, onClose, onEnter }: ProjectsDockProps) {
  const t = useT();
  const project = selected ? projects.find((p) => p.slug === selected) : undefined;
  return (
    <div className="projects-dock" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={project?.slug ?? 'teaser'}
          className="wow-panel glass fancy-card planet-panel"
          style={{ ['--planet-color' as string]: project?.color ?? 'var(--accent)' }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {project ? (
            <ProjectDetails project={project} onClose={onClose} />
          ) : (
            <>
              <h3>{t.navbar.projects}</h3>
              <p className="wow-panel-teaser">{t.wow.teasers.projects}</p>
              <p className="wow-panel-hint">{t.wow.planetHint}</p>
              <button className="wow-enter-btn" onClick={onEnter}>
                {t.wow.enter}
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
