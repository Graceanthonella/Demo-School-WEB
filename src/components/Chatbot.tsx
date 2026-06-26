import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

type ChatState = 'greeting' | 'level_select' | 'topic_select' | 'detailed_response' | 'free_talk';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  type?: 'text' | 'cta';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // State machine variables
  const [chatState, setChatState] = useState<ChatState>('greeting');
  const [parentName, setParentName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Qué alegría saludarte. Soy la Lic. Sofía Martínez, encargada de admisiones del Colegio ECAN. 🎓 Me encantaría guiarte personalmente. ¿Con quién tengo el gusto de hablar?',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const addUserMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
  };

  const addBotMessage = (text: string) => {
    const botMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const triggerFinalCta = () => {
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Para darte una atención 100% personalizada, he preparado tus datos. Haz clic abajo para abrir un chat directo conmigo en WhatsApp y recibir toda la información de inmediato.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'cta'
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // Trigger final celebratory confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 }
      });
    }, 1200);
  };

  const processBotResponse = (userInput: string, currentState: ChatState) => {
    let responseText = '';
    let nextState = currentState;

    if (currentState === 'greeting') {
      const name = userInput.trim();
      setParentName(name);
      responseText = `Un gusto saludarte, ${name}. Para poder orientarte mejor, ¿en qué nivel académico o servicio del Colegio ECAN estás interesado/a para tu hijo/a?`;
      nextState = 'level_select';
      
      // Fun micro-confetti on name submission
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 }
      });
    } else if (currentState === 'level_select') {
      setSelectedLevel(userInput);
      responseText = `¡Excelente elección! Para el nivel de "${userInput}" nos enfocamos en una formación integral de excelencia. ¿Qué te gustaría consultar hoy sobre este nivel?`;
      nextState = 'topic_select';
    } else if (currentState === 'topic_select') {
      setSelectedTopic(userInput);
      if (userInput.includes('Admisión')) {
        responseText = 'El proceso de admisión para Escuela Cristiana ECAN ya está abierto. Consta de 3 sencillos pasos: 1. Registro e información en secretaría, 2. Entrevista diagnóstica con psicopedagogía, y 3. Entrega de documentos y matrícula.';
      } else if (userInput.includes('Costos')) {
        responseText = 'Nuestras colegiaturas varían según el nivel académico. Para enviarte la hoja de aranceles detallada y las promociones vigentes, con gusto te las comparto directamente.';
      } else if (userInput.includes('Ubicación')) {
        responseText = 'Estamos ubicados en Prolongación Alameda Juan Pablo II, 300 mts al poniente de la 75 Av. Norte, San Salvador, El Salvador. Nuestro horario de atención es de Lunes a Viernes de 7:30 AM a 3:30 PM.';
      } else {
        responseText = 'Perfecto. Con gusto te pondré en contacto de forma directa para atender todas tus consultas particulares.';
      }
      nextState = 'detailed_response';
    } else {
      responseText = 'Entiendo perfectamente tu consulta. Para poder darte detalles específicos o agendar una cita guiada por las instalaciones, te sugiero que hablemos directamente por WhatsApp.';
      nextState = 'free_talk';
    }

    return { responseText, nextState };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    addUserMessage(userText);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, nextState } = processBotResponse(userText, chatState);
      addBotMessage(responseText);
      setChatState(nextState);
      setIsTyping(false);

      if (nextState === 'detailed_response') {
        triggerFinalCta();
      }
    }, 1000);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    addUserMessage(suggestionText);
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, nextState } = processBotResponse(suggestionText, chatState);
      addBotMessage(responseText);
      setChatState(nextState);
      setIsTyping(false);

      if (nextState === 'detailed_response') {
        triggerFinalCta();
      }
    }, 800);
  };

  return (
    <div className="chatbot-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel glass-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                  <img src="/src/assets/avatar_chatbot.png" alt="Lic. Sofía Martínez" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="chatbot-avatar-badge" style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    background: '#22c55e',
                    border: '2px solid var(--bg-primary)',
                    borderRadius: '50%'
                  }}></span>
                </div>
                <div className="chatbot-header-text">
                  <h4>Lic. Sofía Martínez</h4>
                  <span className="chatbot-status">
                    <span className="chatbot-status-dot" style={{ background: '#22c55e', display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', marginRight: '6px', animation: 'pulse 1.5s infinite' }}></span> 
                    En línea (Admisiones)
                  </span>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
                <X size={20} />
              </button>
            </div>

            {/* Messages body */}
            <div className="chatbot-messages">
              {messages.map(msg => {
                if (msg.type === 'cta') {
                  const greetingText = `Hola Lic. Sofía, mi nombre es ${parentName}.`;
                  const detailsText = `Estoy interesado/a en recibir información sobre "${selectedLevel}" (específicamente sobre "${selectedTopic}").`;
                  const fullText = `${greetingText} ${detailsText} Vengo de interactuar con el asistente de la web de ECAN.`;
                  const waUrl = `https://wa.me/50375151797?text=${encodeURIComponent(fullText)}`;
                  return (
                    <div key={msg.id} className="chatbot-message message-bot cta-bubble-wrapper" style={{ padding: '8px 0', alignSelf: 'stretch', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ marginBottom: '8px' }}>{msg.text}</p>
                      <a 
                        href={waUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="whatsapp-cta-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '12px 18px',
                          background: 'linear-gradient(135deg, #25D366, #128C7E)',
                          color: '#ffffff',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          fontWeight: 600,
                          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          marginTop: '4px'
                        }}
                      >
                        <span>💬</span>
                        <span>Chatear por WhatsApp con Sofía</span>
                      </a>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`chatbot-message ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
                  >
                    <p>{msg.text}</p>
                    <span style={{
                      fontSize: '0.65rem',
                      opacity: 0.7,
                      display: 'block',
                      textAlign: msg.sender === 'user' ? 'right' : 'left',
                      marginTop: '4px'
                    }}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}
              {isTyping && (
                <div className="chatbot-message message-bot" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '12px 20px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1s infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1s infinite 0.2s' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1s infinite 0.4s' }}></span>
                  <style>{`
                    @keyframes bounce {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-4px); }
                    }
                  `}</style>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {(() => {
              const getSuggestions = (): string[] => {
                if (chatState === 'level_select') {
                  return ['Inicial y Primaria', 'Secundaria (STEM)', 'Talleres Extracurriculares', 'Otro'];
                }
                if (chatState === 'topic_select') {
                  return ['Requisitos de Admisión', 'Costos y Matrícula', 'Ubicación y Horarios', 'Hablar con Asesor'];
                }
                return [];
              };

              const suggestions = getSuggestions();
              if (suggestions.length === 0) return null;

              return (
                <div className="chatbot-suggestions" style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  padding: '8px 16px',
                  background: 'var(--bg-secondary)',
                  borderTop: '1px solid var(--card-border)',
                  borderBottom: '1px solid var(--card-border)',
                  justifyContent: 'center'
                }}>
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionClick(sug)}
                      className="suggestion-chip"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--card-border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* Input area */}
            <form onSubmit={handleSend} className="chatbot-input-area">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="chatbot-input"
              />
              <button type="submit" className="chatbot-send-btn" aria-label="Enviar mensaje">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button 
        className="chatbot-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir asistente virtual"
        title="Abrir chat"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
