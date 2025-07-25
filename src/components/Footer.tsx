import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{
      width: '100%',
      textAlign: 'center',
      padding: '1.1rem 0 0.7rem 0',
      fontSize: '0.98rem',
      color: '#aaa',
      background: 'transparent',
      letterSpacing: 0.2,
      userSelect: 'none',
    }}>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
         <a href="/portfolio/licenses.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#ff8c42', textDecoration: 'underline', fontSize: '0.85rem', opacity: 0.8 }}>Licenses</a>
         <a href="https://github.com/dscountergo/portfolio" target="_blank" rel="noopener noreferrer" style={{ color: '#ff8c42', textDecoration: 'underline', fontSize: '0.85rem', opacity: 0.8 }}>Code</a>
       </div>
       <div>
         © {currentYear} Aleksander Cyniak. All rights reserved.
       </div>
    </footer>
  );
};

export default Footer; 