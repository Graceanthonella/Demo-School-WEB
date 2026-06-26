import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

import robotica1 from '../assets/imagenes/05_robotica_stem/robotica_1.png';
import robotica2 from '../assets/imagenes/05_robotica_stem/robotica_2.png';
import robotica3 from '../assets/imagenes/05_robotica_stem/robotica_3.png';
import robotica4 from '../assets/imagenes/05_robotica_stem/robotica_4.png';
import robotica5 from '../assets/imagenes/05_robotica_stem/robotica_5.png';
import robotica6 from '../assets/imagenes/05_robotica_stem/robotica_6.png';
import robotica7 from '../assets/imagenes/05_robotica_stem/robotica_7.png';
import ciencias1 from '../assets/imagenes/05_robotica_stem/ciencias_1.png';
import ciencias2 from '../assets/imagenes/05_robotica_stem/ciencias_2.png';

const stemPhotos = [
  { src: robotica1, label: 'Taller de Robótica' },
  { src: robotica2, label: 'Ensamblaje de Robots' },
  { src: robotica3, label: 'Competencia STEM' },
  { src: robotica4, label: 'Programación' },
  { src: robotica5, label: 'Robótica Avanzada' },
  { src: robotica6, label: 'Proyecto de Ingeniería' },
  { src: robotica7, label: 'Robótica Infantil' },
  { src: ciencias1, label: 'Laboratorio de Ciencias' },
  { src: ciencias2, label: 'Experimentos Científicos' },
];

const features = [
  { icon: '🤖', title: 'Robótica Real', desc: 'Ensamblaje y programación de robots físicos desde preescolar.' },
  { icon: '💻', title: 'Programación', desc: 'Lenguajes de bloques y texto adaptados a cada nivel escolar.' },
  { icon: '🔬', title: 'Ciencias Aplicadas', desc: 'Laboratorio activo con experimentos prácticos semanales.' },
  { icon: '🏆', title: 'Competencias', desc: 'Participamos en torneos regionales e internacionales de robótica.' },
];

const VISIBLE = 3;

export default function RoboticaStem() {
  const [startIdx, setStartIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () => setStartIdx(i => Math.max(0, i - 1));
  const next = () => setStartIdx(i => Math.min(stemPhotos.length - VISIBLE, i + 1));

  const openLightbox = (absIdx: number) => setLightboxIdx(absIdx);
  const closeLightbox = () => setLightboxIdx(null);
  const lbPrev = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => i === null ? null : (i - 1 + stemPhotos.length) % stemPhotos.length); };
  const lbNext = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => i === null ? null : (i + 1) % stemPhotos.length); };

  const visiblePhotos = stemPhotos.slice(startIdx, startIdx + VISIBLE);

  return (
    <section id="robotica" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated bg orb */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb),0.1) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--secondary-rgb, var(--primary-rgb)),0.07) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 12s ease-in-out infinite reverse' }} />

      <div className="container">
        {/* Header */}
        <motion.div className="services-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="hero-tag" style={{ margin: '0 auto' }}>
            <Cpu size={16} />
            <span>Taller STEM & Robótica</span>
          </span>
          <h2 className="services-title">
            Preparamos a tus hijos para el <span className="text-gradient">Futuro Digital</span>
          </h2>
          <p className="services-desc">
            El Taller de Robótica ECAN es uno de los programas más completos de El Salvador. Nuestros alumnos
            diseñan, construyen y programan robots desde preescolar. <strong style={{ color: 'var(--primary)' }}>Haz clic en las fotos para ampliarlas.</strong>
          </p>
        </motion.div>

        {/* Photo Carousel with LIGHTBOX support */}
        <div style={{ position: 'relative', margin: '40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {visiblePhotos.map((photo, i) => {
              const absIdx = startIdx + i;
              return (
                <motion.div
                  key={absIdx}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(var(--primary-rgb),0.25)' }}
                  onClick={() => openLightbox(absIdx)}
                  style={{
                    position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                    aspectRatio: '4/3', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    cursor: 'pointer', border: '1px solid rgba(var(--primary-rgb),0.08)',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.4)')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.08)')}
                  className="stem-card"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                    onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Hover overlay */}
                  <div className="stem-hover-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(var(--primary-rgb),0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                    opacity: 0, transition: 'opacity 0.3s ease',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '8px',
                  }}>
                    <ZoomIn size={36} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
                    <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>Ver ampliada</span>
                  </div>
                  {/* Label bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '20px 16px 12px', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                  }}>
                    {photo.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={prev} disabled={startIdx === 0} aria-label="Anterior"
              style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid var(--card-border)', background: startIdx === 0 ? 'transparent' : 'rgba(var(--primary-rgb),0.08)', color: 'var(--text-primary)', cursor: startIdx === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: startIdx === 0 ? 0.35 : 1, transition: 'all 0.2s' }}>
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {Array.from({ length: stemPhotos.length - VISIBLE + 1 }, (_, i) => (
                <button key={i} onClick={() => setStartIdx(i)}
                  style={{ width: i === startIdx ? '24px' : '8px', height: '8px', borderRadius: '999px', background: i === startIdx ? 'var(--primary)' : 'var(--card-border)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={next} disabled={startIdx >= stemPhotos.length - VISIBLE} aria-label="Siguiente"
              style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid var(--card-border)', background: startIdx >= stemPhotos.length - VISIBLE ? 'transparent' : 'rgba(var(--primary-rgb),0.08)', color: 'var(--text-primary)', cursor: startIdx >= stemPhotos.length - VISIBLE ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: startIdx >= stemPhotos.length - VISIBLE ? 0.35 : 1, transition: 'all 0.2s' }}>
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '8px' }}>
          {features.map((f, i) => (
            <motion.div key={i} className="glass-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(var(--primary-rgb),0.15)' }}
              style={{ padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'default' }}>
              <div style={{ fontSize: '2.2rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={closeLightbox}>
            {/* Badge counter */}
            <div style={{ position: 'fixed', top: '22px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '6px 20px', color: '#fff', fontSize: '0.85rem', fontWeight: 700, zIndex: 1010 }}>
              {lightboxIdx + 1} / {stemPhotos.length} — {stemPhotos[lightboxIdx].label}
            </div>

            <motion.div key={lightboxIdx} initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '92vw', maxHeight: '86vh', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}>
              <img src={stemPhotos[lightboxIdx].src} alt={stemPhotos[lightboxIdx].label}
                style={{ maxWidth: '92vw', maxHeight: '84vh', objectFit: 'contain', display: 'block' }} />
            </motion.div>

            <button onClick={closeLightbox} aria-label="Cerrar" style={{ position: 'fixed', top: '20px', right: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010 }}><X size={20} /></button>
            <button onClick={lbPrev} aria-label="Anterior" style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010 }}><ChevronLeft size={24} /></button>
            <button onClick={lbNext} aria-label="Siguiente" style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010 }}><ChevronRight size={24} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stem-card:hover .stem-hover-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
