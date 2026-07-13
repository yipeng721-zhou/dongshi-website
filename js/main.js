// ===== Hero 轮播（仅首页存在 #slides 时启用）=====
(function () {
  var slides = document.getElementById('slides');
  if (!slides) return;
  var count = slides.children.length;
  var idx = 0, timer;
  var dotsWrap = document.getElementById('dots');
  for (var i = 0; i < count; i++) {
    var b = document.createElement('button');
    b.dataset.i = i;
    b.addEventListener('click', function () { go(+this.dataset.i); });
    dotsWrap.appendChild(b);
  }
  function render() {
    slides.style.transform = 'translateX(-' + idx * 100 + '%)';
    var dots = dotsWrap.children;
    for (var i = 0; i < dots.length; i++) dots[i].className = i === idx ? 'on' : '';
  }
  function go(i) { idx = (i + count) % count; render(); restart(); }
  function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
  document.getElementById('prevBtn').addEventListener('click', function () { go(idx - 1); });
  document.getElementById('nextBtn').addEventListener('click', function () { go(idx + 1); });
  render(); restart();
})();

// ===== 移动端菜单 =====
(function () {
  var nav = document.getElementById('mainNav');
  var burger = document.getElementById('hamburger');
  if (!nav || !burger) return;
  burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') nav.classList.remove('open');
  });
})();

// ===== 回到顶部 =====
(function () {
  var toTop = document.getElementById('toTop');
  if (!toTop) return;
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
