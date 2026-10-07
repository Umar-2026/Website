document.addEventListener('DOMContentLoaded', function () {
  const auth = window.DigitalSkillsAuth;
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    const rememberedEmail = auth.getRememberedEmail();
    const emailField = document.getElementById('email');
    const rememberField = document.getElementById('remember');

    if (rememberedEmail && emailField) {
      emailField.value = rememberedEmail;
      if (rememberField) rememberField.checked = true;
    }

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const remember = document.getElementById('remember');

      let isValid = true;

      if (!email.value.trim()) {
        auth.setFieldError('email', 'Email is required.');
        isValid = false;
      } else if (!auth.isValidEmail(email.value)) {
        auth.setFieldError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        auth.setFieldError('email', '');
      }

      if (!password.value.trim()) {
        auth.setFieldError('password', 'Password is required.');
        isValid = false;
      } else if (password.value.length < 8) {
        auth.setFieldError('password', 'Password must be at least 8 characters long.');
        isValid = false;
      } else {
        auth.setFieldError('password', '');
      }

      if (!isValid) {
        auth.setStatusMessage('loginStatus', 'Please fix the highlighted validation errors.', 'error');
        return;
      }

      if (remember && remember.checked) {
        auth.saveRememberedEmail(email.value);
      } else {
        auth.clearRememberedEmail();
      }

      auth.setStatusMessage(
        'loginStatus',
        'Demo mode: login form validated successfully. Connect a backend authentication service when ready.',
        'success'
      );

      loginForm.reset();
      if (remember) {
        remember.checked = true;
      }
      if (email) {
        email.value = rememberedEmail || '';
      }
    });
  }
});
