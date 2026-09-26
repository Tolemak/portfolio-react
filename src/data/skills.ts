export interface SkillItem {
  slug: string;
  color: string;
  logo: string;
  name: string;
  category: string;
}

export const skills: SkillItem[] = [
  {
    slug: 'js',
    color: '#C9A227',
    logo: '/logos/js.png',
    name: 'Javascript',
    category: 'pro-lang'
  },
  {
    slug: 'php',
    color: '#777BB4',
    logo: '/logos/php.svg',
    name: 'PHP',
    category: 'pro-lang'
  },
  {
    slug: 'python',
    color: '#4B8BBE',
    logo: '/logos/python.png',
    name: 'Python',
    category: 'pro-lang'
  },
  {
    slug: 'html',
    color: '#FFA500',
    logo: '/logos/html.svg',
    name: 'HTML',
    category: 'markup-style'
  },
  {
    slug: 'css',
    color: '#2E9BD6',
    logo: '/logos/css.svg',
    name: 'CSS',
    category: 'markup-style'
  },
  {
    slug: 'symfony',
    color: '#94A3B8',
    logo: '/logos/symfony.svg',
    name: 'Symfony',
    category: 'framework'
  },
  {
    slug: 'twig',
    color: '#5FA832',
    logo: '/logos/twig.svg',
    name: 'Twig',
    category: 'library'
  },
  {
    slug: 'ts',
    color: '#3178c6',
    logo: '/logos/ts.png',
    name: 'TypeScript',
    category: 'pro-lang'
  },
  {
    slug: 'react',
    color: '#61dafb',
    logo: '/logos/react.svg',
    name: 'React',
    category: 'framework'
  },
  {
    slug: 'sql',
    color: '#1976d2',
    logo: '/logos/sql.svg',
    name: 'SQL',
    category: 'db'
  },
  {
    slug: 'docker',
    color: '#2496ed',
    logo: '/logos/docker.svg',
    name: 'Docker',
    category: 'devtools'
  },
  {
    slug: 'vite',
    color: '#646cff',
    logo: '/logos/vite.png',
    name: 'Vite',
    category: 'devtools'
  },
  {
    slug: 'mongodb',
    color: '#47A248',
    logo: '/logos/mongodb.svg',
    name: 'MongoDB',
    category: 'db'
  },
  {
    slug: 'node',
    color: '#83CD29',
    logo: '/logos/node.png',
    name: 'Node.js',
    category: 'framework'
  },
  {
    slug: 'redis',
    color: '#DC382D',
    logo: '/logos/redis.svg',
    name: 'Redis',
    category: 'db'
  },
  {
    slug: 'doctrine',
    color: '#FC6A31',
    logo: '/logos/doctrine.svg',
    name: 'Doctrine',
    category: 'library'
  },
  {
    slug: 'phpunit',
    color: '#3C9CD7',
    logo: '/logos/phpunit.svg',
    name: 'PHPUnit',
    category: 'devtools'
  },
  {
    slug: 'github-actions',
    color: '#2088FF',
    logo: '/logos/github-actions.svg',
    name: 'GitHub Actions',
    category: 'devtools'
  },
  {
    slug: 'linux',
    color: '#C9971A',
    logo: '/logos/linux.svg',
    name: 'Linux',
    category: 'devtools'
  },
  {
    slug: 'openapi',
    color: '#6BA539',
    logo: '/logos/openapi.svg',
    name: 'REST / OpenAPI',
    category: 'other'
  }
];
