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
