// Toggle menu on mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'block' || sidebar.style.display === '') {
    sidebar.style.display = 'none';
  } else {
    sidebar.style.display = 'block';
  }

});

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

// Obsługa kliknięcia przycisków galerii
document.querySelectorAll('.show-gallery').forEach(button => {
  button.addEventListener('click', (e) => {
    const project = e.target.closest('.project');
    const galleryName = project.getAttribute('data-gallery');
    showGallery(galleryName);
  });
});

// Obsługa zamykania galerii
document.getElementById('close-gallery').addEventListener('click', () => {
  document.getElementById('gallery-viewer').style.display = 'none';
  document.getElementById('gallery').style.display = 'flex';
  document.getElementById('gallery-images').innerHTML = '';
  initProjectGallery(); // re-bind clicks when gallery closes
});

function initProjectGallery() {
  document.querySelectorAll('.project-card').forEach(card => {
    const gallery = card.getAttribute('data-gallery');
    if (gallery) {
      card.onclick = () => showGallery(gallery);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectGallery();
});
