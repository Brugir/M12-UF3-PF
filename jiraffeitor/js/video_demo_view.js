// video_demo_view.js
// Muestra el video y detalles de prueba según el id de la URL

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // Ejemplos de videos
    const ejemplos = [
        {
            id: 'ejemplo1',
            title: 'Video de ejemplo local',
            desc: 'Este es un video de prueba tomado de tu carpeta VIDEOS/. Puedes cambiarlo por cualquier otro archivo local o remoto.',
            thumbnail: 'IMG/thumb.png',
            src: 'VIDEOS/REPO 2025-04-02 12-50-36.mp4'
        },
        {
            id: 'ejemplo2',
            title: 'Demo online',
            desc: 'Video de muestra online para pruebas de diseño.',
            thumbnail: 'IMG/thumb.png',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }
    ];
    const video = ejemplos.find(v => v.id === id) || ejemplos[0];
    // Rellena el video principal
    document.getElementById('mainVideo').innerHTML = `
        <video controls poster="${video.thumbnail}">
            <source src="${video.src}" type="video/mp4">
            Tu navegador no soporta la reproducción de video.
        </video>
        <h2>${video.title}</h2>
        <p>${video.desc}</p>
    `;
    // Rellena los videos laterales
    const aside = document.getElementById('sideVideos');
    aside.innerHTML = '';
    ejemplos.filter(v => v.id !== video.id).forEach(v => {
        const card = document.createElement('a');
        card.href = `video_demo.html?id=${v.id}`;
        card.className = 'video-card';
        card.innerHTML = `
            <img src="${v.thumbnail}" alt="${v.title}">
            <p>${v.title}</p>
        `;
        aside.appendChild(card);
    });
    // Botón volver
    const volver = document.createElement('a');
    volver.href = 'index.html';
    volver.className = 'video-card';
    volver.innerHTML = `<img src="IMG/logo.png" alt="Volver"><p>Volver a la galería</p>`;
    aside.appendChild(volver);
});
