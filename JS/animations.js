document.addEventListener('DOMContentLoaded', function () {
  var scrollElements = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-in, .animate-scale-in, ' +
    '.animate-slide-left, .animate-slide-right, .animate-bounce-in, ' +
    '.hero-stagger, .title-line'
  );

  if (scrollElements.length === 0) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    scrollElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    scrollElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
});
