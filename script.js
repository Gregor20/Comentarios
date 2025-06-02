document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const commentsList = document.getElementById('commentsList');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    // Cargar comentarios guardados al iniciar
    loadComments();

    // Funcionalidad para el modal de imágenes
    document.querySelectorAll('.spaceship-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        // Crear objeto con los datos del comentario
        const commentData = {
            name,
            email,
            comment,
            date: new Date().toLocaleString()
        };

        // Guardar el comentario
        saveComment(commentData);

        // Mostrar el comentario en la página
        displayComment(commentData);

        // Limpiar el formulario
        userForm.reset();

        // Mostrar mensaje de éxito
        alert('¡Gracias por tu comentario!');
    });

    function saveComment(commentData) {
        // Obtener comentarios existentes
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        // Agregar nuevo comentario
        comments.push(commentData);
        
        // Guardar en localStorage
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        // Obtener comentarios guardados
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        
        // Mostrar cada comentario
        comments.forEach(comment => displayComment(comment));
    }

    function displayComment(commentData) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-card';
        commentElement.innerHTML = `
            <h3>${commentData.name}</h3>
            <p><strong>Fecha:</strong> ${commentData.date}</p>
            <p>${commentData.comment}</p>
        `;
        
        // Insertar al principio de la lista
        commentsList.insertBefore(commentElement, commentsList.firstChild);
    }
}); 