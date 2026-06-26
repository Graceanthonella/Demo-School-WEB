import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

import docente1 from '../assets/imagenes/08_personal_docente/Docentes_1.png';
import docente2 from '../assets/imagenes/08_personal_docente/Docentes_2.png';
import docente3 from '../assets/imagenes/08_personal_docente/Docentes_3.png';
import docente4 from '../assets/imagenes/08_personal_docente/Docentes_4.png';

const docentes = [
  { img: docente1, name: 'Equipo Docente ECAN', area: 'Personal Académico', desc: 'Educadores certificados y apasionados por la metodología Montessori y la educación cristiana.' },
  { img: docente2, name: 'Área Bilingüe', area: 'Inglés & Español', desc: 'Maestros nativos y certificados en inmersión bilingüe para garantizar fluidez en ambos idiomas.' },
  { img: docente3, name: 'Talleres STEM', area: 'Robótica & Ciencias', desc: 'Instructores especializados en tecnología, robótica y ciencias aplicadas para niños y jóvenes.' },
  { img: docente4, name: 'Formación Espiritual', area: 'Valores Cristianos', desc: 'Un equipo comprometido con la formación en valores, fe y carácter para la vida de cada alumno.' },
];

export default function Docentes() {
  return (
    <section id="docentes" className="section" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-tag" style={{ margin: '0 auto' }}>
            <Users size={16} />
            <span>Nuestro Equipo</span>
          </span>
          <h2 className="services-title">
            Educadores <span className="text-gradient">Apasionados por tu Hijo</span>
          </h2>
          <p className="services-desc">
            En ECAN contamos con un equipo docente altamente calificado, comprometido con la excelencia académica y la formación integral de cada estudiante.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
          marginTop: '40px',
        }}>
          {docentes.map((d, i) => (
            <motion.div
              key={i}
              className="glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(var(--primary-rgb),0.15)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '')}
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img
                  src={d.img}
                  alt={d.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, var(--card-bg,rgba(255,255,255,0.95)), transparent)',
                }} />
              </div>

              {/* Info */}
              <div style={{ padding: '20px 22px 24px', flex: 1 }}>
                <div style={{
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--primary)',
                  marginBottom: '6px',
                }}>
                  {d.area}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>{d.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{d.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
