const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let interval;

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

dots.forEach(dot => {
  dot.addEventListener('click', function () {
    goToSlide(parseInt(this.dataset.slide));
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
  });
});

interval = setInterval(nextSlide, 6000);
