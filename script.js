// BS COMUNICACIONES - JavaScript Simplificado
document.addEventListener('DOMContentLoaded', function() {
    console.log('BS Comunicaciones - Página cargada');

    // Elementos principales
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const btnTop = document.getElementById('btn-top');
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Menú móvil
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('menu-open');
            menuToggle.classList.toggle('active');
            
            if (navLinks.classList.contains('menu-open')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });

        // Cerrar menú al hacer clic en enlaces
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Botón volver arriba
    if (btnTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                btnTop.classList.add('show');
            } else {
                btnTop.classList.remove('show');
            }
        });

        btnTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Chatbot
    if (chatBubble && chatWindow) {
        let chatInitialized = false;
        
        chatBubble.addEventListener('click', function() {
            chatWindow.classList.add('open');
            initializeChat();
            
            // Enviar mensaje de bienvenida solo la primera vez
            if (!chatInitialized) {
                chatInitialized = true;
                setTimeout(() => {
                    addMessageToChat('bot', '¡Hola! Soy el asistente virtual de BS Comunicaciones. ¿En qué puedo ayudarte hoy? 😊');
                    updateChatStatus('🤖 Asistente local activo', 'local');
                }, 500);
            }
        });

        if (closeChat) {
            closeChat.addEventListener('click', function() {
                chatWindow.classList.remove('open');
            });
        }

        // Configuración del webhook de n8n - URL de producción
        const N8N_WEBHOOK_URL = 'https://n8n.srv966239.hstgr.cloud/webhook/chatbot_bs';
        
        // URLs alternativas para fallback (mantenemos solo la de producción por ahora)
        const WEBHOOK_ALTERNATIVES = [
            'https://n8n.srv966239.hstgr.cloud/webhook/chatbot_bs'
        ];

        // Chatbot local como respaldo
        const LOCAL_RESPONSES = {
            greetings: [
                '¡Hola! Soy el asistente de BS Comunicaciones. ¿En qué puedo ayudarte?',
                '¡Bienvenido a BS Comunicaciones! ¿Cómo puedo asistirte hoy?',
                '¡Hola! Gracias por contactarnos. ¿En qué servicio estás interesado?'
            ],
            services: [
                'Ofrecemos desarrollo de software, sistemas POS, aplicaciones web, redes y telecomunicaciones. ¿Te interesa algún servicio en particular?',
                'Nuestros servicios incluyen: desarrollo de software personalizado, sistemas POS para hoteles y restaurantes, instalación de redes, y soporte técnico.',
                'Somos especialistas en desarrollo de software, sistemas de gestión hotelera, redes de telecomunicaciones y soporte técnico integral.'
            ],
            contact: [
                'Puedes contactarnos al WhatsApp +57 321 436 4223 o al email f_nis88@hotmail.com',
                'Para más información escríbenos al +57 321 436 4223 o envía un email a f_nis88@hotmail.com',
                'Nuestro contacto directo es +57 321 436 4223 (WhatsApp) o f_nis88@hotmail.com'
            ],
            default: [
                'Interesante pregunta. Para brindarte información más específica, te recomiendo contactarnos al +57 321 436 4223.',
                'Gracias por tu consulta. Para una respuesta más detallada, comunícate con nosotros al WhatsApp +57 321 436 4223.',
                'Podemos ayudarte mejor por WhatsApp al +57 321 436 4223 donde podremos resolver todas tus dudas.'
            ]
        };

        // Función para obtener respuesta local
        function getLocalResponse(message) {
            const msg = message.toLowerCase();
            
            // Saludos
            if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas') || msg.includes('saludo') || msg.includes('hi')) {
                return LOCAL_RESPONSES.greetings[Math.floor(Math.random() * LOCAL_RESPONSES.greetings.length)];
            }
            
            // Servicios
            if (msg.includes('servicio') || msg.includes('que hacen') || msg.includes('software') || 
                msg.includes('pos') || msg.includes('desarrollo') || msg.includes('aplicación') || 
                msg.includes('web') || msg.includes('sistema') || msg.includes('programación') ||
                msg.includes('hotel') || msg.includes('restaurante') || msg.includes('red') || 
                msg.includes('telecomunicación') || msg.includes('soporte')) {
                return LOCAL_RESPONSES.services[Math.floor(Math.random() * LOCAL_RESPONSES.services.length)];
            }
            
            // Contacto
            if (msg.includes('contacto') || msg.includes('teléfono') || msg.includes('whatsapp') || 
                msg.includes('email') || msg.includes('número') || msg.includes('llamar') || 
                msg.includes('escribir') || msg.includes('comunicar') || msg.includes('celular')) {
                return LOCAL_RESPONSES.contact[Math.floor(Math.random() * LOCAL_RESPONSES.contact.length)];
            }
            
            // Precios
            if (msg.includes('precio') || msg.includes('costo') || msg.includes('valor') || 
                msg.includes('cuanto') || msg.includes('cotización') || msg.includes('presupuesto')) {
                return 'Para conocer precios y cotizaciones personalizadas, contáctanos al +57 321 436 4223. Cada proyecto es único y adaptamos nuestras soluciones a tus necesidades específicas.';
            }
            
            // Agradecimientos
            if (msg.includes('gracias') || msg.includes('thanks') || msg.includes('perfecto') || 
                msg.includes('excelente') || msg.includes('muy bien')) {
                return '¡De nada! Estamos aquí para ayudarte. Si tienes más preguntas, no dudes en contactarnos al +57 321 436 4223. 😊';
            }
            
            return LOCAL_RESPONSES.default[Math.floor(Math.random() * LOCAL_RESPONSES.default.length)];
        }

        // Función para actualizar el estado del chat
        function updateChatStatus(message, type = 'online') {
            const statusElement = document.querySelector('.chat-status');
            if (statusElement) {
                if (type === 'local') {
                    statusElement.textContent = message;
                    statusElement.style.color = '#f59e0b'; // Naranja para modo local
                } else if (type === 'online') {
                    statusElement.textContent = message;
                    statusElement.style.color = '#10b981'; // Verde para online
                } else if (type === 'error') {
                    statusElement.textContent = message;
                    statusElement.style.color = '#ef4444'; // Rojo para error
                }
            }
        }
        
        // Función para enviar con múltiples intentos
        async function sendWithRetry(requestData) {
            for (let i = 0; i < WEBHOOK_ALTERNATIVES.length; i++) {
                const url = WEBHOOK_ALTERNATIVES[i];
                try {
                    // Crear AbortController para manejo de timeout
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(requestData),
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok) {
                        return response;
                    } else {
                        if (i === WEBHOOK_ALTERNATIVES.length - 1) {
                            throw new Error(`Todos los webhooks fallaron. Último error: ${response.status}`);
                        }
                    }
                } catch (error) {
                    if (i === WEBHOOK_ALTERNATIVES.length - 1) {
                        throw error;
                    }
                }
            }
        }



        // Enviar mensaje del chat
        async function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Mostrar mensaje del usuario
                addMessageToChat('user', message);
                chatInput.value = '';
                
                // Mostrar indicador de escritura
                addTypingIndicator();
                
                try {
                    // Preparar datos para enviar
                    const requestData = {
                        message: message,
                        timestamp: new Date().toISOString(),
                        user_id: generateUserId(),
                        session_id: getSessionId(),
                        source: 'website_chat'
                    };
                    
                    // Enviar mensaje al agente de n8n con retry
                    const response = await sendWithRetry(requestData);

                    if (response.ok) {
                        // Intentar parsear como JSON, si falla usar como texto
                        let data;
                        const contentType = response.headers.get('content-type');
                        
                        if (contentType && contentType.includes('application/json')) {
                            data = await response.json();
                        } else {
                            data = await response.text();
                        }
                        
                        // Remover indicador de escritura
                        removeTypingIndicator();
                        
                        // Actualizar estado de conexión
                        updateConnectionStatus(true);
                        updateChatStatus('🟢 Asistente inteligente activo', 'online');
                        
                        // Verificar si hay error en el workflow de n8n
                        if (data && typeof data === 'object' && data.message === 'Error in workflow') {
                            console.log('Error en workflow de n8n, usando chatbot local');
                            removeTypingIndicator();
                            updateChatStatus('🤖 Modo asistente local', 'local');
                            const localResponse = getLocalResponse(message);
                            addMessageToChat('bot', localResponse);
                            return;
                        }
                        
                        // Mostrar respuesta del bot - manejar diferentes formatos
                        let botMessage = '';
                        
                        if (typeof data === 'string') {
                            try {
                                // Intentar parsear si es JSON string
                                const parsed = JSON.parse(data);
                                
                                // Verificar si el parsed también contiene error de workflow
                                if (parsed.message === 'Error in workflow') {
                                    console.log('Error en workflow detectado en JSON parseado');
                                    removeTypingIndicator();
                                    updateChatStatus('🤖 Modo asistente local', 'local');
                                    const localResponse = getLocalResponse(message);
                                    addMessageToChat('bot', localResponse);
                                    return;
                                }
                                
                                botMessage = parsed.reply || parsed.response || parsed.message || data;
                            } catch (e) {
                                // Si no es JSON válido, usar como string
                                botMessage = data;
                            }
                        } else if (typeof data === 'object' && data !== null) {
                            // Si es objeto, buscar en diferentes campos comunes
                            botMessage = data.reply ||           // Formato común de n8n
                                        data.output || 
                                        data.response || 
                                        data.message || 
                                        data.text || 
                                        data.result ||
                                        data.content ||
                                        JSON.stringify(data);
                        }
                        
                        // Limpiar comillas adicionales si las hay
                        if (typeof botMessage === 'string') {
                            botMessage = botMessage.replace(/^"|"$/g, '');
                        }
                        
                        // Fallback si no se encuentra mensaje válido
                        if (!botMessage || botMessage.trim() === '') {
                            botMessage = 'Recibí tu mensaje. ¿En qué más puedo ayudarte?';
                        }
                        
                        addMessageToChat('bot', botMessage);
                    } else {
                        const errorText = await response.text();
                        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
                    }
                } catch (error) {
                    // Remover indicador de escritura
                    removeTypingIndicator();
                    
                    // Actualizar estado de conexión
                    updateConnectionStatus(false);
                    
                    // Usar chatbot local como respaldo
                    console.log('Webhook no disponible, usando chatbot local:', error.message);
                    
                    // Simular un pequeño delay para parecer más natural
                    setTimeout(() => {
                        updateChatStatus('🤖 Modo asistente local', 'local');
                        const localResponse = getLocalResponse(message);
                        addMessageToChat('bot', localResponse);
                    }, 1000);
                }
            }
        }

        if (sendChatBtn) {
            sendChatBtn.addEventListener('click', sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // Función para formatear mensajes del bot
    function formatBotMessage(message) {
        // Limpiar el mensaje de caracteres de escape y formato JSON
        let cleanMessage = message
            .replace(/\\n/g, '\n')  // Reemplazar \n con saltos de línea reales
            .replace(/\\\"/g, '"')  // Reemplazar \" con "
            .trim();

        // Dividir en párrafos para mejor procesamiento
        const paragraphs = cleanMessage.split('\n\n');
        let formattedParagraphs = [];

        paragraphs.forEach(paragraph => {
            let formatted = paragraph;
            
            // Formatear texto en negrita **texto** → <strong>texto</strong>
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Formatear productos con formato 🔹 **Nombre** | Tipo | Specs | Uso | **$Precio**
            if (formatted.includes('🔹')) {
                formatted = formatted.replace(/🔹\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*\*\*\$(.*?)\*\*/g,
                    '<div class="product-item"><div class="product-name">🔹 <strong>$1</strong></div><div class="product-details"><span class="product-type">$2</span><span class="product-specs">$3</span><span class="product-use">$4</span><span class="product-price"><strong>$$$5</strong></span></div></div>');
            }
            
            // Formatear campos de formulario numerados
            if (formatted.match(/^\d+\.\s*\*\*(.*?):\*\*/)) {
                formatted = formatted.replace(/^(\d+)\.\s*\*\*(.*?):\*\*/gm, 
                    '<div class="question-field"><span class="field-number">$1</span><strong>$2:</strong></div>');
            }
            // Formatear listas numeradas simples
            else if (formatted.match(/^\d+\.\s/)) {
                formatted = formatted.replace(/^(\d+)\.\s(.+)/gm, 
                    '<div class="list-item"><span class="list-number">$1</span>$2</div>');
            }
            
            // Formatear emojis de organización (📋 📞 📧 📅 🏢)
            formatted = formatted.replace(/^(📋|📞|📧|📅|🏢|📹|💰|🔧|📊|✅|❌|⚠️|💡|🎯)\s*(.+)/gm, 
                '<div class="emoji-line"><span class="emoji-icon">$1</span><span class="emoji-text">$2</span></div>');
                
            // Formatear mensajes de confirmación
            if (formatted.includes('✅') || formatted.includes('confirmad') || formatted.includes('agendad')) {
                formatted = '<div class="confirmation-message">' + formatted + '</div>';
            }
            
            // Formatear alertas o advertencias
            if (formatted.includes('⚠️') || formatted.includes('importante') || formatted.includes('nota')) {
                formatted = '<div class="warning-message">' + formatted + '</div>';
            }
            
            // Detectar y formatear opciones de modalidad
            if (formatted.includes('Virtual o Presencial') || formatted.includes('¿Virtual o Presencial?')) {
                formatted = formatted.replace(/(Virtual o Presencial\??)/g, 
                    '<div class="modal-options"><button class="modal-btn" data-option="Virtual">📹 Virtual</button><button class="modal-btn" data-option="Presencial">🏢 Presencial</button></div>');
            }
            
            // Convertir saltos de línea simples en <br>
            formatted = formatted.replace(/\n/g, '<br>');
            
            formattedParagraphs.push(formatted);
        });

        return formattedParagraphs.join('<div class="paragraph-break"></div>');
    }

    // Función para agregar mensajes al chat
    function addMessageToChat(sender, message) {
        if (chatBody) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            
            // Agregar timestamp
            const timestamp = new Date().toLocaleTimeString('es-CO', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            // Formatear mensaje si es del bot
            const formattedMessage = sender === 'bot' ? formatBotMessage(message) : message;
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${formattedMessage}</div>
                    <span class="message-time">${timestamp}</span>
                </div>
            `;
            
            chatBody.appendChild(messageDiv);
            
            // Agregar event listeners para botones de modalidad
            if (sender === 'bot') {
                const modalButtons = messageDiv.querySelectorAll('.modal-btn');
                modalButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        const option = this.getAttribute('data-option');
                        chatInput.value = `Prefiero modalidad ${option}`;
                        sendMessage();
                        
                        // Deshabilitar todos los botones de modalidad después de seleccionar
                        modalButtons.forEach(function(b) {
                            b.disabled = true;
                            b.style.opacity = '0.5';
                            b.style.cursor = 'not-allowed';
                        });
                        
                        // Marcar el botón seleccionado
                        this.style.background = 'var(--color-accent)';
                        this.style.borderColor = 'var(--color-accent)';
                        this.style.color = 'white';
                        this.style.opacity = '1';
                    });
                });
            }
            
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    // Funciones auxiliares para el chat
    function generateUserId() {
        // Generar o recuperar ID único del usuario
        let userId = localStorage.getItem('bs_chat_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('bs_chat_user_id', userId);
        }
        return userId;
    }

    function getSessionId() {
        // Generar o recuperar ID de sesión
        let sessionId = sessionStorage.getItem('bs_chat_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('bs_chat_session_id', sessionId);
        }
        return sessionId;
    }

    function addTypingIndicator() {
        if (chatBody) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message bot typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatBody.appendChild(typingDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Inicializar chat con mensaje de bienvenida
    function initializeChat() {
        if (chatBody && chatBody.children.length === 0) {
            setTimeout(function() {
                addMessageToChat('bot', '¡Hola! 👋 Soy el asistente virtual de BS Comunicaciones. ¿En qué puedo ayudarte hoy?');
                
                // Agregar algunos mensajes sugeridos
                setTimeout(function() {
                    addQuickReplies();
                }, 1000);
            }, 500);
        }
    }



    // Agregar respuestas rápidas
    function addQuickReplies() {
        if (chatBody) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';
            quickRepliesDiv.innerHTML = `
                <p>¿En qué puedo ayudarte?</p>
                <div class="quick-reply-buttons">
                    <button class="quick-reply-btn" data-message="Quiero agendar una asesoría">� Agendar Asesoría</button>
                    <button class="quick-reply-btn" data-message="¿Qué cámaras de seguridad manejan?">📹 Cámaras</button>
                    <button class="quick-reply-btn" data-message="¿Qué servicios ofrecen?">� Servicios</button>
                    <button class="quick-reply-btn" data-message="Necesito desarrollo de software">� Software</button>
                </div>
            `;
            chatBody.appendChild(quickRepliesDiv);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Agregar eventos a los botones de respuesta rápida
            const quickReplyButtons = quickRepliesDiv.querySelectorAll('.quick-reply-btn');
            quickReplyButtons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const message = this.getAttribute('data-message');
                    chatInput.value = message;
                    sendMessage();
                    quickRepliesDiv.remove();
                });
            });
        }
    }

    // Función para verificar el estado de conexión
    function updateConnectionStatus(isOnline) {
        const statusElement = document.querySelector('.chat-status');
        if (statusElement) {
            if (isOnline) {
                statusElement.textContent = '🟢 En línea';
                statusElement.style.color = '#10b981';
            } else {
                statusElement.textContent = '🔴 Desconectado';
                statusElement.style.color = '#ef4444';
            }
        }
    }

    // Verificar conexión periódicamente
    setInterval(function() {
        updateConnectionStatus(navigator.onLine);
    }, 5000);

    // Scroll suave para enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efectos de scroll en header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animaciones de entrada simple
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        observer.observe(section);
    });

    // Observar tarjetas
    const cards = document.querySelectorAll('.about-card, .service-card');
    cards.forEach(function(card) {
        observer.observe(card);
    });

    // Efectos de fondo animados para el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        // Crear partículas flotantes de fondo
        function createBackgroundParticles() {
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'bg-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (8 + Math.random() * 4) + 's';
                hero.appendChild(particle);
            }
        }
        
        // Crear ondas de fondo
        function createBackgroundWaves() {
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'bg-wave';
                wave.style.animationDelay = i * 2 + 's';
                wave.style.opacity = 0.1 - (i * 0.02);
                hero.appendChild(wave);
            }
        }

        // Crear efecto de resplandor central
        const centralGlow = document.createElement('div');
        centralGlow.className = 'central-glow';
        hero.appendChild(centralGlow);

        // Crear líneas laterales
        function createSideGlows() {
            for (let i = 0; i < 2; i++) {
                const sideGlow = document.createElement('div');
                sideGlow.className = 'side-glow';
                hero.appendChild(sideGlow);
            }
        }

        // Crear efecto de grid sutil
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'grid-overlay';
        gridOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(6, 214, 160, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 214, 160, 0.02) 1px, transparent 1px);
            background-size: 50px 50px;
            pointer-events: none;
            z-index: 1;
            animation: gridMove 20s linear infinite;
        `;
        hero.appendChild(gridOverlay);

        // Inicializar efectos
        createBackgroundParticles();
        createBackgroundWaves();
        createSideGlows();
    }

    // Efectos para el formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        // Efecto de validación en tiempo real
        formInputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-content');
                } else {
                    this.classList.remove('has-content');
                }
            });

            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
            });
        });

        // Efecto de envío del formulario
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.btn-send');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            // Cambiar estado del botón
            btnText.textContent = 'Enviando...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            submitBtn.style.background = 'var(--color-gray-500)';
            
            // Simular envío (en producción esto sería real)
            setTimeout(function() {
                btnText.textContent = '¡Mensaje enviado!';
                btnIcon.className = 'fas fa-check';
                submitBtn.style.background = 'var(--color-accent)';
                
                setTimeout(function() {
                    btnText.textContent = 'Enviar mensaje';
                    btnIcon.className = 'fas fa-paper-plane';
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Animación de aparición para las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-card');
    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    contactCards.forEach(function(card) {
        card.style.animationPlayState = 'paused';
        contactObserver.observe(card);
    });

    console.log('Funcionalidades iniciadas correctamente');
});