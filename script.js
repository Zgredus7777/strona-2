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
});

// Page navigation
const links = document.querySelectorAll('.sidebar a');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-target');

    pages.forEach(page => {
      // Start fade out
      page.style.opacity = 0;
      // Delay to allow fade out before switching active page
      setTimeout(() => {
        page.classList.remove('active');
        if (page.id === target) {
          page.classList.add('active');
          // Fade in active page
          setTimeout(() => {
            page.style.opacity = 1;
          }, 50);
        }
      }, 200);
    });

    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Hide sidebar on mobile after clicking
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').style.display = 'none';
    }
  });
});
