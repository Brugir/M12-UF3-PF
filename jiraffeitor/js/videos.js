// videos.js
// Carga y muestra videos desde la API en la página principal

document.addEventListener('DOMContentLoaded', async function() {
    // Login UI universal (nombre usuario y logout)
    const loginBtn = document.getElementById('userBtn');
    const logoutMenu = document.getElementById('logoutMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    // Mostrar nombre de usuario si está logueado, si no, mostrar 'Login'
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



    // --- Galería de videos ---
    const gallery = document.querySelector('.video-gallery .video-row');
    if (!gallery) return;

    fetch('https://giraffe.niliara.net/api/videos')
        .then(res => res.ok ? res.json() : [])
        .then(videos => {
            gallery.innerHTML = '';
            if (!videos || videos.length === 0) {
                gallery.innerHTML = '<p style="color:#FAA800">No hay videos disponibles.</p>';
                return;
            }
            // Ordenar videos por id descendente
            videos.sort((a, b) => b.id - a.id);
            // Mostrar tarjetas de videos
            videos.forEach(video => {
                const card = document.createElement('a');
                card.href = `video.html?id=${video.id}`;
                card.className = 'video-card';
                card.innerHTML = `
    <img src="https://giraffe.niliara.net/api/video/thumb/${video.id}" alt="${video.name}">
    <p style="font-weight:bold;">${video.name}</p>
    <p style="font-size:0.9em;color:#888;">${video.description || ''}</p>
`;

                gallery.appendChild(card);
            });
        })
        .catch(() => {
            gallery.innerHTML = '<p style="color:#FAA800">No se pudieron cargar los videos.</p>';
        });
});
