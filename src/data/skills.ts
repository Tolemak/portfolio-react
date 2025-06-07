// Skills data migrated from Svelte version
export interface SkillItem {
  slug: string;
  color: string;
  description: string;
  logo: string;
  name: string;
  category: string;
}

export const skills: SkillItem[] = [
  {
    slug: 'js',
    color: 'yellow',
    description: `JavaScript UX Specialist, Data Preloading Maestro, Interactive Frontend Developer, Efficient Data Loader`,
    logo: '/logos/js.png',
    name: 'Javascript',
    category: 'pro-lang'
  },
  {
    slug: 'php',
    color: 'blue',
    description: `PHP REST API Architect, Data Preprocessing Prodigy, API Integration Expert, SQL Data Pipeline Maestro`,
    logo: '/logos/php.svg',
    name: 'PHP',
    category: 'pro-lang'
  },
  {
    slug: 'python',
    color: 'blue',
    description: `Python Data Wizard, Automation Script Guru`,
    logo: '/logos/python.png',
    name: 'Python',
    category: 'pro-lang'
  },
  {
    slug: 'html',
    color: 'orange',
    description: 'Tworzenie semantycznych, dostępnych struktur stron internetowych.',
    logo: '/logos/html.svg',
    name: 'HTML',
    category: 'markup-style'
  },
  {
    slug: 'css',
    color: 'blue',
    description: 'Zaawansowane stylowanie, responsywność, animacje CSS.',
    logo: '/logos/css.svg',
    name: 'CSS',
    category: 'markup-style'
  },
  {
    slug: 'symfony',
    color: 'white',
    description: 'Framework PHP do budowy skalowalnych aplikacji webowych.',
    logo: '/logos/symfony.svg',
    name: 'Symfony',
    category: 'framework'
  },
  {
    slug: 'bootstrap',
    color: 'violet',
    description: 'Framework CSS do szybkiego prototypowania i responsywnych layoutów.',
    logo: '/logos/bootstrap.svg',
    name: 'Bootstrap',
    category: 'framework'
  },
  {
    slug: 'twig',
    color: 'green',
    description: 'Szablony PHP, makra, formatowanie danych.',
    logo: '/logos/twig.svg',
    name: 'Twig',
    category: 'library'
  },
  {
    slug: 'ts',
    color: '#3178c6',
    description: 'TypeScript – typowany JavaScript, skalowalność, bezpieczeństwo.',
    logo: '/logos/ts.png',
    name: 'TypeScript',
    category: 'pro-lang'
  },
  {
    slug: 'react',
    color: '#61dafb',
    description: 'React – nowoczesne SPA, komponenty, hooki.',
    logo: '/logos/react.svg',
    name: 'React',
    category: 'framework'
  }
];
