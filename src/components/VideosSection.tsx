import { motion } from 'framer-motion';
import { Play, ExternalLink, Film } from 'lucide-react';

const reels = [
  {
    id: '1530633918685996',
    title: 'Conoce la Escuela ECAN',
    desc: 'Un recorrido por nuestra filosofía educativa y lo que nos hace únicos en El Salvador.',
    badge: 'Institucional',
    emoji: '🏫',
    gradient: 'linear-gradient(135deg, hsl(215,80%,30%) 0%, hsl(215,80%,15%) 100%)',
    accent: 'hsl(215,80%,65%)',
  },
  {
    id: '1331581542396261',
    title: 'Vida Estudiantil ECAN',
    desc: 'Momentos auténticos de nuestros alumnos en clases, actividades y proyectos escolares.',
    badge: 'Vida Escolar',
    emoji: '🎒',
    gradient: 'linear-gradient(135deg, hsl(145,55%,22%) 0%, hsl(145,55%,12%) 100%)',
    accent: 'hsl(145,65%,55%)',
  },
  {
    id: '1521780799498056',
    title: 'Robótica y Proyectos STEM',
    desc: 'Nuestros alumnos presentan sus creaciones robóticas y proyectos de ciencias.',
    badge: 'STEM',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, hsl(38,80%,28%) 0%, hsl(38,80%,14%) 100%)',
    accent: 'hsl(38,95%,60%)',
  },
  {
    id: '2628971597559238',
    title: 'Eventos y Celebraciones',
    desc: 'Actividades especiales, fechas festivas y la comunidad ECAN celebrando juntos.',
    badge: 'Eventos',
    emoji: '🎉',
    gradient: 'linear-gradient(135deg, hsl(270,55%,28%) 0%, hsl(270,55%,14%) 100%)',
    accent: 'hsl(270,65%,70%)',
  },
];

export default function VideosSection() {
  return (
    <section id="videos" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated bg orbs */}
      <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb),0.07) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb),0.05) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 9s ease-in-out infinite reverse' }} />

      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-tag" style={{ margin: '0 auto' }}>
            <Film size={16} />
            <span>ECAN en Video</span>
          </span>
          <h2 className="services-title">
            Mira la <span className="text-gradient">Experiencia ECAN</span> en Acción
          </h2>
          <p className="services-desc">
            Videos reales de nuestra comunidad educativa. Descubre cómo es un día en ECAN a través de los ojos de nuestros estudiantes.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '40px',
        }}>
          {reels.map((reel, i) => (
            <motion.a
              key={reel.id}
              href={`https://www.facebook.com/reel/${reel.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px ${reel.accent}55`;
                e.currentTarget.style.borderColor = `${reel.accent}44`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '';
              }}
            >
              {/* Video Thumbnail Area */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                background: reel.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* Animated grid pattern */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  animation: 'particle-drift 15s linear infinite',
                }} />

                {/* Emoji watermark */}
                <div style={{
                  position: 'absolute', fontSize: '80px', opacity: 0.08,
                  right: '10px', bottom: '-10px', lineHeight: 1,
                }}>
                  {reel.emoji}
                </div>

                {/* ECAN branding */}
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '999px', padding: '4px 12px',
                  fontSize: '0.72rem', fontWeight: 800, color: '#fff',
                  letterSpacing: '0.08em',
                }}>
                  ECAN
                </div>

                {/* Duration badge */}
                <div style={{
                  position: 'absolute', bottom: '12px', right: '12px',
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px', padding: '3px 8px',
                  fontSize: '0.72rem', fontWeight: 700, color: '#fff',
                }}>
                  Reel
                </div>

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                    border: `2px solid ${reel.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 0 8px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)`,
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: '3px' }} />
                </motion.div>

                {/* Bottom glow line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${reel.accent}, transparent)`,
                  opacity: 0.8,
                }} />
              </div>

              {/* Info */}
              <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.07em',
                  textTransform: 'uppercase', color: reel.accent,
                  background: `${reel.accent}18`,
                  borderRadius: '999px', padding: '3px 10px',
                  width: 'fit-content',
                }}>
                  <span>{reel.emoji}</span> {reel.badge}
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--text-primary)' }}>
                  {reel.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                  {reel.desc}
                </p>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.82rem', color: reel.accent, fontWeight: 700,
                  marginTop: '4px',
                }}>
                  Ver en Facebook <ExternalLink size={13} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '32px',
            fontSize: '0.8rem', color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          <span>📱</span>
          Haz clic en cualquier video para verlo directamente en Facebook
        </motion.p>
      </div>
    </section>
  );
}
