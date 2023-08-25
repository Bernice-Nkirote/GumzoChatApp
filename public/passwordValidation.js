function validatePassword() {
  const passwordInput = document.getElementById('password');
  const password = passwordInput.value;

  // Check if the password is less than 6 characters
  if (password.length < 6) {
    const passwordError = document.getElementById('password-error');
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordInput.focus();
    return false; // Prevent form submission
  }

  // Check if the password contains special characters and capital letters
  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  const capitalLetters = /[A-Z]/;

  if (!specialCharacters.test(password) || !capitalLetters.test(password)) {
    const passwordError = document.getElementById('password-error');
    passwordError.textContent =
      'Password must contain special characters and capital letters.';
    passwordInput.focus();
    return false; // Prevent form submission
  }

  // If the password is valid, clear the error message
  const passwordError = document.getElementById('password-error');
  passwordError.textContent = '';

  return true; // Allow form submission
}
