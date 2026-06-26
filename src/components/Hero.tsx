import { motion, type Variants } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Users, TrendingUp, Calendar } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const badgeVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="inicio" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 100px' }}>
      {/* Decorative Background Grid */}
      <div className="bg-grid-pattern"></div>
      
      {/* Background Decorative Blur Orbs */}
      <div className="bg-blur-shape shape-1" style={{ filter: 'blur(140px)', opacity: 0.25 }}></div>
      <div className="bg-blur-shape shape-2" style={{ filter: 'blur(140px)', opacity: 0.2 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="hero-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Content */}
          <div className="hero-content" style={{ textAlign: 'left' }}>
            <motion.div className="hero-tag" variants={itemVariants}>
              <Sparkles size={16} className="text-gradient" />
              <span>Escuela Cristiana ECAN</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants} style={{ letterSpacing: '-0.02em' }}>
              Educación Cristiana y Metodología <span className="text-gradient">Montessori</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants} style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              Formamos líderes íntegros con una sólida base académica bilingüe y valores cristianos, implementando metodologías activas para el aprendizaje integral de cada estudiante.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <a href="#servicios" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                Conocer Oferta <ArrowRight size={18} />
              </a>
              <a href="#contacto" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                Admisiones 2026
              </a>
            </motion.div>
          </div>

          {/* Hero Visual Area - High-End App Mockup */}
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {/* Main macOS Mockup Window */}
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '520px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -15px var(--shadow-color), 0 0 50px 0 var(--shadow-glow)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              aspectRatio: '1.3'
            }}>
              {/* macOS Style Window Header */}
              <div style={{
                height: '40px',
                borderBottom: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 600,
                  opacity: 0.8
                }}>
                  app.Colegio ECAN.com
                </div>
                <div style={{ width: '52px' }}></div>
              </div>

              {/* Mockup Dashboard Workspace */}
              <div style={{
                flex: 1,
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '16px',
                background: 'rgba(var(--primary-rgb), 0.01)',
                alignItems: 'stretch'
              }}>
                {/* Left Column: Stats & Chart */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Dashboard Chart Card */}
                  <div className="glass-panel" style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Modelo Educativo</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>Montessori & STEM</p>
                      </div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.65rem',
                        fontWeight: 700
                      }}>
                        <TrendingUp size={10} /> Bilingüe
                      </span>
                    </div>

                    {/* SVG Mock Sparkline Graph */}
                    <svg viewBox="0 0 300 80" style={{ width: '100%', height: '45px', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,80 Q25,35 50,45 T100,20 T150,55 T200,15 T250,40 T300,5 L300,80 L0,80 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0,80 Q25,35 50,45 T100,20 T150,55 T200,15 T250,40 T300,5"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="200" cy="15" r="5" fill="var(--primary)" />
                      <circle cx="200" cy="15" r="10" fill="var(--primary)" opacity="0.3" />
                    </svg>
                  </div>

                  {/* Sub-grid for Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* Dashboard Metric 1 */}
                    <div className="glass-panel" style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: 'none'
                    }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(var(--primary-rgb), 0.1)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Users size={16} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>Enfoque</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 800 }}>100% Bilingüe</p>
                      </div>
                    </div>

                    {/* Dashboard Metric 2 */}
                    <div className="glass-panel" style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: 'none'
                    }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>Formación</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 800 }}>En Valores</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Robotics Lab Image Showcase */}
                <div className="glass-panel" style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  <img 
                    src="/src/assets/taller_robotica.png" 
                    alt="Taller de Robótica ECAN" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '6px 10px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-title)',
                    fontWeight: 600
                  }}>
                    Club STEM & Robótica
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge 1 - Left */}
            <motion.div 
              className="hero-badge-float glass-panel"
              variants={badgeVariants}
              animate="animate"
              style={{
                left: '-15px',
                bottom: '15%',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="hero-badge-icon" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Experiencia</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 800 }}>Fundado en 2009</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 - Right */}
            <motion.div 
              className="hero-badge-float glass-panel"
              style={{
                bottom: 'auto',
                top: '12%',
                right: '-15px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(20px)'
              }}
              variants={badgeVariants}
              animate="animate"
              transition={{ delay: 2 }}
            >
              <div className="hero-badge-icon" style={{ background: 'var(--accent)' }}>
                <Users size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Comunidad</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 800 }}>Atención Personalizada</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
