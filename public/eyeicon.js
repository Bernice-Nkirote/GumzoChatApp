let eyeicon = document.getElementById('eyeicon');
let password = document.getElementById('password');

eyeicon.onclick = function () {
  if (password.type == 'password') {
    password.type = 'text';
    eyeicon.innerHTML = '<i class="fas fa-eye"></i>';
  } else {
    password.type = 'password';
    eyeicon.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
};
