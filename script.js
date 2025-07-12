// Dane galerii zdjęć
const galleries = {
  'sektor13': ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'],
  'pamietnikApp': ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']
};

// Funkcja pokazująca galerię zdjęć w lightbox
function showGallery(name) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  // Clear previous images
  lightboxImg.innerHTML = '';
  
  // Create image carousel
  galleries[name].forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = `images/${name}/${img}`;
    imgElement.alt = `Project screenshot ${index + 1}`;
    imgElement.classList.add('lightbox-content');
    imgElement.style.display = index === 0 ? 'block' : 'none';
    lightboxImg.appendChild(imgElement);
  });
  
  // Show lightbox
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Zamknij lightbox
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Przełączanie trybu ciemnego/jasnego
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');
  
  const themeIcon = document.getElementById('theme-icon');
  if (body.classList.contains('light-theme')) {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Walidacja formularza kontaktowego
function validateForm() {
  const form = document.getElementById('contact-form');
  const email = document.getElementById('email').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('Proszę podać poprawny adres email');
    return false;
  }
  
  // Symulacja wysłania formularza
  setTimeout(() => {
    form.reset();
    alert('Wiadomość została wysłana! Dziękujemy za kontakt.');
  }, 500);
  
  return false;
}

// Chat Widget
function setupChatWidget() {
  const chatWidget = document.getElementById('chat-widget');
  const minimizeBtn = document.getElementById('minimize-chat');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const userEmail = document.getElementById('user-email');
  const sendBtn = document.getElementById('send-message');
  const chatHeader = document.getElementById('chat-header');

  if (!chatWidget) return;

  // Minimalizacja czatu
  minimizeBtn?.addEventListener('click', () => {
    chatWidget.classList.toggle('minimized');
    minimizeBtn.innerHTML = chatWidget.classList.contains('minimized') ? '+' : '_';
  });

  // Wysyłanie wiadomości
  sendBtn?.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    if (sendBtn.disabled) return;
    
    const email = userEmail?.value.trim();
    const message = chatInput?.value.trim();
    
    if (!validateEmail(email)) {
      addMessage('Proszę podać poprawny adres email', 'admin');
      return;
    }
    
    if (!message) {
      addMessage('Proszę wpisać wiadomość', 'admin');
      return;
    }
    
    // Sprawdź recaptcha
    const recaptcha = grecaptcha?.getResponse();
    if (!recaptcha) {
      addMessage('Proszę potwierdzić, że nie jesteś robotem', 'admin');
      return;
    }
    
    // Dodaj wiadomość użytkownika
    addMessage(message, 'user');
    sendBtn.disabled = true;
    
    // Wyślij wiadomość
    fetch('send-message.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email, 
        message: message,
        recaptcha: recaptcha
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        addMessage('✔️ Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe.', 'admin');
      } else {
        addMessage(`❌ ${data.error || 'Błąd wysyłania'}`, 'admin');
      }
    })
    .catch(error => {
      addMessage('❌ Błąd połączenia. Spróbuj ponownie później.', 'admin');
      console.error('Fetch error:', error);
    })
    .finally(() => {
      if (grecaptcha) grecaptcha.reset();
      chatInput.value = '';
      sendBtn.disabled = false;
    });
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Przeciąganie czatu
  let isDragging = false;
  let offsetX, offsetY;
  
  chatHeader?.addEventListener('mousedown', (e) => {
    if (e.target !== minimizeBtn) {
      isDragging = true;
      offsetX = e.clientX - chatWidget.getBoundingClientRect().left;
      offsetY = e.clientY - chatWidget.getBoundingClientRect().top;
      chatWidget.style.cursor = 'grabbing';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      const maxX = window.innerWidth - chatWidget.offsetWidth;
      const maxY = window.innerHeight - chatWidget.offsetHeight;
      
      chatWidget.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
      chatWidget.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    chatWidget.style.cursor = 'default';
  });
}

// Cookie Consent
function setupCookieConsent() {
  const cookieBanner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  if (!cookieBanner) return;

  if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
      cookieBanner.style.display = 'block';
    }, 2000);
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookieBanner.style.display = 'none';
    loadCookies();
  });

  rejectBtn?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'false');
    cookieBanner.style.display = 'none';
  });

  function loadCookies() {
    // Tutaj dodaj kod do ładowania usług, które wymagają cookies
    console.log('Cookies zaakceptowane - ładowanie usług');
  }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  // Toggle sidebar
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
    });
  }
  
  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar?.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !menuToggle?.contains(e.target)) {
      sidebar.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    if (themeIcon) themeIcon.textContent = '🌙';
  } else {
    body.classList.remove('light-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
  }
  
  // Setup theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Setup contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      validateForm();
    });
  }
  
  // Setup lightbox close button
  const closeBtn = document.querySelector('.close-lightbox');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  // Close lightbox when clicking outside content
  document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox?.style.display === 'block' && e.target === lightbox) {
      closeLightbox();
    }
  });

  // Inicjalizacja widgetów
  setupChatWidget();
  setupCookieConsent();
});