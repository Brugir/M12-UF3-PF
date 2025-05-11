// upload.js
// Solo permite subir si el usuario está autenticado

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const uploadForm = document.getElementById('uploadForm');
    const uploadMsg = document.getElementById('uploadMsg');
    const loginBtn = document.getElementById('userBtn');

    // Lógica universal de login/logout en el botón
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

    // Si no hay token, redirige a login
    if (!token) {
        uploadMsg.textContent = 'Debes iniciar sesión para subir videos.';
        uploadForm.style.display = 'none';
        return;
    }

    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        uploadMsg.textContent = '';
        const name = document.getElementById('videoName').value.trim();
        const desc = document.getElementById('videoDesc').value.trim();
        const fileInput = document.getElementById('videoFile');
        const file = fileInput.files[0];
        if (!file) {
            uploadMsg.textContent = 'Selecciona un archivo de video.';
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', desc);
        formData.append('file', file);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', desc);
            formData.append('file', file);
            const res = await fetch('https://giraffe.niliara.net/api/video/upload', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                body: formData
            });
            if (res.ok) {
                uploadMsg.style.color = '#43c943';
                uploadMsg.textContent = '¡Video subido correctamente!';
                uploadForm.reset();
            } else {
                const data = await res.json().catch(() => ({}));
                uploadMsg.style.color = '#ff5050';
                uploadMsg.textContent = data.message || data.error || 'Error al subir el video.';
            }
        } catch (err) {
            uploadMsg.style.color = '#ff5050';
            uploadMsg.textContent = 'Error de red o del servidor: ' + (err && err.message ? err.message : err);
            console.error('Error al subir video:', err);
        }
    });
});
