import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const contactSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Ingrese un correo electrónico válido' }),
  nivel: z.string(),
  mensaje: z.string().optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      email: '',
      nivel: 'Primaria',
      mensaje: ''
    }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data submitted:', data);
    setSubmitted(true);

    // Trigger confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Reset form after a few seconds
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '48px',
      alignItems: 'center'
    }}>
      {/* Contact Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <span className="hero-tag">
          <Phone size={16} />
          <span>Contacto Directo</span>
        </span>
        <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>¿Listo para empezar tu <span className="text-gradient">Próximo Paso?</span></h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Completa el formulario a la derecha y nuestro equipo te contactará en menos de 24 horas hábiles para ayudarte con todas tus consultas.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          {/* Address */}
          <a
            href="https://maps.google.com/?q=Prolongaci%C3%B3n+Alameda+Juan+Pablo+II+San+Salvador+El+Salvador"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', textDecoration: 'none', color: 'inherit' }}
          >
            <MapPin size={20} className="text-gradient" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Prolongación Alameda Juan Pablo II</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                300 mts al pte de 75 Av. Norte<br />
                San Salvador, El Salvador, C.P. 1101
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginTop: '4px', fontWeight: 600 }}>📍 Ver en Google Maps →</div>
            </div>
          </a>

          {/* Phone */}
          <a href="tel:+50375151797" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <Phone size={20} className="text-gradient" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>+503 7515 1797</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Toca para llamar</div>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:info@ecan.edu.sv" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <Mail size={20} className="text-gradient" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>info@ecan.edu.sv</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Respondemos en &lt;24 hrs hábiles</div>
            </div>
          </a>

          {/* Website */}
          <a href="https://escuelaecan.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🌐</span>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)' }}>escuelaecan.com</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Sitio web oficial</div>
            </div>
          </a>

          {/* Hours */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🕐</span>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Horario de Atención</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Lunes – Viernes: 7:00 AM – 5:00 PM<br />
                Sábados y Domingos: Cerrado
              </div>
            </div>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', padding: '12px 16px', background: 'rgba(var(--primary-rgb),0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(var(--primary-rgb),0.12)' }}>
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Recomendado por el 86%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>17 opiniones en Facebook</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form Card */}
      <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '24px 0' }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>¡Solicitud Recibida!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Gracias por escribirnos. Nos pondremos en contacto contigo a la brevedad.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="nombre" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                placeholder="Ej. Juan Pérez"
                className="chatbot-input"
                style={{ background: 'var(--bg-primary)', width: '100%' }}
                {...register('nombre')}
              />
              {errors.nombre && (
                <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '2px' }}>
                  {errors.nombre.message}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="ejemplo@correo.com"
                className="chatbot-input"
                style={{ background: 'var(--bg-primary)', width: '100%' }}
                {...register('email')}
              />
              {errors.email && (
                <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '2px' }}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="nivel" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Nivel de Interés</label>
              <select
                id="nivel"
                className="chatbot-input"
                style={{ background: 'var(--bg-primary)', cursor: 'pointer', width: '100%' }}
                {...register('nivel')}
              >
                <option value="Montessori">Inicial y Primaria (Montessori)</option>
                <option value="Secundaria">Educación Secundaria (STEM)</option>
                <option value="Talleres">Talleres Extracurriculares</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="mensaje" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Mensaje (Opcional)</label>
              <textarea
                id="mensaje"
                rows={3}
                placeholder="¿Tienes alguna pregunta o requerimiento especial?"
                className="chatbot-input"
                style={{ background: 'var(--bg-primary)', resize: 'vertical', width: '100%' }}
                {...register('mensaje')}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Enviar Solicitud <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
