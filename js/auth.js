(function () {
  const REMEMBERED_EMAIL_KEY = 'digitalSkillsRememberedEmail';

  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Storage unavailable in this browser context.', error);
    }
  }

  function safeRemoveStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Storage unavailable in this browser context.', error);
    }
  }

  function safeGetStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Storage unavailable in this browser context.', error);
      return null;
    }
  }

  function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');

    if (field) {
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    if (error) {
      error.textContent = message || '';
    }
  }

  function setStatusMessage(elementId, message, type) {
    const status = document.getElementById(elementId);
    if (!status) return;
    status.textContent = message;
    status.classList.remove('success', 'error');
    if (type) {
      status.classList.add(type);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function getRememberedEmail() {
    return safeGetStorage(REMEMBERED_EMAIL_KEY) || '';
  }

  function saveRememberedEmail(email) {
    safeSetStorage(REMEMBERED_EMAIL_KEY, email.trim());
  }

  function clearRememberedEmail() {
    safeRemoveStorage(REMEMBERED_EMAIL_KEY);
  }

  window.DigitalSkillsAuth = {
    isValidEmail,
    setFieldError,
    setStatusMessage,
    getRememberedEmail,
    saveRememberedEmail,
    clearRememberedEmail
  };
})();
