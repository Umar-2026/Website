document.addEventListener('DOMContentLoaded', function () {
  const auth = window.DigitalSkillsAuth;
  const form = document.getElementById('forgotPasswordForm');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailField = document.getElementById('resetEmail');

    if (!emailField.value.trim()) {
      auth.setFieldError('resetEmail', 'Email is required.');
      auth.setStatusMessage('resetStatus', 'Please enter your email address.', 'error');
      return;
    }

    if (!auth.isValidEmail(emailField.value)) {
      auth.setFieldError('resetEmail', 'Please enter a valid email address.');
      auth.setStatusMessage('resetStatus', 'Please use a valid email format.', 'error');
      return;
    }

    auth.setFieldError('resetEmail', '');
    auth.setStatusMessage(
      'resetStatus',
      'Email validated. A password-reset backend service can be connected here.',
      'success'
    );
    form.reset();
  });
});
