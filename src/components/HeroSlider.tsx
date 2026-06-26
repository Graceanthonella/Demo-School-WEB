import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import portada1 from '../assets/imagenes/02_hero_portada/portada_1.png';
import portada2 from '../assets/imagenes/02_hero_portada/portada_2.png';
import portada3 from '../assets/imagenes/02_hero_portada/portada_3.png';
import portada4 from '../assets/imagenes/02_hero_portada/portada_4.png';

const slides = [
  {
    img: portada1,
    tag: 'Educación de Alto Rendimiento',
    title: 'Formamos Líderes con',
    highlight: 'Valores Cristianos',
    desc: 'Una escuela 100% bilingüe, con metodología Montessori y tecnología de punta para el desarrollo integral de cada niño.',
    cta: 'Ver Programa Académico',
    ctaHref: '#servicios',
  },
  {
    img: portada2,
    tag: 'Metodología Montessori',
    title: 'Aprendizaje Activo y',
    highlight: 'Personalizado',
    desc: 'Ambientes preparados que respetan el ritmo de cada alumno, fomentando la independencia y la curiosidad natural.',
    cta: 'Conocer el Método',
    ctaHref: '#nosotros',
  },
  {
    img: portada3,
    tag: 'Robótica & STEM',
    title: 'Tecnología e Innovación',
    highlight: 'desde Temprana Edad',
    desc: 'Nuestro Taller de Robótica ECAN prepara a los estudiantes para el futuro digital con proyectos reales y competencias.',
    cta: 'Ver Robótica STEM',
    ctaHref: '#robotica',
  },
  {
    img: portada4,
    tag: 'Comunidad Cristiana',
    title: 'Una Familia Unida por',
    highlight: 'la Fe y la Excelencia',
    desc: 'Más de 5,000 familias confían en ECAN. Únete a nuestra comunidad educativa en San Salvador.',
    cta: 'Solicitar Admisión',
    ctaHref: '#contacto',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section id="inicio" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
      {/* Slide Images */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%)',
        zIndex: 2,
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ maxWidth: '640px', color: '#fff' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '999px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: '20px',
              color: '#fff',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
              {slide.tag}
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-title)',
              color: '#fff',
            }}>
              {slide.title}<br />
              <span className="text-gradient">{slide.highlight}</span>
            </h1>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: '32px', maxWidth: '520px' }}>
              {slide.desc}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={slide.ctaHref} className="btn btn-primary" style={{ padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {slide.cta} <ArrowRight size={18} />
              </a>
              <a href="#contacto" className="btn btn-secondary" style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                Admisiones 2026
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow Controls */}
      <button onClick={prev} aria-label="Anterior" style={{
        position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 4, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '48px', height: '48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff',
        transition: 'all 0.2s ease',
      }} onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
         onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} aria-label="Siguiente" style={{
        position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 4, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '48px', height: '48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff',
        transition: 'all 0.2s ease',
      }} onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
         onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 4, display: 'flex', gap: '10px', alignItems: 'center',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              borderRadius: '999px',
              background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Stats bar bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 4,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '14px 0',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(24px, 5vw, 80px)',
      }}>
        {[
          { val: '5,128+', label: 'Familias en ECAN' },
          { val: '100%', label: 'Bilingüe' },
          { val: 'Montessori', label: 'Metodología' },
          { val: 'K-9°', label: 'Niveles Académicos' },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 800, fontFamily: 'var(--font-title)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
