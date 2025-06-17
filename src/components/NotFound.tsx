import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container" style={{textAlign: 'center', padding: '80px 20px', position: 'relative', zIndex: 2}}>
      <h1 style={{fontSize: '4rem', color: '#e67e22'}}>404</h1>
      <p style={{fontSize: '1.3rem', color: '#bbb'}}>Nie znaleziono strony lub zasobu.</p>
      <button
        style={{
          color: '#fff',
          background: '#3498db',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 28px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginTop: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
        onClick={() => navigate('/')}
      >
        Powrót na stronę główną
      </button>
    </div>
  );
};

export default NotFound;
