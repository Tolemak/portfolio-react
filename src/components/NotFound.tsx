import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../data/i18n';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const t = useT();

  return (
    <section className="notfound-section" aria-label={t.notFound.title}>
      <h1 className="notfound-code">{t.notFound.title}</h1>
      <p className="notfound-message">{t.notFound.message}</p>
      <button className="notfound-cta" onClick={() => navigate('/')}>
        {t.notFound.cta}
      </button>
    </section>
  );
};

export default NotFound;
