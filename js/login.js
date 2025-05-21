 document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Puedes cambiar estos valores por los que desees
    const validEmail = "usuario@ejemplo.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      // Redirige si las credenciales son correctas
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });