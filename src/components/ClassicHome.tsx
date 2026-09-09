import { Suspense } from 'react';
import Navbar from './Navbar';
import PageTransition from './PageTransition';
import Reveal from './Reveal';
import { useT } from '../data/i18n';
import { lazyWithRetry } from '../utils/lazyWithRetry';

const About = lazyWithRetry(() => import('./About'), 'classic-about');
const Experience = lazyWithRetry(() => import('./Experience'), 'classic-experience');
const Projects = lazyWithRetry(() => import('./Projects'), 'classic-projects');
const Education = lazyWithRetry(() => import('./Education'), 'classic-education');
const Skills = lazyWithRetry(() => import('./Skills'), 'classic-skills');

const ClassicHome = () => {
  const t = useT();

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="classic-home">
          <Reveal>
            <section className="classic-hero">
              <h1>{t.classic.heroTitle}</h1>
              <p>{t.classic.heroSubtitle}</p>
            </section>
          </Reveal>
          <Suspense fallback={<div className="loader">{t.app.loading}</div>}>
            <About />
            <Experience />
            <Projects />
            <Education />
            <Skills />
          </Suspense>
        </div>
      </PageTransition>
    </>
  );
};

export default ClassicHome;
