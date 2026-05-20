document.addEventListener('DOMContentLoaded', function () {

  var headerEl = document.getElementById('header');
  if (headerEl) {
    headerEl.outerHTML =
      '<header class="header">' +
        '<div class="scroll-bar"><div class="scroll-bar-fill" id="scrollBarFill"></div></div>' +
        '<div class="container header-content">' +
          '<div class="logo">' +
            '<img src="img/logo.png" alt="Limpiezas EduAL">' +
          '</div>' +
          '<nav class="nav">' +
            '<ul>' +
              '<li><a href="index.html"' + (PAGE === 'index' ? ' class="active"' : '') + '>Inicio</a></li>' +
              '<li><a href="nuestros-servicios.html"' + (PAGE === 'servicios' ? ' class="active"' : '') + '>Nuestros servicios</a></li>' +
              '<li><a href="sobre-nosotros.html"' + (PAGE === 'sobre' ? ' class="active"' : '') + '>Sobre nosotros</a></li>' +
              '<li><a href="contacta-con-nosotros.html"' + (PAGE === 'contacto' ? ' class="active"' : '') + '>Contácta con nosotros</a></li>' +
              '<li><a href="biblioteca.html"' + (PAGE === 'biblioteca' ? ' class="active"' : '') + '>Biblioteca</a></li>' +
            '</ul>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  var ctaEl = document.getElementById('cta');
  if (ctaEl) {
    ctaEl.outerHTML =
      '<section class="cta-final">' +
        '<div class="container">' +
          '<h2>¿Necesitas un servicio de limpieza profesional?</h2>' +
          '<p>Solicita tu presupuesto sin compromiso y te responderemos a la mayor brevedad.</p>' +
          '<a href="contacta-con-nosotros.html" class="btn-primary">Solicitar presupuesto</a>' +
        '</div>' +
      '</section>';
  }

  var footerEl = document.getElementById('footer');
  if (footerEl) {
    footerEl.outerHTML =
      '<footer class="footer">' +
        '<div class="container footer-grid">' +
          '<div class="logo">' +
            '<img src="img/logo.png" alt="Limpiezas EduAL">' +
            '<p>Limpiezas EduAL es una empresa especializada en servicios de limpieza profesional para hogares, oficinas y comunidades.</p>' +
          '</div>' +
          '<div class="footer-nav">' +
            '<h4>Navegación</h4>' +
            '<ul>' +
              '<li><a href="index.html">Inicio</a></li>' +
              '<li><a href="nuestros-servicios.html">Nuestros servicios</a></li>' +
              '<li><a href="sobre-nosotros.html">Sobre nosotros</a></li>' +
              '<li><a href="contacta-con-nosotros.html">Contacto</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-contacto">' +
            '<h4>Contacto</h4>' +
            '<p>Granada y Málaga</p>' +
            '<p>600 000 000</p>' +
            '<p>info@limpiezasedual.com</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>&copy; 2026 Limpiezas EduAL. Todos los derechos reservados.</p>' +
        '</div>' +
      '</footer>';
  }

  var barFill = document.getElementById('scrollBarFill');
  if (barFill) {
    function updateScrollBar() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      barFill.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateScrollBar);
    updateScrollBar();
  }

});
