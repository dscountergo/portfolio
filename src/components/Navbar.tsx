import React from 'react';

interface NavbarProps {
    activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const navItems = React.useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' }
    ],
    []
  );

  const [hoverActive, setHoverActive] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close menu after clicking link or window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Container hover handling
  const handleMouseEnter = () => {
    setHoverActive(true);
  };
  const handleMouseLeave = () => {
    setHoverActive(false);
  };

  // IntersectionObserver to detect active section
  React.useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 50% of section on screen
    });
    navItems.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [navItems]);

  // Close menu after clicking link
  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand navbar-logo-hover-container">
          <span
            className={`navbar-logo-typewriter-container${hoverActive ? ' hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="navbar-logo navbar-logo-angled">
              Aleksander Cyniak
            </span>
          </span>
        </div>

        {/* Hamburger icon */}
        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        {/* Desktop nav */}
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu overlay */}
        <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`} id="navbar-mobile-menu">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Overlay background to close menu */}
      {menuOpen && <div className="navbar-mobile-backdrop" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar; 