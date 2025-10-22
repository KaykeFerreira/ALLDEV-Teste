document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita o envio padrão do formulário

            const usuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;

            // Lógica de autenticação simplificada (apenas para simulação)
            if (usuario === 'admin' && senha === '123') {
                // Armazena um estado de login simples e redireciona
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'dashboard.html'; 
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // Função de verificação de login para páginas seguras
    function checkLogin() {
        if (window.location.pathname.includes('dashboard.html') || 
            window.location.pathname.includes('estoque.html')) {
            if (sessionStorage.getItem('loggedIn') !== 'true') {
                window.location.href = 'index.html'; // Redireciona para login se não estiver logado
            }
        }
    }

    checkLogin();
});

// Adiciona uma função de Logout que pode ser chamada na próxima tela
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}