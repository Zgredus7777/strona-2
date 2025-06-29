// Dane galerii zdjęć
const galleries = {
  'sektor13': ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'],
  'pamietnikApp': ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']
};

// Funkcja pokazująca galerię zdjęć
function showGallery(name) {
  const viewer = document.getElementById('gallery-viewer');
  const imagesDiv = document.getElementById('gallery-images');
  imagesDiv.innerHTML = '';

  galleries[name].forEach(img => {
    const imageElem = document.createElement('img');
    imageElem.src = `images/${name}/${img}`;
    imageElem.classList.add('gallery-image');
    imagesDiv.appendChild(imageElem);
  });

  document.getElementById('gallery').style.display = 'none';
  viewer.style.display = 'block';
}

// Obsługa zamykania galerii
function initCloseGallery() {
  const closeGallery = document.getElementById('close-gallery');
  if (closeGallery) {
    closeGallery.addEventListener('click', () => {
      document.getElementById('gallery-viewer').style.display = 'none';
      document.getElementById('gallery').style.display = 'flex';
      document.getElementById('gallery-images').innerHTML = '';
      initProjectGallery(); // re-bind clicks when gallery closes
    });
  }
}

function initProjectGallery() {
  document.querySelectorAll('.project-card').forEach(card => {
    const gallery = card.getAttribute('data-gallery');
    if (gallery) {
      card.onclick = () => showGallery(gallery);
    }
  });

  document.querySelectorAll('.show-gallery').forEach(button => {
    button.addEventListener('click', (e) => {
      const project = e.target.closest('.project');
      const galleryName = project.getAttribute('data-gallery');
      showGallery(galleryName);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Background image
  const body = document.querySelector('body');
  body.style.backgroundImage = "url('images/background.png')";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center center";

  // Toggle sidebar
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      body.classList.toggle('no-scroll');
    });
  }

  initProjectGallery();
  initCloseGallery();
});
