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
// Fecha o menu lateral ao clicar fora dele
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar-wrapper');
  const toggleBtn = document.querySelector('.menu-toggle');

  if (
    document.body.classList.contains('sidebar-open') &&
    !sidebar.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    document.body.classList.remove('sidebar-open');
  }
});
// Controle do menu lateral (responsivo)
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar-wrapper");
  const menuButton = document.getElementById("menu-toggle");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Fecha o menu ao clicar em um link
  document.querySelectorAll("#sidebar-wrapper a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
});


