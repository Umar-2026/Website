document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const allRevealItems = document.querySelectorAll('.reveal, .service-card, .skill-card, .project-card, .pricing-card');

  if ('IntersectionObserver' in window && allRevealItems.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    allRevealItems.forEach(function (item) {
      item.classList.add('reveal');
      observer.observe(item);
    });
  } else {
    allRevealItems.forEach(function (item) {
      item.classList.add('visible');
    });
  }

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const auth = window.DigitalSkillsAuth;
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const subject = document.getElementById('contactSubject');
      const message = document.getElementById('contactMessage');

      let isValid = true;

      if (!name.value.trim()) {
        auth.setFieldError('contactName', 'Please enter your name.');
        isValid = false;
      } else {
        auth.setFieldError('contactName', '');
      }

      if (!email.value.trim()) {
        auth.setFieldError('contactEmail', 'Please enter your email.');
        isValid = false;
      } else if (!auth.isValidEmail(email.value)) {
        auth.setFieldError('contactEmail', 'Please enter a valid email address.');
        isValid = false;
      } else {
        auth.setFieldError('contactEmail', '');
      }

      if (!subject.value.trim()) {
        auth.setFieldError('contactSubject', 'Please enter a subject.');
        isValid = false;
      } else {
        auth.setFieldError('contactSubject', '');
      }

      if (!message.value.trim()) {
        auth.setFieldError('contactMessage', 'Please enter a message.');
        isValid = false;
      } else {
        auth.setFieldError('contactMessage', '');
      }

      if (!isValid) {
        auth.setStatusMessage('contactStatus', 'Please correct the highlighted fields.', 'error');
        return;
      }

      auth.setStatusMessage('contactStatus', 'Form validated successfully. Backend email service can be connected later.', 'success');
      contactForm.reset();
    });
  }
});
