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
    color: '#C9A227',
    description: 'Modern frontend, interactivity, animation, dynamic UI.',
    logo: '/logos/js.png',
    name: 'Javascript',
    category: 'pro-lang'
  },
  {
    slug: 'php',
    color: '#777BB4',
    description: 'Backend, APIs, integrations, data processing.',
    logo: '/logos/php.svg',
    name: 'PHP',
    category: 'pro-lang'
  },
  {
    slug: 'python',
    color: '#4B8BBE',
    description: 'Automation, data processing, scripting.',
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
    color: '#2E9BD6',
    description: 'Zaawansowane stylowanie, responsywność, animacje CSS.',
    logo: '/logos/css.svg',
    name: 'CSS',
    category: 'markup-style'
  },
  {
    slug: 'symfony',
    color: '#94A3B8',
    description: 'Framework PHP do budowy skalowalnych aplikacji webowych.',
    logo: '/logos/symfony.svg',
    name: 'Symfony',
    category: 'framework'
  },
  {
    slug: 'twig',
    color: '#5FA832',
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
    description: 'Relational databases, queries, performance optimization.',
    logo: '/logos/sql.svg',
    name: 'SQL',
    category: 'db'
  },
  {
    slug: 'docker',
    color: '#2496ed',
    description: 'Containerization, CI/CD, environment isolation.',
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
  },
  {
    slug: 'doctrine',
    color: '#FC6A31',
    description: 'PHP ORM — entity mapping, relations, migrations, query optimization.',
    logo: '/logos/doctrine.svg',
    name: 'Doctrine',
    category: 'library'
  },
  {
    slug: 'phpunit',
    color: '#3C9CD7',
    description: 'Unit and functional backend tests, API tests, keeping coverage up.',
    logo: '/logos/phpunit.svg',
    name: 'PHPUnit',
    category: 'devtools'
  },
  {
    slug: 'github-actions',
    color: '#2088FF',
    description: 'CI/CD pipelines — tests, builds, and automated deployments.',
    logo: '/logos/github-actions.svg',
    name: 'GitHub Actions',
    category: 'devtools'
  },
  {
    slug: 'linux',
    color: '#C9971A',
    description: 'VPS administration — Apache, reverse proxy, SSL, scheduled jobs.',
    logo: '/logos/linux.svg',
    name: 'Linux',
    category: 'devtools'
  },
  {
    slug: 'openapi',
    color: '#6BA539',
    description: 'Designing REST APIs and documenting them with an OpenAPI specification.',
    logo: '/logos/openapi.svg',
    name: 'REST / OpenAPI',
    category: 'other'
  }
];
