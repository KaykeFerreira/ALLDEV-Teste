document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // --- LOGIN SIMPLES ---
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

    // --- VERIFICA LOGIN EM PÁGINAS RESTRITAS ---
    function checkLogin() {
        const restrictedPages = ['dashboard.html', 'estoque.html', 'fornecedores.html', 'clientes.html', 'vendas.html'];
        const currentPage = window.location.pathname.split('/').pop();

        if (restrictedPages.includes(currentPage) && sessionStorage.getItem('loggedIn') !== 'true') {
            window.location.href = 'index.html';
        }
    }

    checkLogin();

    // --- CONTROLE DO MENU LATERAL ---
    const toggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // evita fechamento imediato
            document.body.classList.toggle('sidebar-open');
        });

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (
                document.body.classList.contains('sidebar-open') &&
                !sidebar.contains(e.target) &&
                !toggleBtn.contains(e.target)
            ) {
                document.body.classList.remove('sidebar-open');
            }
        });

        // Fecha ao clicar em um item do menu
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('sidebar-open');
            });
        });
    }
});

// --- LOGOUT ---
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}
