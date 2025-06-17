document.addEventListener('DOMContentLoaded', function () {
  const letter = document.getElementById('letter');
  const button = document.getElementById('toggle-button');
  const envelope = document.querySelector('.envelope');
  const musicControl = document.getElementById('music-control');
  const snoopiesContainer = document.querySelector('.snoopies-container');
  const audio = document.getElementById('background-music');
  let isMusicPlaying = false;
  let isOpen = false;

  playMusicOnLoad();
  updateDateCounter();
  setupMusicControl();
  button.addEventListener('click', toggleLetter);

  function toggleLetter() {
    isOpen = !isOpen;
    isOpen ? openLetter() : closeLetter();
    letter.setAttribute('aria-hidden', !isOpen);
  }

  function openLetter() {
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.opacity = '0';
      letter.style.display = 'block';
      letter.classList.add('animate__animated', 'animate__zoomIn');
      button.textContent = 'Cerrar Carta 💌';
      button.setAttribute('aria-label', 'Cerrar la carta');
      createFloatingImages();
      createSparkles();
      setTimeout(typeWriterEffect, 1000);
      if (!isMusicPlaying) toggleMusic();
    }, 500);
  }

  function closeLetter() {
    letter.classList.remove('animate__zoomIn');
    letter.classList.add('animate__zoomOut');
    setTimeout(() => {
      letter.style.display = 'none';
      envelope.style.opacity = '1';
      envelope.classList.remove('open');
      button.textContent = 'Abrir Carta 💌';
      button.setAttribute('aria-label', 'Abrir la carta');
      snoopiesContainer.innerHTML = '';
      document.querySelectorAll('.sparkle').forEach(el => el.remove());
      letter.classList.remove('animate__zoomOut');
    }, 500);
  }

function createFloatingImages() {
  const images = [
    {
      src: 'https://cdn.inspireuplift.com/uploads/images/seller_products/29661/1706942570_2712231057-cute-snoopy-valentine-heart-svg-2712231057png.png',
      alt: 'Snoopy decorativo',
      fallback: 'fallback-heart.png'
    },
    {
      src: 'https://static.vecteezy.com/system/resources/previews/021/445/463/large_2x/aesthetic-rose-line-art-collection-free-png.png',
      alt: 'Rosa decorativa 1',
      fallback: 'fallback-rose.png'
    },
    {
      src: 'https://static.vecteezy.com/system/resources/previews/021/445/450/large_2x/aesthetic-rose-line-art-collection-free-png.png',
      alt: 'Rosa decorativa 2',
      fallback: 'fallback-rose.png'
    }
  ];

  const config = {
    maxImages: 100, 
    imagesPerType: 10,
    spawnDelay: 200,
    fadeInDuration: 100,
    minAnimationDuration: 2,
    maxAnimationDuration: 6,
    baseZIndex: 1,
    opacity: 0.7
  };

  function preloadImages() {
    images.forEach(imgData => {
      const img = new Image();
      img.src = imgData.src;
    });
  }

  function createImage(src, alt, fallback) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'floating-img';
    
    Object.assign(img.style, {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      position: 'fixed',
      opacity: '0',
      transform: 'scale(0)',
      animation: `float ${Math.random() * (config.maxAnimationDuration - config.minAnimationDuration) + config.minAnimationDuration}s ease-in-out infinite`,
      zIndex: config.baseZIndex.toString(),
      pointerEvents: 'none',
      userSelect: 'none'
    });
    
    img.onerror = () => { 
      img.src = fallback; 
      console.warn(`Fallback image used for ${alt}`);
    };
    
    return img;
  }

  preloadImages();
  
  let imageCount = 0;
  const container = document.getElementById('snoopiesContainer') || document.body;

  images.forEach(({ src, alt, fallback }) => {
    for (let i = 0; i < config.imagesPerType && imageCount < config.maxImages; i++) {
      setTimeout(() => {
        if (imageCount >= config.maxImages) return;
        
        const img = createImage(src, alt, fallback);
        container.appendChild(img);
        
        requestAnimationFrame(() => {
          img.style.transition = `opacity ${config.fadeInDuration}ms ease, transform ${config.fadeInDuration}ms ease`;
          img.style.opacity = config.opacity.toString();
          img.style.transform = 'scale(1)';
        });
        
        imageCount++;
      }, i * config.spawnDelay);
    }
  });
}

function addFloatingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
    }
    
    .floating-img {
      max-width: 500px;
      height: auto;
      transition: opacity 0.1s ease, transform 0.1s ease;
      will-change: transform, opacity; /* Optimización para el navegador */
    }
  `;
  document.head.appendChild(style);
}

addFloatingStyles();
document.addEventListener('DOMContentLoaded', createFloatingImages);

  function createSparkles() {
    const maxSparkles = 100; 
    for (let i = 0; i < maxSparkles; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.position = 'fixed';
      sparkle.style.width = '10px';
      sparkle.style.height = '10px';
      sparkle.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8), transparent)';
      sparkle.style.borderRadius = '50%';
      sparkle.style.animation = `sparkle ${Math.random() * 2 + 0.5}s ease-in-out infinite`;
      sparkle.style.zIndex = '2';
      document.body.appendChild(sparkle);
      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    }
  }

  function typeWriterEffect() {
    const textElements = document.querySelectorAll('.courier-text p');
    if (textElements.length === 0) return;
    let current = 0;
    textElements.forEach(el => el.style.visibility = 'hidden');

    function typeNext() {
      if (current >= textElements.length) return;
      const el = textElements[current];
      const original = el.textContent;
      el.textContent = '';
      el.style.visibility = 'visible';
      let i = 0;
      const typing = setInterval(() => {
        if (i < original.length) {
          el.textContent += original.charAt(i++);
          if (el.getBoundingClientRect().bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          clearInterval(typing);
          current++;
          setTimeout(typeNext, 500);
        }
      }, 20);
    }
    typeNext();
  }

  function updateDateCounter() {
    const startDate = new Date('2024-08-05');
    const today = new Date();
    if (isNaN(startDate.getTime()) || startDate > today) {
      document.querySelector('#date-counter-text').textContent = 'Fecha inválida';
      return;
    }
    const diffDays = Math.ceil(Math.abs(today - startDate) / (1000 * 60 * 60 * 24));
    document.querySelector('#date-counter-text').textContent = 
      `Juntos desde: ${startDate.toLocaleDateString('es-MX')} (${diffDays} días)`;
  }

  function setupMusicControl() {
    musicControl.addEventListener('click', toggleMusic);
  }

  function toggleMusic() {
    isMusicPlaying = !isMusicPlaying;
    musicControl.innerHTML = isMusicPlaying ? '<i class="fas fa-pause" aria-hidden="true"></i>' : '<i class="fas fa-music" aria-hidden="true"></i>';
    musicControl.setAttribute('aria-label', isMusicPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo');
    if (isMusicPlaying) {
      audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
        isMusicPlaying = false;
        musicControl.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i>';
        musicControl.setAttribute('aria-label', 'Reproducir música de fondo');
      });
    } else {
      audio.pause();
    }
  }

  function playMusicOnLoad() {
    isMusicPlaying = true;
    musicControl.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i>';
    musicControl.setAttribute('aria-label', 'Pausar música de fondo');
    audio.play().catch(error => {
      console.error('Autoplay bloqueado:', error);
      isMusicPlaying = false;
      musicControl.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i>';
      musicControl.setAttribute('aria-label', 'Reproducir música de fondo');
      document.addEventListener('click', function autoPlay() {
        if (!isMusicPlaying) toggleMusic();
        document.removeEventListener('click', autoPlay);
      }, { once: true });
    });
  }
});