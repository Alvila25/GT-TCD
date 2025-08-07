document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Animated counters
  const counters = [
    { id: 'farmer-counter', end: 20000, suffix: '+' },
    { id: 'land-counter', end: 40, suffix: '%' },
    { id: 'district-counter', end: 10, suffix: '+' }
  ];

  counters.forEach(counter => {
    const element = document.getElementById(counter.id);
    let count = 0;
    const increment = counter.end / 100;
    const interval = setInterval(() => {
      count += increment;
      if (count >= counter.end) {
        count = counter.end;
        clearInterval(interval);
      }
      element.textContent = Math.round(count) + counter.suffix;
    }, 20);
  });

  // Language toggle (placeholder functionality)
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('change', (e) => {
    console.log(`Language changed to: ${e.target.value}`);
    // Implement language switch logic here
  });

  // Offline mode support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      console.log('Service Worker registered', reg);
    }).catch(err => {
      console.error('Service Worker registration failed', err);
    });
  }
});

// Placeholder for service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('scra-chad-cache').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/farmer-field.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
