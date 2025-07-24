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
      © {currentYear} Aleksander Cyniak. All rights reserved. <a href="/portfolio/licenses.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#ff8c42', textDecoration: 'underline', marginLeft: 4 }}>Licenses</a>
    </footer>
  );
};

export default Footer; 