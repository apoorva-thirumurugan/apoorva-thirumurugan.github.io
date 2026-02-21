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

// ===== Community Diary Book =====
(function () {
  const diary = document.querySelector('[data-diary]');
  if (!diary) return;

  const entries = [
    {
      meta: 'Community & Service',
      title: 'Cyber Events Lead',
      org: 'Guelph Cybersecurity Society · University of Guelph',
      dates: 'Nov 2025 - Present',
      location: 'Guelph, Ontario',
      entryHeading: 'Bringing cyber to campus nights',
      subtitle: 'From CTF nights to intro workshops.',
      body: 'I organize and support events that make cybersecurity practical, approachable, and fun for students. From capture-the-flag evenings to beginner-friendly talks, each event focuses on hands-on learning and confidence building.',
      mediaLabel: 'Tap to open this chapter',
      image: 'assets/experience/guelph_cyber.jpeg',
      alt: 'Guelph Cybersecurity Society event'
    },
    {
      meta: 'Mentorship',
      title: 'Writing Peer Helper',
      org: 'Peer Helper Program · University of Guelph',
      dates: '2024 - Present',
      location: 'Guelph, Ontario',
      entryHeading: 'Helping ideas land clearly',
      subtitle: 'Technical writing with empathy.',
      body: 'As a writing peer helper, I support students in structuring arguments, improving clarity, and communicating technical ideas effectively. This role sharpened how I explain complex topics to different audiences.',
      mediaLabel: 'Open mentorship chapter',
      image: 'assets/experience/career_peer.jpeg',
      alt: 'Peer mentorship and writing support'
    },
    {
      meta: 'Leadership',
      title: 'Vice President Programming',
      org: 'Guelph Engineering Professional Development',
      dates: '2025 - Present',
      location: 'Guelph, Ontario',
      entryHeading: 'Building programs for growth',
      subtitle: 'Planning events with real student impact.',
      body: 'I coordinate professional development programming for engineering students by designing workshops, inviting speakers, and shaping sessions around practical career skills and confidence.',
      mediaLabel: 'Open leadership chapter',
      image: 'assets/experience/gepd_event.jpeg',
      alt: 'Engineering professional development event'
    },
    {
      meta: 'Outreach',
      title: 'Women in STEM Supporter',
      org: 'Community Mentorship & Outreach',
      dates: 'Ongoing',
      location: 'Ontario',
      entryHeading: 'Creating inclusive technical spaces',
      subtitle: 'Community-first engagement.',
      body: 'Through outreach and mentorship activities, I contribute to initiatives that encourage more women and underrepresented students to explore engineering and cybersecurity with support and belonging.',
      mediaLabel: 'Open outreach chapter',
      image: 'assets/experience/acting.jpeg',
      alt: 'Community outreach activity'
    }
  ];

  const prevBtn = diary.querySelector('[data-diary-prev]');
  const nextBtn = diary.querySelector('[data-diary-next]');
  const spread = diary.querySelector('.diary-main');
  const metaEl = diary.querySelector('[data-diary-meta]');
  const titleEl = diary.querySelector('[data-diary-title]');
  const orgEl = diary.querySelector('[data-diary-org]');
  const datesEl = diary.querySelector('[data-diary-dates]');
  const locationEl = diary.querySelector('[data-diary-location]');
  const headingEl = diary.querySelector('[data-diary-entry-heading]');
  const subtitleEl = diary.querySelector('[data-diary-entry-subtitle]');
  const bodyEl = diary.querySelector('[data-diary-entry-body]');
  const mediaLabelEl = diary.querySelector('[data-diary-media-label]');
  const dotsEl = diary.querySelector('[data-diary-dots]');
  const imageEl = diary.querySelector('[data-diary-image]');
  const videoEl = diary.querySelector('[data-diary-video]');

  if (!prevBtn || !nextBtn || !spread || !metaEl || !titleEl || !orgEl || !datesEl || !locationEl || !headingEl || !subtitleEl || !bodyEl || !mediaLabelEl || !dotsEl || !imageEl || !videoEl) {
    return;
  }

  let current = 0;
  let typeTimer = null;
  let flipTimer = null;
  let isFlipping = false;

  dotsEl.innerHTML = entries
    .map((_, index) => `<button class="diary-dot" type="button" aria-label="Go to entry ${index + 1}" data-diary-dot="${index}"></button>`)
    .join('');

  const dotButtons = Array.from(dotsEl.querySelectorAll('[data-diary-dot]'));

  function stopTyping() {
    if (typeTimer) {
      clearInterval(typeTimer);
      typeTimer = null;
    }
  }

  function typeText(text) {
    stopTyping();
    bodyEl.textContent = '';
    let position = 0;
    typeTimer = setInterval(() => {
      position += 2;
      bodyEl.textContent = text.slice(0, position);
      if (position >= text.length) {
        stopTyping();
      }
    }, 12);
  }

  function updateDots() {
    dotButtons.forEach((dot, index) => {
      const active = index === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function updateNavButtons() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === entries.length - 1;
  }

  function render(index, animateDirection) {
    const entry = entries[index];

    if (animateDirection) {
      isFlipping = true;
      spread.classList.remove('is-flipping-next', 'is-flipping-prev');
      spread.classList.add(animateDirection === 'next' ? 'is-flipping-next' : 'is-flipping-prev');
      if (flipTimer) clearTimeout(flipTimer);
      flipTimer = setTimeout(() => {
        spread.classList.remove('is-flipping-next', 'is-flipping-prev');
        isFlipping = false;
      }, 560);
    }

    metaEl.textContent = entry.meta;
    titleEl.textContent = entry.title;
    orgEl.textContent = entry.org;
    datesEl.textContent = entry.dates;
    locationEl.textContent = entry.location;
    headingEl.textContent = entry.entryHeading;
    subtitleEl.textContent = entry.subtitle;
    mediaLabelEl.innerHTML = `<i class="fa-solid fa-book-open"></i>${entry.mediaLabel}`;

    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.style.display = 'none';
    imageEl.style.display = 'block';
    imageEl.src = entry.image;
    imageEl.alt = entry.alt;

    updateDots();
    updateNavButtons();
    typeText(entry.body);
  }

  function goTo(index, direction) {
    if (isFlipping || index < 0 || index >= entries.length || index === current) return;
    current = index;
    render(current, direction);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1, 'prev'));
  nextBtn.addEventListener('click', () => goTo(current + 1, 'next'));

  dotButtons.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.getAttribute('data-diary-dot'));
      if (Number.isNaN(target)) return;
      goTo(target, target > current ? 'next' : 'prev');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goTo(current - 1, 'prev');
    if (event.key === 'ArrowRight') goTo(current + 1, 'next');
  });

  render(current);
})();
