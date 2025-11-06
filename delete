document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  // --- LOGIN ---
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;

      if (usuario === 'admin' && senha === '123') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
      } else {
        alert('Usuário ou senha incorretos.');
      }
    });
  }

  // --- VERIFICA LOGIN ---
  const restrictedPages = ['dashboard.html', 'estoque.html', 'fornecedores.html', 'clientes.html', 'vendas.html'];
  const currentPage = window.location.pathname.split('/').pop();

  if (restrictedPages.includes(currentPage) && sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
  }

  // --- MENU LATERAL ---
  const toggleBtn = document.getElementById('menu-toggle');
  const body = document.body;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      body.classList.toggle('sidebar-open');
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar-wrapper');
      if (
        body.classList.contains('sidebar-open') &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        body.classList.remove('sidebar-open');
      }
    });

    // Fecha o menu ao clicar em um link da sidebar
    document.querySelectorAll('#sidebar-wrapper a').forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('sidebar-open');
      });
    });
  }
});

// --- LOGOUT ---
function logout() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}
