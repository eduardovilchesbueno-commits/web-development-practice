var usuariosAutorizados = [
    { nombre: 'Edu', email: 'eduardo.vilches.bueno@gmail.com', pass: btoa('Overlord1944') }
];

var loginScreen = document.getElementById('login-screen');
var appContent = document.getElementById('app-content');
var loginError = document.getElementById('loginError');
var userBadge = document.getElementById('userBadge');

var sesion = sessionStorage.getItem('biblioSesion');
if (sesion) {
    var datos = JSON.parse(sesion);
    userBadge.textContent = datos.nombre;
    loginScreen.style.display = 'none';
    appContent.style.display = 'block';
}

function iniciarSesion() {
    var email = document.getElementById('loginEmail').value.trim();
    var pass = document.getElementById('loginPass').value;
    var encontrado = false;

    for (var i = 0; i < usuariosAutorizados.length; i++) {
        if (usuariosAutorizados[i].email === email && usuariosAutorizados[i].pass === btoa(pass)) {
            encontrado = true;
            userBadge.textContent = usuariosAutorizados[i].nombre;
            sessionStorage.setItem('biblioSesion', JSON.stringify({ nombre: usuariosAutorizados[i].nombre, email: email }));
            loginScreen.style.display = 'none';
            appContent.style.display = 'block';
            loginError.style.display = 'none';
            break;
        }
    }

    if (!encontrado) {
        loginError.textContent = 'Email o contraseña incorrectos';
        loginError.style.display = 'block';
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('biblioSesion');
    appContent.style.display = 'none';
    loginScreen.style.display = 'block';
    document.getElementById('loginPass').value = '';
    loginError.style.display = 'none';
}

document.getElementById('loginPass').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') iniciarSesion();
});
