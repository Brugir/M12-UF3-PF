// login.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const loginBtn = document.getElementById('userBtn');
    const logoutMenu = document.getElementById('logoutMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeLoginModal');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginDiv = document.querySelector('.login');

    // Mostrar nombre de usuario si está logueado, si no, mostrar 'Login'
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (loginBtn) {
    if (token && username) {
        loginBtn.innerHTML = `<b>${username}</b>`;
        loginBtn.onmouseenter = function() {
            loginBtn.innerHTML = '<b>Cerrar sesión</b>';
        };
        loginBtn.onmouseleave = function() {
            loginBtn.innerHTML = `<b>${username}</b>`;
        };
        loginBtn.onclick = function() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            location.reload();
        };
    } else {
        loginBtn.innerHTML = '<b>Login</b>';
        loginBtn.onmouseenter = null;
        loginBtn.onmouseleave = null;
        loginBtn.onclick = function() {
            window.location.href = 'auth.html';
        };
    }
}

    // Tabs
    tabLogin.addEventListener('click', function() { showTab('login'); });
    tabRegister.addEventListener('click', function() { showTab('register'); });

    function showTab(tab) {
        if (tab === 'login') {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
            tabLogin.style.textDecoration = 'underline';
            tabRegister.style.textDecoration = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
            tabLogin.style.textDecoration = 'none';
            tabRegister.style.textDecoration = 'underline';
        }
        clearForms();
    }

    function clearForms() {
        loginForm.reset();
        registerForm.reset();
        document.getElementById('loginError').textContent = '';
        document.getElementById('registerError').textContent = '';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            try {
                const res = await fetch('https://giraffe.niliara.net/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (res.ok && data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);
if (loginBtn) loginBtn.innerHTML = `<b>${username}</b>`;
                    let ref = document.referrer;
if (ref && !ref.endsWith('auth.html')) {
    window.location.href = ref;
} else {
    window.location.href = 'index.html';
}
                } else {
                    document.getElementById('loginError').textContent = data.message || data.error || 'Login incorrecto';
                }
            } catch (err) {
                document.getElementById('loginError').textContent = 'Error de red o del servidor.';
            }
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            // El email no se usa en la API real
            const password = document.getElementById('registerPassword').value;
            const password2 = document.getElementById('registerPassword2').value;
            if (password !== password2) {
                document.getElementById('registerError').textContent = 'Las contraseñas no coinciden';
                return;
            }
            try {
                const res = await fetch('https://giraffe.niliara.net/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (res.ok && data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);
if (loginBtn) loginBtn.innerHTML = `<b>${username}</b>`;
                    let ref = document.referrer;
if (ref && !ref.endsWith('auth.html')) {
    window.location.href = ref;
} else {
    window.location.href = 'index.html';
}
                } else {
                    document.getElementById('registerError').textContent = data.message || data.error || 'Registro incorrecto';
                }
            } catch (err) {
                document.getElementById('registerError').textContent = 'Error de red o del servidor.';
            }
        });
    }


});
