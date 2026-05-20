var libros = [];
var usuarios = [];
var MAX_LIBROS = 100;
var MAX_USUARIOS = 50;
var MAX_PRESTAMOS = 3;

function msg(t, tipo) {
    var m = document.getElementById('mensaje');
    m.textContent = t;
    m.className = 'msg ' + tipo;
    setTimeout(function(){ m.className = 'msg'; }, 3000);
}

function buscarLibro(c) {
    for (var i = 0; i < libros.length; i++) { if (libros[i].codigo === c) return i; }
    return -1;
}
function buscarUsuario(id) {
    for (var i = 0; i < usuarios.length; i++) { if (usuarios[i].id === id) return i; }
    return -1;
}

function actualizarTablas() {
    var hl = '', hu = '';
    for (var i = 0; i < libros.length; i++) {
        var l = libros[i];
        var est = l.estado === 'disponible' ? '<span class="badge badge-ok">Disponible</span>' : '<span class="badge badge-no">Prestado</span>';
        hl += '<tr><td>' + l.codigo + '</td><td>' + l.titulo + '</td><td>' + l.autor + '</td><td>' + est + '</td></tr>';
    }
    document.getElementById('tablaLibros').innerHTML = hl || '<tr><td colspan="4" class="empty-state">No hay libros registrados</td></tr>';

    for (var j = 0; j < usuarios.length; j++) {
        var u = usuarios[j];
        hu += '<tr><td>' + u.id + '</td><td>' + u.nombre + '</td><td>' + (u.prestados.length > 0 ? u.prestados.join(', ') : '<span style="color:#999;">—</span>') + '</td></tr>';
    }
    document.getElementById('tablaUsuarios').innerHTML = hu || '<tr><td colspan="3" class="empty-state">No hay usuarios registrados</td></tr>';
}

function registrarLibro() {
    var c = document.getElementById('libCodigo').value.trim();
    var t = document.getElementById('libTitulo').value.trim();
    var a = document.getElementById('libAutor').value.trim();
    if (!c || !t || !a) return msg('Todos los campos son obligatorios', 'err');
    if (libros.length >= MAX_LIBROS) return msg('Límite de ' + MAX_LIBROS + ' libros alcanzado', 'err');
    if (buscarLibro(c) !== -1) return msg('El código "' + c + '" ya existe', 'err');
    libros.push({ codigo: c, titulo: t, autor: a, estado: 'disponible' });
    document.getElementById('libCodigo').value = '';
    document.getElementById('libTitulo').value = '';
    document.getElementById('libAutor').value = '';
    msg('Libro "' + t + '" registrado correctamente', 'ok');
    actualizarTablas();
}

function registrarUsuario() {
    var id = document.getElementById('usrId').value.trim();
    var n = document.getElementById('usrNombre').value.trim();
    if (!id || !n) return msg('Todos los campos son obligatorios', 'err');
    if (usuarios.length >= MAX_USUARIOS) return msg('Límite de ' + MAX_USUARIOS + ' usuarios alcanzado', 'err');
    if (buscarUsuario(id) !== -1) return msg('El ID "' + id + '" ya existe', 'err');
    usuarios.push({ id: id, nombre: n, prestados: [] });
    document.getElementById('usrId').value = '';
    document.getElementById('usrNombre').value = '';
    msg('Usuario "' + n + '" registrado correctamente', 'ok');
    actualizarTablas();
}

function realizarPrestamo() {
    var idU = document.getElementById('prestUsr').value.trim();
    var cL = document.getElementById('prestLib').value.trim();
    if (!idU || !cL) return msg('Todos los campos son obligatorios', 'err');
    var iu = buscarUsuario(idU);
    if (iu === -1) return msg('Usuario no encontrado', 'err');
    var il = buscarLibro(cL);
    if (il === -1) return msg('Libro no encontrado', 'err');
    if (libros[il].estado === 'prestado') return msg('El libro ya está prestado', 'err');
    if (usuarios[iu].prestados.length >= MAX_PRESTAMOS) return msg('El usuario ya tiene ' + MAX_PRESTAMOS + ' libros (máximo)', 'err');
    libros[il].estado = 'prestado';
    usuarios[iu].prestados.push(cL);
    document.getElementById('prestUsr').value = '';
    document.getElementById('prestLib').value = '';
    msg('Préstamo realizado: "' + libros[il].titulo + '" a ' + usuarios[iu].nombre, 'ok');
    actualizarTablas();
}

