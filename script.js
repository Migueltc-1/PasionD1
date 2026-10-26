document.getElementById('year').textContent = new Date().getFullYear();

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    menuToggle.addEventListener('click', function() {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });

    const searchPanel = document.getElementById('searchPanel');
    document.getElementById('searchToggle').addEventListener('click', function() {
      searchPanel.hidden = !searchPanel.hidden;
      if (!searchPanel.hidden) document.getElementById('searchInput').focus();
    });
    function searchNews() {
      const term = document.getElementById('searchInput').value.trim().toLocaleLowerCase('es');
      let visible = 0;
      document.querySelectorAll('.news-card').forEach(function(card) {
        const content = ((card.dataset.search || '') + ' ' + card.textContent).toLocaleLowerCase('es');
        const match = !term || content.includes(term);
        card.hidden = !match;
        if (match) visible++;
      });
      document.getElementById('searchMessage').textContent = visible ? (term ? visible + ' resultado(s).' : '') : 'No se encontraron noticias.';
      document.getElementById('ultimas').scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('searchButton').addEventListener('click', searchNews);
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') searchNews();
    });

    document.getElementById('newsletterForm').addEventListener('submit', function(event) {
      event.preventDefault();
      document.getElementById('newsletterMessage').textContent = '¡Gracias! Este boletín es una demostración y aún no guarda suscripciones.';
      this.reset();
    });
