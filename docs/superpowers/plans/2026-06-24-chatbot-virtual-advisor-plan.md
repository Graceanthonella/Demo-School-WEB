# Chatbot Asesor Virtual Híbrido Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the rigid chatbot into an interactive, human-like virtual admissions advisor (Lic. Sofía Martínez) that guides parents through a personalized flow and generates a customized WhatsApp conversion link.

**Architecture:** Use a clean state machine in React (`chatState`) to track conversation progress. The user's input will feed variables like `parentName`, `selectedLevel`, and `selectedTopic`. The UI will dynamically show custom suggestion chips (Quick Replies) and render a premium WhatsApp call-to-action button when the state machine reaches the final conversion stage.

**Tech Stack:** React 19, TypeScript, Framer Motion, Lucide React, Vanilla CSS.

## Global Constraints
* The application must build without TypeScript or linting errors.
* Use HSL variables from `src/index.css` to keep the UI consistent with the glassmorphism theme.
* Do not expose any API keys. The entire state flow must remain safe on the client-side.

---

### Task 1: Chatbot State & Message Types Setup

**Files:**
* Modify: [Chatbot.tsx](file:///d:/proyectos 2026/Paginas Web/ECAN/src/components/Chatbot.tsx)

**Interfaces:**
* Consumes: Existing react states and `Message` interface.
* Produces: Updated `Message` type with optional `type` property (`'text' | 'cta'`) and a new state machine type `ChatState = 'greeting' | 'level_select' | 'topic_select' | 'detailed_response' | 'free_talk'`.

- [ ] **Step 1: Declare state types and update message structure**

Update the top of `Chatbot.tsx` to include the state structure and extend the `Message` interface:
```typescript
type ChatState = 'greeting' | 'level_select' | 'topic_select' | 'detailed_response' | 'free_talk';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  type?: 'text' | 'cta'; // 'cta' will render the custom WhatsApp button bubble
}
```

- [ ] **Step 2: Add state variables inside Chatbot component**

Add the state variables for tracking conversation details:
```typescript
const [chatState, setChatState] = useState<ChatState>('greeting');
const [parentName, setParentName] = useState('');
const [selectedLevel, setSelectedLevel] = useState('');
const [selectedTopic, setSelectedTopic] = useState('');
```

- [ ] **Step 3: Run TypeScript check to ensure types are valid**

Run: `npx tsc --noEmit`
Expected: Success with no type errors on the new definitions.

---

### Task 2: Implement Conversational Logic Engine

**Files:**
* Modify: [Chatbot.tsx](file:///d:/proyectos 2026/Paginas Web/ECAN/src/components/Chatbot.tsx)

**Interfaces:**
* Consumes: `ChatState` and state variables.
* Produces: Refactored `handleSend` function and a new `handleSuggestionClick(text: string)` function.

- [ ] **Step 1: Write helper logic to generate dynamic responses**

Implement the state-based bot response logic. The bot response should adapt dynamically based on `chatState` and update variables:
```typescript
const processBotResponse = (userInput: string, stateOverride?: ChatState) => {
  const currentState = stateOverride || chatState;
  let responseText = '';
  let nextState: ChatState = currentState;
  let messageType: 'text' | 'cta' = 'text';

  if (currentState === 'greeting') {
    // Save parent's name
    const name = userInput.trim();
    setParentName(name);
    responseText = `Un gusto saludarte, **${name}**. Para poder orientarte mejor, ¿en qué nivel académico o taller estás interesado para tu hijo/a?`;
    nextState = 'level_select';
  } else if (currentState === 'level_select') {
    // Save level
    setSelectedLevel(userInput);
    responseText = `¡Excelente elección! Para el nivel de **${userInput}** nos enfocamos en el crecimiento integral. ¿Qué te gustaría consultar hoy sobre este nivel?`;
    nextState = 'topic_select';
  } else if (currentState === 'topic_select') {
    // Save topic
    setSelectedTopic(userInput);
    if (userInput.includes('Admisión')) {
      responseText = `El proceso de admisión en Colegio ECAN está abierto y consta de 3 pasos sencillos: 1. Registro inicial, 2. Entrevista diagnóstica con psicopedagogía, y 3. Matrícula y entrega de documentos.`;
    } else if (userInput.includes('Costos')) {
      responseText = `Nuestras mensualidades y matrícula varían por nivel. Tenemos becas y planes flexibles de pago. Me encantaría compartirte el folleto digital de costos.`;
    } else if (userInput.includes('Ubicación')) {
      responseText = `Estamos ubicados en la Prolongación Alameda Juan Pablo II, San Salvador. Atendemos de Lunes a Viernes de 7:30 AM a 3:30 PM.`;
    } else {
      responseText = `Perfecto, te pondré en contacto directo con uno de nuestros asesores académicos.`;
    }
    nextState = 'detailed_response';
  }

  return { responseText, nextState, messageType };
};
```

- [ ] **Step 2: Update handleSend and handleSuggestionClick to route messages**

Rewrite `handleSend` and implement `handleSuggestionClick`:
```typescript
const handleSend = (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userText = input.trim();
  addUserMessage(userText);
  setInput('');
  
  // Advance state machine
  setIsTyping(true);
  setTimeout(() => {
    const { responseText, nextState } = processBotResponse(userText);
    addBotMessage(responseText);
    setChatState(nextState);
    setIsTyping(false);

    // If we just entered detailed_response, schedule the final WhatsApp CTA message
    if (nextState === 'detailed_response') {
      triggerFinalCta();
    }
  }, 1000);
};

const handleSuggestionClick = (suggestionText: string) => {
  addUserMessage(suggestionText);
  setIsTyping(true);
  
  setTimeout(() => {
    const { responseText, nextState } = processBotResponse(suggestionText);
    addBotMessage(responseText);
    setChatState(nextState);
    setIsTyping(false);

    if (nextState === 'detailed_response') {
      triggerFinalCta();
    }
  }, 800);
};
```

- [ ] **Step 3: Implement triggerFinalCta for conversion trigger**

Add the final trigger that displays the WhatsApp CTA bubble:
```typescript
const triggerFinalCta = () => {
  setIsTyping(true);
  setTimeout(() => {
    const botMsg: Message = {
      id: (Date.now() + 2).toString(),
      text: 'Para darte una atención 100% personalizada, haz clic aquí abajo para abrir un chat directo conmigo en WhatsApp. He preparado todos tus datos para agilizar el proceso.',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'cta'
    };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }, 1200);
};
```

- [ ] **Step 4: Run type-checking tool to verify syntax**

Run: `npx tsc --noEmit`
Expected: Compile success.

---

### Task 3: Visual Layout & Avatar Updates

**Files:**
* Modify: [Chatbot.tsx](file:///d:/proyectos 2026/Paginas Web/ECAN/src/components/Chatbot.tsx)

**Interfaces:**
* Consumes: React rendering layout.
* Produces: Rendered header containing "Lic. Sofía Martínez", active ping indicator, dynamic suggestion chips, and the custom WhatsApp button bubble.

- [ ] **Step 1: Update Chatbot Header Layout**

Replace lines 101-116 in `Chatbot.tsx` with the new human-advisor details:
```tsx
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
```

- [ ] **Step 2: Render Dynamic Suggestion Chips**

Add the suggestion chip container right below the messages scroll view:
```tsx
const getSuggestions = (): string[] => {
  if (chatState === 'level_select') {
    return ['Inicial y Primaria', 'Secundaria (STEM)', 'Talleres Extracurriculares', 'Otro'];
  }
  if (chatState === 'topic_select') {
    return ['Requisitos de Admisión', 'Costos y Matrícula', 'Ubicación y Horarios', 'Hablar con Asesor'];
  }
  return [];
};

// ... inside the render (above the input form) ...
{getSuggestions().length > 0 && (
  <div className="chatbot-suggestions" style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.01)'
  }}>
    {getSuggestions().map((sug, idx) => (
      <button
        key={idx}
        type="button"
        onClick={() => handleSuggestionClick(sug)}
        className="suggestion-chip"
        style={{
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid var(--card-border)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '0.8rem',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {sug}
      </button>
    ))}
  </div>
)}
```

- [ ] **Step 3: Render Custom WhatsApp CTA bubble**

Inside the message loop mapping, check if `msg.type === 'cta'` and render the custom green bubble:
```tsx
if (msg.type === 'cta') {
  const greeting = `Hola Lic. Sofía, mi nombre es ${parentName}.`;
  const details = `Estoy interesado/a en recibir información sobre ${selectedLevel} (específicamente sobre ${selectedTopic}).`;
  const text = `${greeting} ${details} Vengo del chat de la web del Colegio ECAN.`;
  const waUrl = `https://wa.me/50375151797?text=${encodeURIComponent(text)}`;

  return (
    <div key={msg.id} className="chatbot-message message-bot cta-bubble-wrapper" style={{ padding: '4px 0' }}>
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
          textAlign: 'center'
        }}
      >
        <span style={{ display: 'inline-flex' }}>💬</span>
        <span>Hablar por WhatsApp con Sofía</span>
      </a>
    </div>
  );
}
```

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: Compile success.

---

### Task 4: UI Styling and Pulse Effects

**Files:**
* Modify: [index.css](file:///d:/proyectos 2026/Paginas Web/ECAN/src/index.css)

**Interfaces:**
* Consumes: CSS rendering layout.
* Produces: Pulse keyframes, chip hover animations, and glow transitions.

- [ ] **Step 1: Append styles to index.css**

Open `src/index.css` and append the pulse keyframes, chip styling, and button animation at the bottom:
```css
/* Chatbot Suggestion Chips & Custom Animations */
.suggestion-chip:hover {
  background: var(--primary) !important;
  color: #ffffff !important;
  border-color: var(--primary) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.2);
}

