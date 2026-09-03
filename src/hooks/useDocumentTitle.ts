import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../data/i18n';

export const useDocumentTitle = () => {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const titles: Record<string, { pl: string; en: string }> = {
      '/': {
        pl: 'Kamil Gałkowski – Portfolio',
        en: 'Kamil Gałkowski – Portfolio',
      },
      '/about': {
        pl: 'O mnie – Kamil Gałkowski',
        en: 'About Me – Kamil Gałkowski',
      },
      '/experience': {
        pl: 'Doświadczenie – Kamil Gałkowski',
        en: 'Experience – Kamil Gałkowski',
      },
      '/projects': {
        pl: 'Projekty – Kamil Gałkowski',
        en: 'Projects – Kamil Gałkowski',
      },
      '/education': {
        pl: 'Edukacja – Kamil Gałkowski',
        en: 'Education – Kamil Gałkowski',
      },
      '/skills': {
        pl: 'Umiejętności – Kamil Gałkowski',
        en: 'Skills – Kamil Gałkowski',
      },
    };
    const title = titles[location.pathname]?.[lang] || 'Kamil Gałkowski – Portfolio';
    document.title = title;
  }, [location.pathname, lang]);
};
