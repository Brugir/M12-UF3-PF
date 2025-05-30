// video_view.js
// Carga y muestra un video individual desde la API

document.addEventListener('DOMContentLoaded', function() {
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
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoDesc = document.getElementById('videoDesc');
    if (!id) {
        videoPlayer.innerHTML = '<p style="color:#FAA800">No se ha encontrado el video.</p>';
        return;
    }
    fetch(`https://giraffe.niliara.net/api/video/info/${id}`)
        .then(res => res.ok ? res.json() : null)
        .then(video => {
            if (!video) {
                videoPlayer.innerHTML = '<p style="color:#FAA800">No se ha encontrado el video.</p>';
                return;
            }
            const videoUrl = `https://giraffe.niliara.net/api/video/source/${video.id}`;
            const thumbUrl = `https://giraffe.niliara.net/api/video/thumb/${video.id}`;
            videoPlayer.innerHTML = `
                <video controls width="100%" poster="${thumbUrl}">
                    <source src="${videoUrl}" type="video/mp4">
                    Tu navegador no soporta el video.
                </video>
                <h1>${video.name}</h1>
                <div style="margin:10px 0;">
                    <a href="${videoUrl}" target="_blank" style="color:#FAA800;">Ver archivo de video directamente</a>
                </div>
            `;
            videoDesc.textContent = video.description || '';
        })
        .catch(() => {
            videoPlayer.innerHTML = '<p style="color:#FAA800">No se pudo cargar el video.</p>';
        });

    // Cargar videos recientes en la barra lateral
    // Fetch related videos after loading the main video info
    let videoTitle = '';
    fetch(`https://giraffe.niliara.net/api/video/info/${id}`)
        .then(res => res.ok ? res.json() : null)
        .then(video => {
            if (!video) {
                videoPlayer.innerHTML = '<p style="color:#FAA800">No se ha encontrado el video.</p>';
                return;
            }
            const videoUrl = `https://giraffe.niliara.net/api/video/source/${video.id}`;
            const thumbUrl = `https://giraffe.niliara.net/api/video/thumb/${video.id}`;
            videoPlayer.innerHTML = `
                <video controls width="100%" poster="${thumbUrl}">
                    <source src="${videoUrl}" type="video/mp4">
                    Tu navegador no soporta el video.
                </video>
                <h1>${video.name}</h1>
                <div style="margin:10px 0;">
                    <a href="${videoUrl}" target="_blank" style="color:#FAA800;">Ver archivo de video directamente</a>
                </div>
            `;
            videoDesc.textContent = video.description || '';
            videoTitle = video.name;
            // Fetch related videos using the video title
            fetch(`https://giraffe.niliara.net/api/videos/search?term=${encodeURIComponent(videoTitle)}`)
                .then(res => res.ok ? res.json() : [])
                .then(relatedVideos => {
                    const relatedVideosDiv = document.getElementById('relatedVideos');
                    if (!relatedVideosDiv) return;
                    relatedVideosDiv.innerHTML = '';
                    // Remove the current video from the related list
                    relatedVideos = relatedVideos.filter(v => v.id !== video.id);
                    if (relatedVideos.length === 0) {
                        relatedVideosDiv.innerHTML = '<p style="color:#FAA800;text-align:center;">No related videos found.</p>';
                        return;
                    }
                    relatedVideos.slice(0, 6).forEach(video => {
                        const a = document.createElement('a');
                        a.href = `video.html?id=${video.id}`;
                        a.className = 'recent-video-item';
                        a.innerHTML = `
                            <img src="https://giraffe.niliara.net/api/video/thumb/${video.id}" alt="${video.name}" class="recent-video-thumb">
                            <span class="recent-video-title">${video.name}</span>
                        `;
                        relatedVideosDiv.appendChild(a);
                    });
                });
        })
        .catch(() => {
            videoPlayer.innerHTML = '<p style="color:#FAA800">No se pudo cargar el video.</p>';
        });
});
