// Script para menú móvil y botón volver arriba
document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const body = document.body; // Referencia al body

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      // Esta línea es la clave: añade o quita la clase 'menu-open' del navbar.
      navbar.classList.toggle('menu-open');
      
      // Añadir o quitar la clase para bloquear el scroll
      if (navbar.classList.contains('menu-open')) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    });
  }

  // --- Lógica para cerrar el menú al hacer clic en un enlace ---
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('menu-open')) {
        navbar.classList.remove('menu-open');
        body.classList.remove('no-scroll'); // Asegurarse de quitar la clase aquí también
      }
    });
  });

  // --- LÓGICA DEL CHATBOT ---
  const chatBubble = document.getElementById('chat-bubble');
  const chatWindow = document.getElementById('chat-window');
  const closeChatBtn = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const sendChatBtn = document.getElementById('send-chat-btn');
  const chatBody = document.getElementById('chat-body');
  
  // IMPORTANTE: URL de tu webhook de n8n
  const N8N_WEBHOOK_URL = 'https://n8n.srv966239.hstgr.cloud/webhook-test/chatbot_bs'; // Asegúrate de que esta URL es correcta  

  if (chatBubble) {
    chatBubble.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
    });
  }

  if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  const sendMessage = async () => {
    const message = chatInput.value.trim();
    // CORRECCIÓN: Se eliminó la comprobación de la URL que bloqueaba el envío.
    if (message === '') return;

    addMessageToChat('user', message);
    chatInput.value = '';
    
    const loadingIndicator = addMessageToChat('loading', '<span></span><span></span><span></span>');

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status}`);

      const data = await response.json();
      
      // --- DIAGNÓSTICO: Ver la respuesta exacta de n8n ---
      console.log('Respuesta recibida de n8n:', data);
      
      loadingIndicator.remove();
      addMessageToChat('bot', data.reply);

    } catch (error) {
      console.error('Error al conectar con el chatbot:', error);
      loadingIndicator.remove();
      addMessageToChat('bot', 'Lo siento, no pude conectarme. Por favor, intenta más tarde.');
    }
  };

  if (sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function addMessageToChat(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    const p = document.createElement('p');
    p.innerHTML = content;
    messageDiv.appendChild(p);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return messageDiv;
  }
});