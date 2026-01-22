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
      if (e.target.closest('a')) return;

      const targetId = card.getAttribute('data-target');
      if (!targetId) return;

      const details = document.getElementById(targetId);
      if (!details) return;

      // Close all other open cert details ("accordion" behavior)
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

  // =========================
  // Projects filtering (projects.html)
  // Requires:
  //  - .filter-btn buttons with data-filter="all|exploring|in-progress|completed"
  //  - .project-card elements with data-status="exploring|in-progress|completed"
  //  - optional: #noProjects element (hidden by default)
  // =========================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-status]');
  const noProjects = document.getElementById('noProjects');

  if (filterButtons.length && projectCards.length) {
    function applyFilter(filterValue) {
      let visible = 0;

      projectCards.forEach(card => {
        const status = card.getAttribute('data-status');
        const show = (filterValue === 'all') || (status === filterValue);

        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (noProjects) {
        noProjects.hidden = visible !== 0;
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter') || 'all';
        applyFilter(filterValue);
      });
    });

    // default
    applyFilter('all');
  }
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
    const galleryTitle = gallery.getAttribute('data-title') || galleryId.toUpperCase();

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
        openModal(galleryTitle);
        render();
      });
    }

    gallery.querySelectorAll('.thumb').forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        currentImages = thumbs;
        currentIndex = idx;
        openModal(galleryTitle);
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
