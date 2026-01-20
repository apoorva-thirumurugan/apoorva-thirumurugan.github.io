// Optional interactive touch
console.log(
  "%cWelcome to Apoorva's Portfolio 🌙",
  "color:#9b6b43; font-size:14px; font-family:Fira Code;"
);

document.addEventListener('DOMContentLoaded', function () {
  // =========================
  // Tab functionality
  // =========================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding content
      const targetContent = document.getElementById(`${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // =========================
  // Certification expand/collapse
  // (requires: .cert-toggle + data-target + .cert-details)
  // =========================
  const certCards = document.querySelectorAll('.cert-toggle');

  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If you ever add links inside the card, this prevents clicking a link from toggling
      // (optional safety)
      if (e.target.closest('a')) return;

      const targetId = card.getAttribute('data-target');
      if (!targetId) return;

      const details = document.getElementById(targetId);
      if (!details) return;

      // Close all other open cert details (optional: "accordion" behavior)
      document.querySelectorAll('.cert-details.open').forEach(openEl => {
        if (openEl !== details) openEl.classList.remove('open');
      });

      // Toggle this one
      details.classList.toggle('open');
    });
  });

  // =========================
  // Smooth scroll for anchor links
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ===== Experience Gallery Modal =====
(function () {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalCounter = document.getElementById('modalCounter');
  const modalGalleryName = document.getElementById('modalGalleryName');

  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const prevBtn = modal.querySelector('.nav-btn.prev');
  const nextBtn = modal.querySelector('.nav-btn.next');

  let currentImages = [];
  let currentIndex = 0;

  function openModal(galleryName) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalGalleryName.textContent = galleryName || 'Highlights';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentImages = [];
    currentIndex = 0;
    modalImage.src = '';
    modalCaption.textContent = '';
  }

  function render() {
    if (!currentImages.length) return;
    const img = currentImages[currentIndex];
    modalImage.src = img.src;
    modalImage.alt = img.alt || 'Gallery image';
    modalCaption.textContent = img.caption || '';
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  function go(delta) {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + delta + currentImages.length) % currentImages.length;
    render();
  }

  // Click thumbnail to open
  document.querySelectorAll('.exp-gallery').forEach(gallery => {
    const galleryId = gallery.getAttribute('data-gallery') || 'Highlights';

    const thumbs = Array.from(gallery.querySelectorAll('.thumb')).map(t => ({
      src: t.getAttribute('src'),
      alt: t.getAttribute('alt'),
      caption: t.getAttribute('data-caption') || ''
    }));

    // camera button opens first image
    const cameraBtn = gallery.querySelector('.camera-btn');
    if (cameraBtn) {
      cameraBtn.addEventListener('click', () => {
        currentImages = thumbs;
        currentIndex = 0;
        openModal(galleryId.toUpperCase());
        render();
      });
    }

    gallery.querySelectorAll('.thumb').forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        currentImages = thumbs;
        currentIndex = idx;
        openModal(galleryId.toUpperCase());
        render();
      });
    });
  });

  // Controls
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
})();
