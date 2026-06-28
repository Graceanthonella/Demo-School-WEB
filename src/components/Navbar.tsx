import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import logoEcan from '../assets/imagenes/01_logo/Logo_ECAN.png';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobileMenuOpenRef = useRef(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Sync mobile menu state with ref to keep listener clean
  useEffect(() => {
    isMobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'robotica', 'galeria', 'videos', 'docentes', 'contacto'];
      let current = 'inicio';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Navbar is now permanently fixed based on user request

  return (
    <header 
      className="navbar-header glass-panel" 
      style={{ 
        padding: '8px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="container navbar-container" style={{ height: '96px' }}>
        <a href="#inicio" className="logo-link text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img 
            src={logoEcan} 
            alt="Logo ECAN" 
            style={{ 
              height: '80px', 
              width: '80px', 
              borderRadius: '4px', 
              border: '2px solid rgba(var(--primary-rgb), 0.25)', 
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '4px',
              boxShadow: '0 4px 15px rgba(var(--primary-rgb), 0.2)', 
              objectFit: 'contain',
              transition: 'var(--transition-smooth)',
              transform: 'translateY(0)'
            }} 
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.01em' }}>Escuela Cristiana ECAN</span>
        </a>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            <li><a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}>Inicio</a></li>
            <li><a href="#servicios" className={`nav-link ${activeSection === 'servicios' ? 'active' : ''}`}>Académico</a></li>
            <li><a href="#robotica" className={`nav-link ${activeSection === 'robotica' ? 'active' : ''}`}>Robótica</a></li>
            <li><a href="#galeria" className={`nav-link ${activeSection === 'galeria' ? 'active' : ''}`}>Galería</a></li>
            <li><a href="#videos" className={`nav-link ${activeSection === 'videos' ? 'active' : ''}`}>Videos</a></li>
            <li><a href="#contacto" className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`}>Contacto</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Alternar tema de color"
            title="Alternar tema"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button 
            className="menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* SVG Gradient definitions for icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu glass-panel" style={{
          position: 'absolute',
          top: '112px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '16px',
          borderTop: 'none',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          <a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="#servicios" className={`nav-link ${activeSection === 'servicios' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Académico</a>
          <a href="#robotica" className={`nav-link ${activeSection === 'robotica' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Robótica</a>
          <a href="#galeria" className={`nav-link ${activeSection === 'galeria' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Galería</a>
          <a href="#videos" className={`nav-link ${activeSection === 'videos' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Videos</a>
          <a href="#docentes" className={`nav-link ${activeSection === 'docentes' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Docentes</a>
          <a href="#contacto" className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      )}
    </header>
  );
}
