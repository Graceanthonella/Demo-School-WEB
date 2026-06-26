import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Services from './components/Services';
import RoboticaStem from './components/RoboticaStem';
import Gallery from './components/Gallery';
import VideosSection from './components/VideosSection';
import Docentes from './components/Docentes';
import ContactForm from './components/ContactForm';
import Chatbot from './components/Chatbot';
import ScrollProgress from './components/ScrollProgress';
import { Target, Cpu, Heart, Phone, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import logoEcan from './assets/imagenes/01_logo/Logo_ECAN.png';

export default function App() {
  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation Bar */}
      <Navbar />

      <main>
        {/* Hero Slideshow with real photos */}
        <HeroSlider />

        {/* Services & Academic Programs */}
        <Services />

        {/* Why Choose ECAN — Filosofía */}
        <section id="nosotros" className="section" style={{ position: 'relative', background: 'var(--bg-primary)' }}>
          <div className="container">
            <motion.div
              className="services-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-tag" style={{ margin: '0 auto' }}>
                <Target size={16} />
                <span>Nuestra Filosofía</span>
              </span>
              <h2 className="services-title">Comprometidos con el <span className="text-gradient">Crecimiento Integral</span></h2>
              <p className="services-desc">
                Fusionamos la metodología Montessori con valores cristianos y robótica STEM para formar líderes
                íntegros capaces de transformar su entorno.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
              {[
                {
                  icon: <Target size={24} />,
                  title: 'Método Montessori',
                  desc: 'Fomentamos la independencia, autodisciplina y el aprendizaje activo a través de la exploración guiada en ambientes preparados especialmente para su edad.'
                },
                {
                  icon: <Cpu size={24} />,
                  title: 'Robótica & STEM',
                  desc: 'Preparamos a nuestros estudiantes para los desafíos del futuro mediante el Taller de Robótica ECAN, programación y pensamiento lógico-matemático.'
                },
                {
                  icon: <Heart size={24} />,
                  title: 'Principios Cristianos',
                  desc: 'Formamos en valores basados en el amor, el respeto, la fe cristiana y la honestidad, guiando a cada alumno en su propósito único de vida.'
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  className="glass-panel"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ padding: '32px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                    background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{pillar.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Robotica STEM — dedicated section with real photos */}
        <RoboticaStem />

        {/* Interactive Photo Gallery with real photos */}
        <Gallery />

        {/* Facebook Reels Video Section */}
        <VideosSection />

        {/* Teaching Team */}
        <Docentes />

        {/* Contact & Admissions Form */}
        <section id="contacto" className="section" style={{ background: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--card-border)',
        padding: '56px 0 28px',
        transition: 'var(--transition-smooth)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img 
                  src={logoEcan} 
                  alt="Logo ECAN" 
                  style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '4px', 
                    objectFit: 'contain', 
                    border: '1.5px solid rgba(var(--primary-rgb), 0.25)', 
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '3px' 
                  }} 
                />
                <span style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.15rem' }} className="text-gradient">
                  Escuela Cristiana ECAN
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px' }}>
                Educación Cristiana Bilingüe con Metodología Montessori. Formamos líderes íntegros en San Salvador, El Salvador.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { href: 'https://www.facebook.com/EscuelaCristianaECAN', label: 'Facebook', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { href: 'https://www.instagram.com/', label: 'Instagram', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                  { href: 'https://www.youtube.com/', label: 'YouTube', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                ].map(({ href, label, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      border: '1px solid var(--card-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)', textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '18px', fontSize: '0.95rem' }}>Navegación</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['#inicio', 'Inicio'],
                  ['#servicios', 'Programas Académicos'],
                  ['#robotica', 'Robótica STEM'],
                  ['#galeria', 'Galería'],
                  ['#videos', 'Videos'],
                  ['#docentes', 'Nuestros Docentes'],
                  ['#contacto', 'Admisiones'],
                ].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                       onMouseOver={e => (e.currentTarget.style.color = 'var(--primary)')}
                       onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '18px', fontSize: '0.95rem' }}>Contacto</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                {/* Address */}
                <a href="https://maps.google.com/?q=Prolongaci%C3%B3n+Alameda+Juan+Pablo+II+San+Salvador+El+Salvador"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <span style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }}><MapPin size={16} /></span>
                  <span>Prolongación Alameda Juan Pablo II, 300 mts al pte de 75 Av. Norte, San Salvador, C.P. 1101</span>
                </a>

                {/* Phone */}
                <a href="tel:+50375151797"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}><Phone size={16} /></span>
                  +503 7515 1797
                </a>

                {/* Email */}
                <a href="mailto:info@ecan.edu.sv"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}><Mail size={16} /></span>
                  info@ecan.edu.sv
                </a>

                {/* Website */}
                <a href="https://escuelaecan.com" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600 }}
                >
                  <span style={{ flexShrink: 0 }}>🌐</span>
                  escuelaecan.com
                </a>
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(var(--primary-rgb),0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--primary-rgb),0.1)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>🕐 Horario de Atención</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                  Lunes – Viernes: 7:00 AM – 5:00 PM<br />
                  Sábados y Domingos: Cerrado
                </p>
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid var(--card-border)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} Escuela Cristiana ECAN. Todos los derechos reservados.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              San Salvador, El Salvador · Educación Bilingüe Cristiana
            </p>
          </div>
        </div>
      </footer>

      {/* Floating AI Chatbot */}
      <Chatbot />
    </>
  );
}
