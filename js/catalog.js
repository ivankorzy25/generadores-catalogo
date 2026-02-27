/* Catalog page logic */
(function() {
  var products = window.KOR_PRODUCTS || [];
  var grid = document.getElementById('kor-grid');
  var search = document.getElementById('kor-search');
  var sortSel = document.getElementById('kor-sort');
  var countEl = document.getElementById('kor-result-count');
  var showingEl = document.getElementById('kor-showing');
  var noResults = document.getElementById('kor-no-results');
  var activeCat = 'all';

  function fmtPrice(p, cur) {
    if (!p || p <= 0) return 'Consultar';
    var s = Math.round(p).toLocaleString('es-AR');
    return (cur === 'USD' ? 'USD ' : '$ ') + s;
  }

  function render() {
    var q = (search.value || '').toLowerCase().trim();
    var sort = sortSel.value;
    var filtered = products.filter(function(p) {
      if (activeCat !== 'all' && p.g !== activeCat) return false;
      if (q && p.n.toLowerCase().indexOf(q) === -1 && p.c.toLowerCase().indexOf(q) === -1 && p.g.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });

    // Sort
    if (sort === 'price-asc') filtered.sort(function(a,b) { return (a.p||9e9) - (b.p||9e9); });
    else if (sort === 'price-desc') filtered.sort(function(a,b) { return (b.p||0) - (a.p||0); });
    else if (sort === 'name') filtered.sort(function(a,b) { return a.n.localeCompare(b.n); });
    else filtered.sort(function(a,b) { return (b.rk||0) - (a.rk||0); });

    var html = '';
    for (var i = 0; i < filtered.length; i++) {
      var p = filtered[i];
      var imgHtml = p.i ? '<img src="' + p.i + '" alt="' + p.n + '" loading="lazy">' : '<i class="fas fa-box" style="font-size:48px;color:#ddd"></i>';
      html += '<a href="' + p.r + '/" class="kor-product-card">' +
        '<div class="kor-product-card-img">' + imgHtml + '</div>' +
        '<div class="kor-product-card-body">' +
          '<div class="kor-product-card-group">' + p.g + '</div>' +
          '<div class="kor-product-card-name">' + p.n + '</div>' +
          '<div class="kor-product-card-price">' + fmtPrice(p.p, p.cu) + '</div>' +
          '<div class="kor-product-card-cta">Ver ficha &rarr;</div>' +
        '</div></a>';
    }
    grid.innerHTML = html;
    countEl.textContent = filtered.length + ' productos';
    showingEl.textContent = 'Mostrando ' + filtered.length + ' de ' + products.length;
    noResults.style.display = filtered.length === 0 ? 'block' : 'none';
  }

  // Category buttons
  document.getElementById('kor-categories').addEventListener('click', function(e) {
    var btn = e.target.closest('.kor-cat-btn');
    if (!btn) return;
    document.querySelectorAll('.kor-cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    activeCat = btn.getAttribute('data-cat');
    render();
  });

  search.addEventListener('input', render);
  sortSel.addEventListener('change', render);

  // Try live price update from ERPNext
  function tryLivePrices() {
    var erp = window.KOR_ERP;
    if (!erp) return;
    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, 5000);
    fetch(erp + '/api/resource/Website%20Item?fields=%5B%22item_code%22%5D&filters=%5B%5B%22published%22%2C%22%3D%22%2C1%5D%5D&limit_page_length=300', { signal: controller.signal })
      .then(function() { clearTimeout(timer); /* Server reachable - could update prices here */ })
      .catch(function() { clearTimeout(timer); });
  }

  render();
  tryLivePrices();
})();
