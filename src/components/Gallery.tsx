import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from 'lucide-react';

import alumnos1 from '../assets/imagenes/07_galeria_alumnos/alumnos_1.png';
import alumnos2 from '../assets/imagenes/07_galeria_alumnos/alumnos_2.png';
import alumnos3 from '../assets/imagenes/07_galeria_alumnos/alumnos_3.png';
import alumnos4 from '../assets/imagenes/07_galeria_alumnos/alumnos_4.png';
import eventos1 from '../assets/imagenes/06_actividades_eventos/eventos_1.png';
import eventos2 from '../assets/imagenes/06_actividades_eventos/eventos_2.png';
import eventos3 from '../assets/imagenes/06_actividades_eventos/eventos_3.png';
import eventos4 from '../assets/imagenes/06_actividades_eventos/eventos_4.png';
import inst1 from '../assets/imagenes/03_instalaciones/Instalacion_1.png';
import inst2 from '../assets/imagenes/03_instalaciones/Instalacion_2.png';
import inst3 from '../assets/imagenes/03_instalaciones/Instalacion_3.png';
import aulas1 from '../assets/imagenes/04_aulas_clases/Aulas_1.png';
import aulas2 from '../assets/imagenes/04_aulas_clases/Aulas_2.png';
import aulas3 from '../assets/imagenes/04_aulas_clases/Aulas_3.png';
import aulas4 from '../assets/imagenes/04_aulas_clases/Aulas_4.png';

interface GalleryItem {
  src: string;
  category: 'alumnos' | 'eventos' | 'instalaciones' | 'aulas';
  title: string;
}

const galleryData: GalleryItem[] = [
  { src: alumnos1, category: 'alumnos', title: 'Alumnos ECAN' },
  { src: eventos1, category: 'eventos', title: 'Actividades y Eventos' },
  { src: inst1, category: 'instalaciones', title: 'Instalaciones ECAN' },
  { src: aulas1, category: 'aulas', title: 'Aulas Montessori' },
  { src: alumnos2, category: 'alumnos', title: 'Vida Escolar' },
  { src: eventos2, category: 'eventos', title: 'Eventos Especiales' },
  { src: inst2, category: 'instalaciones', title: 'Áreas del Colegio' },
  { src: aulas2, category: 'aulas', title: 'Salones de Clase' },
  { src: alumnos3, category: 'alumnos', title: 'Comunidad ECAN' },
  { src: eventos3, category: 'eventos', title: 'Celebraciones' },
  { src: inst3, category: 'instalaciones', title: 'Espacios Educativos' },
  { src: aulas3, category: 'aulas', title: 'Ambientes Preparados' },
  { src: alumnos4, category: 'alumnos', title: 'Recreo y Convivencia' },
  { src: eventos4, category: 'eventos', title: 'Vida Estudiantil' },
  { src: aulas4, category: 'aulas', title: 'Aprendizaje Activo' },
];

type FilterType = 'all' | 'alumnos' | 'eventos' | 'instalaciones' | 'aulas';

const filters: { key: FilterType; label: string; emoji: string }[] = [
  { key: 'all', label: 'Todo', emoji: '🏫' },
  { key: 'alumnos', label: 'Alumnos', emoji: '👦' },
  { key: 'eventos', label: 'Eventos', emoji: '🎉' },
  { key: 'instalaciones', label: 'Instalaciones', emoji: '🏗️' },
  { key: 'aulas', label: 'Aulas', emoji: '📚' },
];

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>('all');
  // Store the actual item, not index — fixes cross-category navigation bug
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = galleryData.filter(item => filter === 'all' || item.category === filter);

  const openLightbox = (item: GalleryItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const navigate = useCallback((dir: 1 | -1) => {
    setLightboxItem(current => {
      if (!current) return null;
      const currentFiltered = galleryData.filter(
        item => filter === 'all' || item.category === filter
      );
      const idx = currentFiltered.findIndex(i => i.src === current.src);
      const newIdx = (idx + dir + currentFiltered.length) % currentFiltered.length;
      return currentFiltered[newIdx];
    });
  }, [filter]);

  const lightboxIndex = lightboxItem
    ? filtered.findIndex(i => i.src === lightboxItem.src) + 1
    : 0;

  return (
    <section id="galeria" className="section" style={{ position: 'relative', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* Subtle animated background orbs */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb),0.06) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />

      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-tag" style={{ margin: '0 auto' }}>
            <ImageIcon size={16} />
            <span>Galería ECAN</span>
          </span>
          <h2 className="services-title">
            Descubre la <span className="text-gradient">Vida en ECAN</span>
          </h2>
          <p className="services-desc">
            Momentos reales de nuestra comunidad educativa. Haz clic en cualquier foto para verla ampliada.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <motion.button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setLightboxItem(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '9px 22px',
                borderRadius: '999px',
                border: '1.5px solid',
                borderColor: filter === f.key ? 'var(--primary)' : 'var(--card-border)',
                background: filter === f.key
                  ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                  : 'rgba(var(--primary-rgb), 0.04)',
                color: filter === f.key ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: filter === f.key ? '0 4px 16px rgba(var(--primary-rgb), 0.35)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <span>{f.emoji}</span>
              {f.label}
              {filter === f.key && (
                <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '999px', padding: '1px 8px', fontSize: '0.75rem' }}>
                  {filtered.length}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(var(--primary-rgb), 0.2)' }}
                onClick={() => openLightbox(item)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  aspectRatio: i % 5 === 2 ? '1/1.1' : '4/3',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
                className="gallery-card"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Hover overlay */}
                <div className="gallery-hover-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(var(--primary-rgb),0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start',
                  padding: '18px 16px',
                }}>
                  <ZoomIn size={28} color="#fff" style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: '30%' }} />
                  <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>{item.title}</span>
                </div>
                {/* Always-visible title gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
                  padding: '20px 14px 10px',
                  color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                  pointerEvents: 'none',
                }}>
                  {item.title}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── LIGHTBOX — navigates ONLY within current filter ─── */}
      <AnimatePresence>
        {lightboxItem && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999999,
              background: 'rgba(0,0,0,0.93)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
            onClick={closeLightbox}
          >
            {/* Counter badge */}
            <div style={{
              position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px',
              padding: '6px 18px', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
              zIndex: 1010,
            }}>
              {lightboxIndex} / {filtered.length}
            </div>

            <motion.div
              key={lightboxItem.src}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative', maxWidth: '90vw', maxHeight: '85vh',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                style={{ maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', display: 'block', borderRadius: 'var(--radius-lg)' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                padding: '24px 24px 16px', color: '#fff', fontSize: '1.05rem', fontWeight: 700,
              }}>
                {lightboxItem.title}
              </div>
            </motion.div>

            {/* Close */}
            <button onClick={closeLightbox} aria-label="Cerrar"
              style={{ position: 'fixed', top: '20px', right: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010, transition: 'background 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
              onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            ><X size={20} /></button>

            {/* Prev */}
            <button onClick={e => { e.stopPropagation(); navigate(-1); }} aria-label="Anterior"
              style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(var(--primary-rgb),0.7)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            ><ChevronLeft size={24} /></button>

            {/* Next */}
            <button onClick={e => { e.stopPropagation(); navigate(1); }} aria-label="Siguiente"
              style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1010, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(var(--primary-rgb),0.7)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            ><ChevronRight size={24} /></button>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      {/* Hover overlay CSS injection */}
      <style>{`
        .gallery-card:hover .gallery-hover-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
