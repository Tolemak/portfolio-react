export type Lang = 'pl' | 'en';

export const translations = {
  pl: {
    about: {
      title: 'O mnie',
      intro: 'Nazywam się Kamil Gałkowski i jestem backend developerem. Od 2020 roku komercyjnie projektuję i utrzymuję aplikacje webowe w PHP i Symfony — API, integracje z systemami zewnętrznymi, warstwa danych i wydajność. Testy traktuję jako część procesu, a nie dodatek; wdrożenia i CI/CD prowadzę samodzielnie, na własnej infrastrukturze. Frontend w React i TypeScript jest uzupełnieniem tego warsztatu — dzięki niemu dowożę funkcjonalność end-to-end.',
      cards: [
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'Projektuję API i logikę domenową w PHP/Symfony oraz Node.js. Architektura warstwowa, testy jako element procesu, integracje z systemami zewnętrznymi, modelowanie i optymalizacja warstwy danych.' },
        { icon: '/logos/docker.svg', title: 'Infrastruktura & CI/CD', desc: 'Docker, pipeline’y w GitHub Actions, wdrożenia na własny VPS — reverse proxy, SSL, zadania cykliczne. Utrzymuję produkcyjnie to, co wypuszczam.' },
        { icon: '/logos/react.svg', title: 'Frontend', desc: 'React i TypeScript tam, gdzie backend potrzebuje interfejsu — SPA, dwujęzyczność, dostępność i wydajność.' },
        { icon: '/logos/github-mark.svg', title: 'GitHub', desc: '<a href="https://github.com/Tolemak" target="_blank" rel="noopener noreferrer" class="about-link">github.com/Tolemak</a>', link: 'https://github.com/Tolemak' },
        { icon: '/logos/linkedin-svgrepo-com.svg', title: 'LinkedIn', desc: '<a href="https://www.linkedin.com/in/kamil-ga%C5%82kowski-544a781aa/" target="_blank" rel="noopener noreferrer" class="about-link">linkedin.com/in/kamil-gałkowski-544a781aa</a>', link: 'https://www.linkedin.com/in/kamil-ga%C5%82kowski-544a781aa/' },
        { icon: '/logos/email-svgrepo-com.svg', title: 'Email', desc: '<a href="mailto:tolemak.pancreas694@slmail.me" class="about-link">tolemak.pancreas694@slmail.me</a>', link: 'mailto:tolemak.pancreas694@slmail.me' }
      ],
      schools: {
        'Gdańsk University of Technology': 'Politechnika Gdańska',
        'The Gdańsk School of Banking': 'Wyższa Szkoła Bankowa w Gdańsku'
      }
    },
    experience: {
      title: 'Doświadczenie',
      stack: 'Stack:',
      usedIn: 'Używane w doświadczeniach:',
      current: 'obecnie',
      tiles: {
        'favourite-computer-systems-developer': {
          desc: 'Rozwój i utrzymanie aplikacji webowych dla klientów Favourite Computer Systems. Tworzenie nowych funkcjonalności i integracji z zewnętrznymi API w odpowiedzi na potrzeby klienta.',
          name: 'Programista Aplikacji Webowych'
        },
        'wskz-backend-developer': {
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          name: 'Programista Backend'
        }
      }
    },
    skills: {
      title: 'Umiejętności',
      all: 'Wszystkie',
      usedIn: 'Używane w doświadczeniach:',
      categories: {
        'pro-lang': 'Języki programowania',
        'framework': 'Frameworki',
        'library': 'Biblioteki',
        'markup-style': 'HTML/CSS',
        'devtools': 'Narzędzia',
        'db': 'Bazy danych',
        'other': 'Inne'
      },
      descs: {
        js: 'Nowoczesny frontend, interaktywność, animacje, dynamiczne UI.',
        php: 'Backend, API, integracje, przetwarzanie danych.',
        python: 'Automatyzacja, przetwarzanie danych, skrypty.',
        html: 'Semantyczne struktury stron, dostępność, SEO.',
        css: 'Stylowanie, responsywność, animacje, nowoczesne layouty.',
        symfony: 'Framework PHP do dużych, skalowalnych aplikacji webowych.',
        twig: 'System szablonów dla PHP, oddzielenie logiki od widoku.',
        ts: 'Typowany JavaScript, większe bezpieczeństwo i skalowalność kodu.',
        react: 'Nowoczesne SPA, komponenty, hooki, zarządzanie stanem.',
        sql: 'Relacyjne bazy danych, zapytania, optymalizacja wydajności.',
        docker: 'Konteneryzacja aplikacji, CI/CD, izolacja środowisk.',
        vite: 'Szybki build tool i dev server dla nowoczesnych aplikacji frontendowych.',
        mongodb: 'Dokumentowa baza NoSQL, elastyczne schematy, skalowalność.',
        node: 'Backend w JavaScript/TypeScript, REST API, serwery czasu rzeczywistego.',
        redis: 'Cache, rate limiting, struktury danych jako główny magazyn — nie tylko cache.',
        doctrine: 'ORM dla PHP — mapowanie encji, relacje, migracje, optymalizacja zapytań.',
        phpunit: 'Testy jednostkowe i funkcjonalne backendu, testy API, utrzymywanie pokrycia.',
        'github-actions': 'Pipeline\'y CI/CD — testy, build i automatyczne wdrożenia na własny serwer.',
        linux: 'Administracja serwerem VPS — Apache, reverse proxy, SSL, zadania cykliczne.',
        openapi: 'Projektowanie REST API i dokumentowanie ich specyfikacją OpenAPI.'
      }
    },
    projects: {
      title: 'Projekty',
      stack: 'Stack:',
      types: {
        'Web Application': 'Aplikacja webowa',
        'Portfolio': 'Portfolio'
      },
      names: {
        'File Actions': 'File Actions',
        'Old Portfolio': 'Stare Portfolio',
        'Mathema': 'Mathema',
        'Lecture Backend': 'Lecture Backend',
        'CryptoPulse': 'CryptoPulse',
        'Current Portfolio': 'Aktualne Portfolio'
      },
      tiles: {
        'CryptoPulse': {
          short: 'Agregator cen krypto z kilku giełd, alerty webhookowe, Redis jako główny magazyn danych.',
          desc: 'Symfony API agregujące ceny kryptowalut z Binance, Kraken i Coinbase, cache\'owane w Redisie, z alertami progowymi dostarczanymi webhookiem. Redis jako główny magazyn (nie tylko cache) — struktury danych dla alertów, rate limiting per giełda i per klient. Osobny frontend w React pokazuje ceny na żywo.'
        },
        'File Actions': {
          short: 'Wsadowe przetwarzanie plików w przeglądarce — zmiana rozmiaru, konwersja, kompresja.',
          desc: 'Backend w Symfony do wsadowego przetwarzania plików: zmiana rozmiaru, konwersja formatów, kompresja i filtry graficzne. Przetwarzanie oparte na Imagick, aplikacja zdockeryzowana, pokryta testami PHPUnit i wdrażana automatycznie na własny serwer.'
        },
        'Old Portfolio': {
          short: 'Stare portfolio – zobacz poprzednią wersję strony.',
          desc: 'Moje poprzednie portfolio, dostępne pod adresem old-portfolio.tolemak.pl. Projekt powstał w oparciu o inne technologie niż obecna wersja. Kod źródłowy znajduje się na moim GitHubie jako repozytorium "portfolio".'
        },
        'Mathema': {
          short: 'Interaktywna aplikacja do nauki matematyki.',
          desc: 'Aplikacja do ćwiczenia matematyki: zestawy zadań w kilku kategoriach, tryb interaktywny i śledzenie postępów. Wyniki trafiają do wspólnej tablicy liderów zasilanej backendem Node.js/Express z bazą SQLite, z ograniczaniem liczby zapytań po stronie API.'
        },
        'Lecture Backend': {
          short: 'REST API do zarządzania wykładami — Symfony, MongoDB, architektura warstwowa.',
          desc: 'REST API do zarządzania wykładami i zapisami studentów, zbudowane w Symfony z bazą MongoDB. Architektura warstwowa z wyraźnym rozdzieleniem logiki domenowej, persystencji i warstwy API, pokryta testami i udokumentowana specyfikacją OpenAPI.'
        },
        'Current Portfolio': {
          short: 'Portfolio, które właśnie przeglądasz — React, TypeScript, dwa tryby przeglądania.',
          desc: 'Portfolio, które właśnie przeglądasz. React z TypeScriptem, dwa tryby przeglądania (przelot 3D po stacji kosmicznej oraz szybki tryb klasyczny), pełna dwujęzyczność PL/EN, testy jednostkowe i automatyczne wdrożenie na własny VPS przez GitHub Actions.'
        }
      }
    },
    education: {
      title: 'Edukacja',
      subjects: 'Przedmioty:',
      degree: {
        'Bachelor degree of biomedical engineering': 'Tytuł inżyniera, Inżynieria Biomedyczna',
        'Master degree of IT project management': 'Tytuł magistra, Zarządzanie Projektami IT',
      }
    },
    navbar: {
      home: 'Strona główna',
      about: 'O mnie',
      experience: 'Doświadczenie',
      projects: 'Projekty',
      education: 'Edukacja',
      skills: 'Umiejętności',
      switchToWow: 'Włącz tryb WOW',
      switchToClassic: 'Włącz tryb Classic'
    },
    wow: {
      hint: 'Przewiń, by lecieć przez stację. Strzałki i kropki też działają.',
      enter: 'Wejdź',
      prev: 'Poprzedni przystanek',
      next: 'Następny przystanek',
      jumpTo: 'Przejdź do sekcji',
      teasers: {
        about: 'Poznaj mnie — kim jestem i czym się zajmuję.',
        skills: 'Technologie, z którymi pracuję na co dzień.',
        projects: 'Przegląd zrealizowanych projektów.',
        education: 'Moja ścieżka edukacyjna.',
        experience: 'Ścieżka zawodowa i zakres odpowiedzialności.'
      }
    },
    classic: {
      heroTitle: 'Kamil Gałkowski',
      heroSubtitle: 'Backend developer — PHP/Symfony, API, Docker i wdrożenia na własnej infrastrukturze.'
    },
    modal: {
      close: 'Zamknij'
    },
    app: {
      skipLink: 'Przejdź do treści',
      loading: 'Ładowanie...'
    },
    notFound: {
      title: '404',
      message: 'Nie znaleziono strony lub zasobu.',
      cta: 'Powrót na stronę główną'
    },
    errorBoundary: {
      title: 'Coś poszło nie tak',
      message: 'Nie udało się załadować tej treści. Spróbuj odświeżyć stronę.',
      cta: 'Odśwież stronę'
    }
  },
  en: {
    about: {
      title: 'About Me',
      intro: `My name is Kamil Gałkowski and I'm a backend developer. Since 2020 I have been designing and maintaining web applications in PHP and Symfony commercially — APIs, integrations with external systems, the data layer, and performance. I treat tests as part of the process rather than an afterthought, and I run deployments and CI/CD myself, on my own infrastructure. React and TypeScript on the frontend complement that toolkit — they let me deliver features end to end.`,
      cards: [
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'I design APIs and domain logic in PHP/Symfony and Node.js. Layered architecture, tests as part of the process, integrations with external systems, data modelling and query optimisation.' },
        { icon: '/logos/docker.svg', title: 'Infrastructure & CI/CD', desc: 'Docker, GitHub Actions pipelines, deployments to my own VPS — reverse proxy, SSL, scheduled jobs. I keep in production everything I ship.' },
        { icon: '/logos/react.svg', title: 'Frontend', desc: 'React and TypeScript where the backend needs an interface — SPAs, bilingual UI, accessibility, and performance.' },
        { icon: '/logos/github-mark.svg', title: 'GitHub', desc: '<a href="https://github.com/Tolemak" target="_blank" rel="noopener noreferrer" class="about-link">github.com/Tolemak</a>', link: 'https://github.com/Tolemak' },
        { icon: '/logos/linkedin-svgrepo-com.svg', title: 'LinkedIn', desc: '<a href="https://www.linkedin.com/in/kamil-ga%C5%82kowski-544a781aa/" target="_blank" rel="noopener noreferrer" class="about-link">linkedin.com/in/kamil-gałkowski-544a781aa</a>', link: 'https://www.linkedin.com/in/kamil-ga%C5%82kowski-544a781aa/' },
        { icon: '/logos/email-svgrepo-com.svg', title: 'Email', desc: '<a href="mailto:tolemak.pancreas694@slmail.me" class="about-link">tolemak.pancreas694@slmail.me</a>', link: 'mailto:tolemak.pancreas694@slmail.me' }
      ],
      schools: {
        'Gdańsk University of Technology': 'Gdańsk University of Technology',
        'The Gdańsk School of Banking': 'The Gdańsk School of Banking'
      }
    },
    experience: {
      title: 'Experience',
      stack: 'Stack:',
      usedIn: 'Used in experience:',
      current: 'present',
      tiles: {
        'favourite-computer-systems-developer': {
          desc: 'Development and maintenance of web applications for clients of Favourite Computer Systems. Creating new functionalities and integrations with REST API in response to customer needs.',
          name: 'Software Developer'
        },
        'wskz-backend-developer': {
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          name: 'Backend Developer'
        }
      }
    },
    skills: {
      title: 'Skills',
      all: 'All',
      usedIn: 'Used in experience:',
      categories: {
        'pro-lang': 'Programming Languages',
        'framework': 'Frameworks',
        'library': 'Libraries',
        'markup-style': 'HTML/CSS',
        'devtools': 'Dev Tools',
        'db': 'Databases',
        'other': 'Other'
      },
      descs: {
        js: 'JavaScript – modern frontend, interactivity, animation, dynamic UI.',
        php: 'PHP – backend, APIs, integrations, data processing.',
        python: 'Python – automation, data processing, scripting.',
        html: 'HTML – semantic page structures, accessibility.',
        css: 'CSS – styling, responsiveness, animation.',
        symfony: 'Symfony – PHP framework for large web apps.',
        twig: 'Twig – templates, macros, data formatting.',
        ts: 'TypeScript – typed JavaScript, safety, scalability.',
        react: 'React – modern SPA, components, hooks.',
        sql: 'SQL – relational databases, queries, optimization.',
        docker: 'Docker – containerization, DevOps, CI/CD.',
        vite: 'Vite – fast build tool and dev server for modern frontend apps.',
        mongodb: 'MongoDB – document-oriented NoSQL database, flexible schemas, scalability.',
        node: 'Node.js – JavaScript/TypeScript backend, REST APIs, real-time servers.',
        redis: 'Caching, rate limiting, data structures as the primary store — not just a cache.',
        doctrine: 'PHP ORM — entity mapping, relations, migrations, query optimization.',
        phpunit: 'Unit and functional backend tests, API tests, keeping coverage up.',
        'github-actions': 'CI/CD pipelines — tests, builds, and automated deployments to my own server.',
        linux: 'VPS administration — Apache, reverse proxy, SSL, scheduled jobs.',
        openapi: 'Designing REST APIs and documenting them with an OpenAPI specification.'
      }
    },
    projects: {
      title: 'Projects',
      stack: 'Stack:',
      types: {
        'Web Application': 'Web Application',
        'Portfolio': 'Portfolio'
      },
      names: {
        'File Actions': 'File Actions',
        'Old Portfolio': 'Old Portfolio',
        'Mathema': 'Mathema',
        'Lecture Backend': 'Lecture Backend',
        'CryptoPulse': 'CryptoPulse',
        'Current Portfolio': 'Current Portfolio'
      },
      tiles: {
        'CryptoPulse': {
          short: 'Multi-exchange crypto price aggregator with webhook alerts, Redis as the primary data store.',
          desc: 'A Symfony API aggregating crypto prices from Binance, Kraken, and Coinbase, cached in Redis, with threshold alerts delivered via webhook. Redis as the primary store (not just a cache) — data structures for alerts, rate limiting per exchange and per client. A separate React frontend shows live prices.'
        },
        'File Actions': {
          short: 'Batch file processing in the browser — resize, convert, compress.',
          desc: 'A Symfony backend for batch file processing: resizing, format conversion, compression, and image filters. Processing is built on Imagick; the app is Dockerized, covered by PHPUnit tests, and deployed automatically to my own server.'
        },
        'Old Portfolio': {
          short: 'Old portfolio – see the previous version of the site.',
          desc: 'My previous portfolio, available at old-portfolio.tolemak.pl. The project was based on different technologies than the current version. The source code is available on my GitHub as the "portfolio" repository.'
        },
        'Mathema': {
          short: 'Interactive application for learning mathematics.',
          desc: 'A math-practice app: problem sets across several categories, an interactive mode, and progress tracking. Scores feed a shared leaderboard backed by a Node.js/Express API with SQLite, with request throttling on the API side.'
        },
        'Lecture Backend': {
          short: 'REST API for lecture management — Symfony, MongoDB, layered architecture.',
          desc: 'A REST API for managing lectures and student enrollment, built with Symfony and MongoDB. Layered architecture with a clear separation of domain logic, persistence, and the API layer, covered by tests and documented with an OpenAPI spec.'
        },
        'Current Portfolio': {
          short: 'The portfolio you are looking at — React, TypeScript, two browsing modes.',
          desc: 'The portfolio you are looking at. React with TypeScript, two browsing modes (a 3D flight through a space station and a fast classic mode), full PL/EN bilingual support, unit tests, and automated deployment to my own VPS via GitHub Actions.'
        }
      }
    },
    education: {
      title: 'Education',
      subjects: 'Subjects:',
      degree: {
        'Bachelor degree of biomedical engineering': 'Bachelor of Biomedical Engineering',
        'Master degree of IT project management': 'Master of IT Project Management',
      }
    },
    navbar: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      skills: 'Skills',
      switchToWow: 'Switch to WOW mode',
      switchToClassic: 'Switch to Classic mode'
    },
    wow: {
      hint: 'Scroll to fly through the station. Arrow keys and dots work too.',
      enter: 'Enter',
      prev: 'Previous stop',
      next: 'Next stop',
      jumpTo: 'Jump to section',
      teasers: {
        about: 'Get to know me — who I am and what I do.',
        skills: 'The technologies I work with day to day.',
        projects: 'A look at the projects I have built.',
        education: 'My educational background.',
        experience: 'Career path and scope of responsibility.'
      }
    },
    classic: {
      heroTitle: 'Kamil Gałkowski',
      heroSubtitle: 'Backend developer — PHP/Symfony, APIs, Docker, and deployments on my own infrastructure.'
    },
    modal: {
      close: 'Close'
    },
    app: {
      skipLink: 'Skip to content',
      loading: 'Loading...'
    },
    notFound: {
      title: '404',
      message: 'Page or resource not found.',
      cta: 'Back to homepage'
    },
    errorBoundary: {
      title: 'Something went wrong',
      message: 'This content failed to load. Try refreshing the page.',
      cta: 'Refresh page'
    }
  }
};

import React from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type LangContextType = {
  lang: Lang;
  setLang: Dispatch<SetStateAction<Lang>>;
}

export const LangContext = React.createContext<LangContextType>({
  lang: 'pl',
  setLang: () => {},
});

export const useLang = () => React.useContext(LangContext);

export const useT = () => {
  const { lang } = useLang();
  return { ...translations[lang], lang };
};
