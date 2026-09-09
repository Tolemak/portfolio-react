export interface ProjectItem {
  slug: string;
  color: string;
  description: string;
  shortDescription: string;
  links: { to: string; label: string }[];
  logo: string;
  name: string;
  period: { from: Date; to?: Date };
  skills: string[];
  type: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'file-actions',
    color: '#4caf50',
    description:
      'A Symfony backend for batch file processing: resizing, format conversion, compression, and image filters. Processing is built on Imagick; the app is Dockerized, covered by PHPUnit tests, and deployed automatically to my own server.',
    shortDescription:
      'Batch file processing in the browser — resize, convert, compress.',
    links: [
      { to: 'https://file-actions.tolemak.pl/', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/FileActions_BackendDemo', label: 'GitHub' }
    ],
    logo: '/logos/symfony.svg',
    name: 'File Actions',
    period: { from: new Date('2025-04-01') },
    skills: ['php','symfony','bootstrap','js', 'ts', 'html', 'css'],
    type: 'Web Application'
  },
  {
    slug: 'old-portfolio',
    color: '#1976d2',
    description:
      'Moje poprzednie portfolio, dostępne pod adresem old-portfolio.tolemak.pl. Projekt powstał w oparciu o inne technologie niż obecna wersja. Kod źródłowy znajduje się na moim GitHubie jako repozytorium "portfolio".',
    shortDescription:
      'Stare portfolio – zobacz poprzednią wersję strony.',
    links: [
      { to: 'https://old-portfolio.tolemak.pl', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/portfolio', label: 'GitHub' }
    ],
    logo: '/logos/svelte.png',
    name: 'Old Portfolio',
    period: { from: new Date('2022-01-01') },
    skills: ['js', 'css', 'html'],
    type: 'Portfolio'
  },
  {
    slug: 'mathema',
    color: '#3498db',
    description:
      'Aplikacja do ćwiczenia matematyki: zestawy zadań w kilku kategoriach, tryb interaktywny i śledzenie postępów. Wyniki trafiają do wspólnej tablicy liderów zasilanej backendem Node.js/Express z bazą SQLite.',
    shortDescription: 'Interaktywna aplikacja do nauki matematyki.',
    links: [
      { to: 'https://mathema.tolemak.pl/', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/mathema', label: 'GitHub' }
    ],
    logo: '/logos/react.svg',
    name: 'Mathema',
    period: { from: new Date('2025-06-01') },
    skills: ['react', 'vite', 'ts', 'react-router', 'css', 'node'],
    type: 'Web Application'
  },
  {
    slug: 'lecture-backend',
    color: '#e91e63',
    description:
      'REST API do zarządzania wykładami i zapisami studentów, zbudowane w Symfony z bazą MongoDB. Architektura warstwowa z wyraźnym rozdzieleniem logiki domenowej, persystencji i warstwy API, pokryta testami i udokumentowana specyfikacją OpenAPI.',
    shortDescription: 'REST API do zarządzania wykładami — Symfony, MongoDB, architektura warstwowa.',
    links: [
      { to: 'https://github.com/Tolemak/LectureBackend_BackendDemo', label: 'GitHub' }
    ],
    logo: '/logos/mongodb.svg',
    name: 'Lecture Backend',
    period: { from: new Date('2025-06-01') },
    skills: ['php', 'symfony', 'mongodb', 'docker'],
    type: 'Web Application'
  },
  {
    slug: 'crypto-pulse',
    color: '#DC382D',
    description:
      'Symfony API agregujące ceny kryptowalut z Binance, Kraken i Coinbase, cache\'owane w Redisie, z alertami progowymi dostarczanymi webhookiem. Redis jako główny magazyn (nie tylko cache) — struktury danych dla alertów, rate limiting per giełda i per klient. Osobny frontend w React pokazuje ceny na żywo.',
    shortDescription: 'Agregator cen krypto z kilku giełd, alerty webhookowe, Redis jako główny magazyn danych.',
    links: [
      { to: 'https://crypto-pulse.tolemak.pl/', label: 'Live Demo' },
      { to: 'https://github.com/Tolemak/CryptoPulse_BackendDemo', label: 'GitHub' }
    ],
    logo: '/logos/redis.svg',
    name: 'CryptoPulse',
    period: { from: new Date('2026-09-09') },
    skills: ['php', 'symfony', 'redis', 'docker', 'react', 'ts', 'vite'],
    type: 'Web Application'
  },
  {
    slug: 'current-portfolio',
    color: '#6A0DAD',
    description:
      'Moje obecne portfolio, które właśnie przeglądasz. Zbudowane przy użyciu nowoczesnych technologii webowych, aby zaprezentować moje umiejętności i projekty w interaktywny i responsywny sposób.',
    shortDescription:
      'Interaktywne portfolio prezentujące moje projekty i umiejętności.',
    links: [
      { to: 'https://github.com/Tolemak/portfolio-react', label: 'GitHub' }
    ],
    logo: '/logos/vite.png',
    name: 'Current Portfolio',
    period: { from: new Date('2025-06-01') },
    skills: ['react', 'vite', 'ts', 'css', 'eslint'],
    type: 'Portfolio'
  }
];
