/* Product page logic */
var korLB = { imgs: [], cur: 0 };

function korOpenLB(i) {
  var lb = document.getElementById('kor-lb');
  if (!lb) return;
  korLB.cur = i;
  lb.querySelector('.kor-lb-img').src = korLB.imgs[i] || '';
  lb.querySelector('.kor-lb-counter').textContent = (i+1) + ' / ' + korLB.imgs.length;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function korCloseLB() {
  var lb = document.getElementById('kor-lb');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
function korNavLB(d) {
  var t = korLB.imgs.length;
  if (t <= 1) return;
  korLB.cur = (korLB.cur + d + t) % t;
  korOpenLB(korLB.cur);
}

function initProductPage() {
  // Wire image lightbox
  var brochure = document.getElementById('kor-brochure-body');
  if (brochure) {
    var imgs = brochure.querySelectorAll('.page-content img, .cover-image img');
    korLB.imgs = [];
    for (var i = 0; i < imgs.length; i++) {
      (function(img, idx) {
        var src = img.getAttribute('src');
        if (!src) return;
        korLB.imgs.push(img.src || src);
        img.style.cursor = 'pointer';
        img.title = 'Clic para ampliar';
        img.addEventListener('click', function() { korOpenLB(idx); });
      })(imgs[i], korLB.imgs.length);
    }
  }

  // Keyboard nav for lightbox
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('kor-lb').classList.contains('open')) return;
    if (e.key === 'Escape') korCloseLB();
    if (e.key === 'ArrowLeft') korNavLB(-1);
    if (e.key === 'ArrowRight') korNavLB(1);
  });

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.kor-reveal').forEach(function(el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.kor-reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  // Fetch dolar rates
  var dolarEl = document.getElementById('dolar-info');
  if (dolarEl && window.KOR_PRICE && window.KOR_PRICE.price > 0 && window.KOR_PRICE.currency === 'ARS') {
    fetch('https://dolarapi.com/v1/dolares')
      .then(function(r) { return r.json(); })
      .then(function(rates) {
        var blue = null;
        for (var i = 0; i < rates.length; i++) {
          if (rates[i].casa === 'blue') { blue = rates[i]; break; }
        }
        if (blue && blue.venta) {
          var usd = Math.round(window.KOR_PRICE.price / blue.venta);
          dolarEl.innerHTML = '<div style="margin-top:12px">' +
            '<div style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:1px;margin-bottom:4px">EQUIVALENTE EN USD (BLUE)</div>' +
            '<div style="font-family:Montserrat,sans-serif;font-size:22px;font-weight:800;color:rgba(255,255,255,0.9)">USD ' + usd.toLocaleString('es-AR') + '</div>' +
            '<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,0,0.15);border:1px solid rgba(255,107,0,0.3);color:#FF6B00;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;font-family:Montserrat,sans-serif;letter-spacing:0.5px;margin-top:12px">' +
            '<i class="fas fa-chart-line"></i> 1 USD = $ ' + Math.round(blue.venta).toLocaleString('es-AR') + ' blue</div>' +
            '</div>';
        }
      })
      .catch(function() {});
  }
}