.whatsapp-cta-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.whatsapp-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
  filter: brightness(1.05);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}
```

- [ ] **Step 2: Run build to ensure bundle creates successfully**

Run: `npm run build`
Expected: Build finishes with no errors.

---

### Task 5: Flow E2E Manual & Visual Verification

**Files:**
* Test: Interactive Browser checks

- [ ] **Step 1: Launch Local Browser check**

Ensure local Vite server is running at http://localhost:5173/ and interact with the Chatbot:
* Open Chatbot.
* Verify title is "Lic. Sofía Martínez" and online green badge is blinking/pulsing.
* Type name: "Ariel" -> Press send.
* Verify bot response addresses you as "Ariel" and presents four suggestion chips (Inicial y Primaria, Secundaria, Talleres, Otro).
* Click chip: "Secundaria (STEM)".
* Verify bot response shows benefits of STEM/Robotics level and shows new chips (Requisitos, Costos, Ubicación, Hablar con Asesor).
* Click chip: "Costos y Matrícula".
* Verify chatbot shows cost description and then displays the green **"Hablar por WhatsApp con Sofía"** CTA button.
* Hover over the WhatsApp CTA and ensure it scales up smoothly.
* Inspect the link URL of the button and verify it points to `https://wa.me/50375151797?text=...` with the pre-filled message correctly containing "Ariel", "Secundaria (STEM)", and "Costos y Matrícula".
