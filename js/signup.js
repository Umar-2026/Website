document.addEventListener('DOMContentLoaded', function () {
  const auth = window.DigitalSkillsAuth;
  const signupForm = document.getElementById('signupForm');

  if (!signupForm) return;

  const rememberedEmail = auth.getRememberedEmail();
  const signupEmail = document.getElementById('signupEmail');
  if (rememberedEmail && signupEmail) {
    signupEmail.value = rememberedEmail;
  }

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    let isValid = true;

    if (!fullName.value.trim()) {
      auth.setFieldError('fullName', 'Full name is required.');
      isValid = false;
    } else {
      auth.setFieldError('fullName', '');
    }

    if (!email.value.trim()) {
      auth.setFieldError('signupEmail', 'Email is required.');
      isValid = false;
    } else if (!auth.isValidEmail(email.value)) {
      auth.setFieldError('signupEmail', 'Please enter a valid email address.');
      isValid = false;
    } else {
      auth.setFieldError('signupEmail', '');
    }

    if (!password.value.trim()) {
      auth.setFieldError('signupPassword', 'Password is required.');
      isValid = false;
    } else if (password.value.length < 8) {
      auth.setFieldError('signupPassword', 'Password must be at least 8 characters long.');
      isValid = false;
    } else {
      auth.setFieldError('signupPassword', '');
    }

    if (!confirmPassword.value.trim()) {
      auth.setFieldError('confirmPassword', 'Please confirm your password.');
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      auth.setFieldError('confirmPassword', 'Passwords do not match.');
      isValid = false;
    } else {
      auth.setFieldError('confirmPassword', '');
    }

    if (!terms.checked) {
      document.getElementById('termsError').textContent = 'You must accept the terms and conditions.';
      isValid = false;
    } else {
      document.getElementById('termsError').textContent = '';
    }

    if (!isValid) {
      auth.setStatusMessage('signupStatus', 'Please fix the highlighted validation errors.', 'error');
      return;
    }

    auth.saveRememberedEmail(email.value);
    auth.setStatusMessage(
      'signupStatus',
      'Demo prototype: account form validated successfully. Connect a real backend service to store users.',
      'success'
    );
    signupForm.reset();
  });
});
