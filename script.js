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
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
  } else {
    body.classList.remove('light-theme');
    themeIcon.textContent = '☀️';
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
    if (lightbox.style.display === 'block' && e.target === lightbox) {
      closeLightbox();
    }
  });
});
// Chat widget
document.addEventListener('DOMContentLoaded', () => {
  const chatWidget = document.getElementById('chat-widget');
  const minimizeBtn = document.getElementById('minimize-chat');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-message');
  
  // Minimalizacja czatu
  minimizeBtn.addEventListener('click', () => {
    chatWidget.classList.toggle('minimized');
  });
  
  // Wysyłanie wiadomości
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Dodanie wiadomości użytkownika
      addMessage(message, 'user');
      chatInput.value = '';
      
      // Symulacja odpowiedzi admina (w rzeczywistości połącz z backendem)
      setTimeout(() => {
        addMessage('Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.', 'admin');
      }, 1000);
    }
  }
  
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Przeciąganie czatu
  let isDragging = false;
  let offsetX, offsetY;
  
  document.getElementById('chat-header').addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatWidget.getBoundingClientRect().left;
    offsetY = e.clientY - chatWidget.getBoundingClientRect().top;
    chatWidget.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      chatWidget.style.left = `${e.clientX - offsetX}px`;
      chatWidget.style.top = `${e.clientY - offsetY}px`;
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    chatWidget.style.cursor = 'default';
  });
});