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
    const toggleBtn = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper') || document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !toggleBtn.contains(e.target)
            ) {
                sidebar.classList.remove('active');
            }
        });

        // Fecha ao clicar em qualquer link do menu
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => sidebar.classList.remove('active'));
        });
    }
});

// --- LOGOUT ---
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}
