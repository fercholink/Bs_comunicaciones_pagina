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
        chatBubble.addEventListener('click', function() {
            chatWindow.classList.add('open');
        });

        if (closeChat) {
            closeChat.addEventListener('click', function() {
                chatWindow.classList.remove('open');
            });
        }

        // Enviar mensaje del chat
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessageToChat('user', message);
                chatInput.value = '';
                
                // Simular respuesta del bot
                setTimeout(function() {
                    addMessageToChat('bot', 'Gracias por tu mensaje. Un asesor te contactará pronto.');
                }, 1000);
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

    // Función para agregar mensajes al chat
    function addMessageToChat(sender, message) {
        if (chatBody) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

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

    console.log('Funcionalidades iniciadas correctamente');
});