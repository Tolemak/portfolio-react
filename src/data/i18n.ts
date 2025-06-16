export type Lang = 'pl' | 'en';

export const translations = {
  pl: {
    about: {
      title: 'O mnie',
      intro: 'Cześć! Nazywam się Kamil Gałkowski. Jestem pasjonatem nowoczesnych technologii webowych, backendu i automatyzacji. Lubię łączyć kreatywność z inżynierią, budując aplikacje, które nie tylko działają, ale i zachwycają wizualnie. To portfolio prezentuje moje umiejętności, projekty i ścieżkę zawodową. Zapraszam do kontaktu i współpracy!',
      cards: [
        { icon: '/logos/react.svg', title: 'Frontend & UI', desc: 'Tworzę nowoczesne, responsywne interfejsy w React, TypeScript, z naciskiem na UX, dostępność i wydajność.' },
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'Projektuję i wdrażam API oraz backendy w PHP (Symfony), Node.js, Python. Bezpieczeństwo, wydajność, integracje, SQL.' },
        { icon: '/logos/docker.svg', title: 'DevOps & Bazy danych', desc: 'Automatyzacja, CI/CD, Docker, zarządzanie bazami danych (SQL), wdrożenia i stabilność środowisk.' },
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
          desc: 'Rozwój i utrzymanie aplikacji webowych dla klientów Favourite Computer Systems. Tworzenie nowych funkcjonalności oraz integracje z REST API w odpowiedzi na potrzeby klienta.',
          name: 'Programista aplikacji'
        }
      }
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
        },
        'Stare Portfolio': {
          short: 'Stare portfolio – zobacz poprzednią wersję strony.',
          desc: 'Moje poprzednie portfolio, dostępne pod adresem old-portfolio.tolemak.pl. Projekt powstał w oparciu o inne technologie niż obecna wersja. Kod źródłowy znajduje się na moim GitHubie jako repozytorium "portfolio".'
        },
        'Mathema': {
          short: 'Interaktywna aplikacja do nauki matematyki.',
          desc: 'Mathema to interaktywna aplikacja internetowa stworzona, aby pomóc użytkownikom ćwiczyć i doskonalić umiejętności matematyczne. Aplikacja prezentuje użytkownikom różnorodne zadania matematyczne z różnych kategorii i pozwala im sprawdzać swoją wiedzę w trybie interaktywnym lub przeglądać zestawy zadań. Użytkownicy mogą również śledzić swoje postępy i przeglądać wyniki w globalnej tabeli liderów.'
        }
      }
    },
    education: {
      title: 'Edukacja',
      subjects: 'Przedmioty:',
      degree: {
        'Bachelor degree of biomedical engineering': 'Inżynieria biomedyczna (inżynier)',
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
      intro: `Hi! My name is Kamil Gałkowski. I'm passionate about modern web technologies, backend, and automation. I love combining creativity with engineering, building apps that work and look great. This portfolio showcases my skills, projects, and professional journey. Feel free to contact me!`,
      cards: [
        { icon: '/logos/react.svg', title: 'Frontend & UI', desc: 'I build modern, responsive interfaces in React and TypeScript, with a focus on UX, accessibility, and performance.' },
        { icon: '/logos/symfony.svg', title: 'Backend & API', desc: 'I design and implement APIs and backends in PHP (Symfony), Node.js, Python. Security, performance, integrations, SQL.' },
        { icon: '/logos/docker.svg', title: 'DevOps & Databases', desc: 'Automation, CI/CD, Docker, database management (SQL), deployments, and environment stability.' },
        { icon: '/logos/github-mark-white.svg', title: 'GitHub', desc: '<a href="https://github.com/Tolemak" target="_blank" rel="noopener noreferrer" class="about-link">github.com/Tolemak</a>', link: 'https://github.com/Tolemak' },
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
        }
      }
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
        },
        'Stare Portfolio': {
          short: 'Old portfolio – see the previous version of the site.',
          desc: 'My previous portfolio, available at old-portfolio.tolemak.pl. The project was based on different technologies than the current version. The source code is available on my GitHub as the "portfolio" repository.'
        },
        'Mathema': {
          short: 'Interactive application for learning mathematics.',
          desc: 'Mathema is an interactive web application designed to help users practice and improve their mathematical skills. The application presents users with a variety of mathematical problems from different categories and allows them to test their knowledge in interactive mode or browse problem sets. Users can also track their progress and view results on a global leaderboard.'
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
