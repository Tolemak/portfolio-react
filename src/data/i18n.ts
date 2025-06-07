export type Lang = 'pl' | 'en';

export const translations = {
  pl: {
    about: {
      title: 'O mnie',
      intro: 'Cześć! Jestem pasjonatem nowoczesnych technologii webowych, grafiki 3D i interaktywnych interfejsów. Lubię łączyć kreatywność z inżynierią, budując aplikacje, które nie tylko działają, ale i zachwycają wizualnie. To portfolio prezentuje moje umiejętności, projekty i ścieżkę zawodową. Zapraszam do kontaktu i współpracy!',
      cards: [
        { icon: '/logos/react.svg', title: 'Frontend & UI', desc: 'Tworzę nowoczesne, interaktywne interfejsy w React, TypeScript, Svelte, z naciskiem na UX, animacje i 3D.' },
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'Projektuję i wdrażam API oraz backendy w PHP (Symfony), Node.js, Python. Bezpieczeństwo, wydajność, integracje.' },
        { icon: '/logos/docker.svg', title: 'DevOps & Cloud', desc: 'Automatyzacja, CI/CD, Docker, chmura. Dbam o jakość wdrożeń i stabilność środowisk.' },
        { icon: '/logos/3d.svg', title: 'Grafika 3D & WebGL', desc: 'Modele 3D, animacje, Three.js, interaktywne sceny. Portfolio to także demo moich możliwości 3D.' }
      ],
      schools: {
        'Gdańsk University of Technology': 'Politechnika Gdańska',
        'The Gdańsk School of Banking': 'Wyższa Szkoła Bankowa w Gdańsku'
      }
    },
    experience: {
      title: 'Doświadczenie',
      stack: 'Stack:',
      usedIn: 'Używane w doświadczeniach:'
    },
    skills: {
      title: 'Umiejętności',
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
        js: 'JavaScript – nowoczesny frontend, interaktywność, animacje, dynamiczne UI.',
        php: 'PHP – backend, API, integracje, przetwarzanie danych.',
        python: 'Python – automatyzacja, przetwarzanie danych, skrypty.',
        html: 'HTML – semantyczne struktury stron, dostępność.',
        css: 'CSS – stylowanie, responsywność, animacje.',
        symfony: 'Symfony – framework PHP do dużych aplikacji webowych.',
        bootstrap: 'Bootstrap – szybkie prototypowanie, responsywne layouty.',
        twig: 'Twig – szablony, makra, formatowanie danych.',
        ts: 'TypeScript – typowany JavaScript, bezpieczeństwo, skalowalność.',
        react: 'React – nowoczesne SPA, komponenty, hooki.',
        sql: 'SQL – relacyjne bazy danych, zapytania, optymalizacja.',
        vscode: 'Visual Studio Code – główne narzędzie pracy, pluginy, personalizacja.',
        docker: 'Docker – konteneryzacja, DevOps, CI/CD.'
      }
    },
    projects: {
      title: 'Projekty',
      stack: 'Stack:',
      tiles: {
        'File Actions': {
          short: 'Operacje na plikach w przeglądarce. Zmień rozmiar, konwertuj, kompresuj i więcej.',
          desc: 'FileActions_BackendDemo to projekt demonstracyjny prezentujący aplikację full-stack z backendem w PHP/Symfony. Pokazuje dobre praktyki, czystą architekturę i integracje z nowoczesnymi narzędziami.'
        }
      }
    },
    education: {
      title: 'Edukacja',
      subjects: 'Przedmioty:',
      degree: {
        'Bachelor degree of biomedical engineering': 'Inżynieria biomedyczna (licencjat)',
        'Master degree of IT project management': 'Zarządzanie projektami IT (magister)',
      }
    },
    navbar: {
      home: 'Strona główna',
      about: 'O mnie',
      experience: 'Doświadczenie',
      projects: 'Projekty',
      education: 'Edukacja',
      skills: 'Umiejętności'
    },
    modal: {
      close: 'Zamknij'
    }
  },
  en: {
    about: {
      title: 'About Me',
      intro: `Hi! I'm passionate about modern web technologies, 3D graphics, and interactive UIs. I love combining creativity with engineering, building apps that work and look great. This portfolio showcases my skills, projects, and professional journey. Feel free to contact me!`,
      cards: [
        { icon: '/logos/react.svg', title: 'Frontend & UI', desc: 'I create modern, interactive UIs in React, TypeScript, Svelte, with a focus on UX, animation, and 3D.' },
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'I design and implement APIs and backends in PHP (Symfony), Node.js, Python. Security, performance, integrations.' },
        { icon: '/logos/docker.svg', title: 'DevOps & Cloud', desc: 'Automation, CI/CD, Docker, cloud. I care about deployment quality and environment stability.' },
        { icon: '/logos/3d.svg', title: '3D Graphics & WebGL', desc: '3D models, animation, Three.js, interactive scenes. This portfolio is also a demo of my 3D skills.' }
      ],
      schools: {
        'Gdańsk University of Technology': 'Gdańsk University of Technology',
        'The Gdańsk School of Banking': 'The Gdańsk School of Banking'
      }
    },
    experience: {
      title: 'Experience',
      stack: 'Stack:',
      usedIn: 'Used in experience:'
    },
    skills: {
      title: 'Skills',
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
        bootstrap: 'Bootstrap – rapid prototyping, responsive layouts.',
        twig: 'Twig – templates, macros, data formatting.',
        ts: 'TypeScript – typed JavaScript, safety, scalability.',
        react: 'React – modern SPA, components, hooks.',
        sql: 'SQL – relational databases, queries, optimization.',
        vscode: 'Visual Studio Code – main dev tool, plugins, customization.',
        docker: 'Docker – containerization, DevOps, CI/CD.'
      }
    },
    projects: {
      title: 'Projects',
      stack: 'Stack:',
      tiles: {
        'File Actions': {
          short: 'Batch file operations in your browser. Resize, convert, compress, and more.',
          desc: 'FileActions_BackendDemo is a demo project showcasing a full-stack app with PHP/Symfony backend. It highlights best practices, clean architecture, and integration with modern tools.'
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
      skills: 'Skills'
    },
    modal: {
      close: 'Close'
    }
  }
};

import React from 'react';
export const LangContext = React.createContext<Lang>('pl');
export const useLang = () => React.useContext(LangContext);
export const useT = () => {
  const lang = useLang();
  return translations[lang];
};
