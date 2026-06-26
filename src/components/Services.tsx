import { motion, type Variants } from 'framer-motion';
import { BookOpen, Award, Code, Globe, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
}

const offerings: ServiceItem[] = [
  {
    icon: <BookOpen size={28} />,
    title: 'Inicial y Primaria (Montessori)',
    desc: 'Metodología Montessori y educación bilingüe basada en el respeto, la curiosidad innata y el autoaprendizaje guiado.',
    features: ['Ambientes preparados Montessori', 'Inglés intensivo integrado', 'Estimulación cognitiva activa'],
  },
  {
    icon: <Code size={28} />,
    title: 'Educación Secundaria (STEM)',
    desc: 'Formación académica sólida con profundización en áreas STEM (ciencias, tecnología, ingeniería y matemáticas).',
    features: ['Club de robótica y programación', 'Laboratorios y proyectos prácticos', 'Valores y liderazgo cristiano'],
  },
  {
    icon: <Award size={28} />,
    title: 'Talleres Extracurriculares',
    desc: 'Desarrollo artístico, científico y deportivo para potenciar las habilidades y el crecimiento creativo de cada estudiante.',
    features: ['Taller de Robótica ECAN', 'Música y artes plásticas', 'Deportes y oratoria'],
  },
];

export default function Services() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
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

  return (
    <section id="servicios" className="section" style={{ background: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <span className="hero-tag" style={{ margin: '0 auto' }}>
            <Globe size={16} />
            <span>Nuestra Propuesta Educativa</span>
          </span>
          <h2 className="services-title">Formación Integral de <span className="text-gradient">Excelencia</span></h2>
          <p className="services-desc">
            Ofrecemos niveles desde estimulación temprana hasta primaria y secundaria con un enfoque integral basado en el sistema Montessori cristiano y desarrollo STEM.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {offerings.map((offering, idx) => (
            <motion.div 
              key={idx} 
              className="service-card glass-panel"
              variants={cardVariants}
            >
              <div className="service-icon-wrapper">
                {offering.icon}
              </div>
              <h3 className="service-card-title">{offering.title}</h3>
              <p className="service-card-desc">{offering.desc}</p>
              
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                {offering.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#contacto" className="service-link">
                Conocer Más <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
