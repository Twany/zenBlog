// Reading progress bar
const progressBar = document.querySelector<HTMLElement>('[data-reading-progress]');

function updateProgress() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// Table of Contents
const tocLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-toc-link]'));
const tocPanel = document.querySelector<HTMLElement>('[data-toc-panel]');
const tocToggle = document.querySelector<HTMLElement>('[data-toc-toggle]');
const tocIcon = document.querySelector<HTMLElement>('[data-toc-icon]');

function setActiveLink(id: string) {
  tocLinks.forEach((link) => {
    const isActive = link.dataset.tocLink === id;
    link.classList.toggle('text-brand-cyan', isActive);
    link.classList.toggle('font-bold', isActive);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: '-100px 0px -60% 0px' }
);

tocLinks.forEach((link) => {
  const id = link.dataset.tocLink;
  if (!id) return;
  const target = document.getElementById(id);
  if (target) observer.observe(target);
  link.addEventListener('click', () => {
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (tocPanel) {
      tocPanel.classList.add('hidden');
    }
  });
});

// Mobile TOC toggle
if (tocToggle && tocPanel && tocIcon) {
  tocToggle.addEventListener('click', () => {
    const isOpen = tocPanel.classList.toggle('hidden') === false;
    tocIcon.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>';
  });
}

// Initialize
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