function realizarDevolucion() {
    var idU = document.getElementById('devUsr').value.trim();
    var cL = document.getElementById('devLib').value.trim();
    if (!idU || !cL) return msg('Todos los campos son obligatorios', 'err');
    var iu = buscarUsuario(idU);
    if (iu === -1) return msg('Usuario no encontrado', 'err');
    var il = buscarLibro(cL);
    if (il === -1) return msg('Libro no encontrado', 'err');
    if (libros[il].estado !== 'prestado') return msg('El libro no está prestado', 'err');
    var pos = -1;
    for (var i = 0; i < usuarios[iu].prestados.length; i++) {
        if (usuarios[iu].prestados[i] === cL) { pos = i; break; }
    }
    if (pos === -1) return msg('Este usuario no tiene prestado ese libro', 'err');
    libros[il].estado = 'disponible';
    var nuevos = [];
    for (var j = 0; j < usuarios[iu].prestados.length; j++) {
        if (j !== pos) nuevos.push(usuarios[iu].prestados[j]);
    }
    usuarios[iu].prestados = nuevos;
    document.getElementById('devUsr').value = '';
    document.getElementById('devLib').value = '';
    msg('Devolución realizada: "' + libros[il].titulo + '"', 'ok');
    actualizarTablas();
}

function mostrarReporte(tipo) {
    var d = document.getElementById('contenidoReporte');
    var html = '';
    if (tipo === 'disponibles') {
        html = '<h3>Libros disponibles</h3><div class="report-list">';
        var hay = false;
        for (var i = 0; i < libros.length; i++) {
            if (libros[i].estado === 'disponible') {
                html += '<div class="report-item"><strong>' + libros[i].codigo + '</strong> — ' + libros[i].titulo + ' <span style="color:var(--text-light)">(' + libros[i].autor + ')</span></div>';
                hay = true;
            }
        }
        html += '</div>';
        if (!hay) html = '<p class="empty-state">No hay libros disponibles</p>';
    } else if (tipo === 'prestados') {
        html = '<h3>Libros prestados</h3><div class="report-list">';
        var hay = false;
        for (var i = 0; i < libros.length; i++) {
            if (libros[i].estado === 'prestado') {
                html += '<div class="report-item"><strong>' + libros[i].codigo + '</strong> — ' + libros[i].titulo + ' <span style="color:var(--text-light)">(' + libros[i].autor + ')</span></div>';
                hay = true;
            }
        }
        html += '</div>';
        if (!hay) html = '<p class="empty-state">No hay libros prestados</p>';
    } else if (tipo === 'usuarios') {
        html = '<h3>Usuarios con préstamos activos</h3><div class="report-list">';
        var hay = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].prestados.length > 0) {
                html += '<div class="report-item"><strong>' + usuarios[i].id + '</strong> — ' + usuarios[i].nombre + ': ' + usuarios[i].prestados.join(', ') + '</div>';
                hay = true;
            }
        }
        html += '</div>';
        if (!hay) html = '<p class="empty-state">Ningún usuario tiene préstamos activos</p>';
    }
    d.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.tabs button');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove('active');
            this.classList.add('active');
            var paneles = document.querySelectorAll('.tab-panel');
            for (var k = 0; k < paneles.length; k++) paneles[k].classList.remove('active');
            document.getElementById('tab-' + this.getAttribute('data-tab')).classList.add('active');
        });
    }
    actualizarTablas();

    var barFill = document.getElementById('scrollBarFill');
    if (barFill) {
        function upd() {
            var st = window.scrollY;
            var dh = document.documentElement.scrollHeight - window.innerHeight;
            barFill.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
        }
        window.addEventListener('scroll', upd);
        upd();
    }
});
