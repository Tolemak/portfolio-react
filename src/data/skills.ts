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
    color: '#FFFF00',
    description: `JavaScript UX Specialist, Data Preloading Maestro, Interactive Frontend Developer, Efficient Data Loader`,
    logo: '/logos/js.png',
    name: 'Javascript',
    category: 'pro-lang'
  },
  {
    slug: 'php',
    color: '#0000FF',
    description: `PHP REST API Architect, Data Preprocessing Prodigy, API Integration Expert, SQL Data Pipeline Maestro`,
    logo: '/logos/php.svg',
    name: 'PHP',
    category: 'pro-lang'
  },
  {
    slug: 'python',
    color: '#0000FF',
    description: `Python Data Wizard, Automation Script Guru`,
    logo: '/logos/python.png',
    name: 'Python',
    category: 'pro-lang'
  },
  {
    slug: 'html',
    color: '#FFA500',
    description: 'Tworzenie semantycznych, dostępnych struktur stron internetowych.',
    logo: '/logos/html.svg',
    name: 'HTML',
    category: 'markup-style'
  },
  {
    slug: 'css',
    color: '#0000FF',
    description: 'Zaawansowane stylowanie, responsywność, animacje CSS.',
    logo: '/logos/css.svg',
    name: 'CSS',
    category: 'markup-style'
  },
  {
    slug: 'symfony',
    color: '#FFFFFF',
    description: 'Framework PHP do budowy skalowalnych aplikacji webowych.',
    logo: '/logos/symfony.svg',
    name: 'Symfony',
    category: 'framework'
  },
  {
    slug: 'bootstrap',
    color: '#EE82EE',
    description: 'Framework CSS do szybkiego prototypowania i responsywnych layoutów.',
    logo: '/logos/bootstrap.svg',
    name: 'Bootstrap',
    category: 'framework'
  },
  {
    slug: 'twig',
    color: '#008000',
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
  },
  {
    slug: 'sql',
    color: '#1976d2',
    description: 'sql',
    logo: '/logos/sap.svg',
    name: 'SQL',
    category: 'db'
  },
  {
    slug: 'vscode',
    color: '#0078d4',
    description: 'vscode',
    logo: '/logos/vscode.svg',
    name: 'Visual Studio Code',
    category: 'devtools'
  },
  {
    slug: 'docker',
    color: '#2496ed',
    description: 'docker',
    logo: '/logos/docker.svg',
    name: 'Docker',
    category: 'devtools'
  },
  {
    slug: 'vite',
    color: '#646cff',
    description: 'Szybki build tool i dev server dla nowoczesnych aplikacji frontendowych.',
    logo: '/logos/vite.png',
    name: 'Vite',
    category: 'devtools'
  },
  {
    slug: 'react-router',
    color: '#61dafb',
    description: 'Routing i nawigacja w aplikacjach React.',
    logo: '/logos/react.svg',
    name: 'React Router',
    category: 'library'
  },
  {
    slug: 'eslint',
    color: '#4b32c3',
    description: 'Statyczna analiza kodu, wymuszanie spójnego stylu i wychwytywanie błędów.',
    logo: '/logos/no-img.svg',
    name: 'ESLint',
    category: 'devtools'
  },
  {
    slug: 'mongodb',
    color: '#47A248',
    description: 'Dokumentowa baza NoSQL, elastyczne schematy, skalowalność.',
    logo: '/logos/mongodb.svg',
    name: 'MongoDB',
    category: 'db'
  },
  {
    slug: 'node',
    color: '#83CD29',
    description: 'Backend w JavaScript/TypeScript, REST API, serwery czasu rzeczywistego.',
    logo: '/logos/node.png',
    name: 'Node.js',
    category: 'framework'
  },
  {
    slug: 'redis',
    color: '#DC382D',
    description: 'Cache, rate limiting, struktury danych jako główny magazyn — nie tylko cache.',
    logo: '/logos/redis.svg',
    name: 'Redis',
    category: 'db'
  }
];
