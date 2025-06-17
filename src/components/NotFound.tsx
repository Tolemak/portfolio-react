import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="notfound-container" style={{textAlign: 'center', padding: '80px 20px'}}>
    <h1 style={{fontSize: '4rem', color: '#e67e22'}}>404</h1>
    <p style={{fontSize: '1.3rem', color: '#bbb'}}>Nie znaleziono strony lub zasobu.</p>
    <Link to="/" style={{color: '#3498db', textDecoration: 'none', fontWeight: 'bold'}}>Powrót na stronę główną</Link>
  </div>
);

export default NotFound;
