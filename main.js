// Función para cargar el archivo JSON local
async function cargarSuperheroes() {
    try {
        const response = await fetch('./json/data.json'); // Cargar el archivo JSON
        const data = await response.json(); // Convertir la respuesta a JSON

        // Acceder a los héroes de Marvel y DC
        const superheroesMarvel = data[0].marvel;
        const superheroesDC = data[0].Dc;

        // Limpiar los contenedores antes de añadir tarjetas
        document.getElementById('marvel').innerHTML = '';
        document.getElementById('dc').innerHTML = '';

        // Renderizar tarjetas de Marvel y DC
        crearTarjetas(superheroesMarvel, 'marvel');
        crearTarjetas(superheroesDC, 'dc');

        const modal = document.getElementById('modal');
        modal.style.display = 'none'
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

// Función para crear las tarjetas de cada superhéroe
function crearTarjetas(superheroes, categoria) {
    const contenedor = document.getElementById(categoria);

    superheroes.forEach(superheroe => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        // Imagen del superhéroe
        const img = document.createElement('img');
        img.src = superheroe.img || 'ruta/imagen/default.jpg'; // Imagen por defecto si falta
        img.alt = `${superheroe.nombreH}`;
        tarjeta.appendChild(img);

        // Nombre del superhéroe
        const nombreH = document.createElement('h3');
        nombreH.textContent = superheroe.nombreH || 'Nombre desconocido';
        tarjeta.appendChild(nombreH);

        tarjeta.addEventListener("click", () => {
            mostrarModal(superheroe);
        });

        // Añadir la tarjeta al contenedor correspondiente
        contenedor.appendChild(tarjeta);
    });
}

// Función para mostrar el modal con la información del superhéroe
function mostrarModal(superheroe) {
    const modal = document.getElementById('modal');
    const info = document.getElementById('info-modal');

    // Limpiar el contenido anterior del modal
    info.innerHTML = '';

    // Agregar el contenido del superhéroe al modal
    info.innerHTML = `
        <img src="${superheroe.imgS}" alt="${superheroe.nombreH}" />
        <h3>${superheroe.nombreH}</h3>
        <p><strong>Nombre real:</strong> ${superheroe.nombre || 'Desconocido'}</p>
        <p><strong>Habilidad:</strong> ${superheroe.habilidad || 'Desconocida'}</p>
        <p><strong>Historia:</strong> ${superheroe.biografia || 'Desconocida'}</p>
    `;

    // Mostrar el modal
    modal.style.display = 'block';

    // Cerrar el modal cuando se haga clic en el botón de cerrar
    document.querySelector(".cerrar").addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Cargar los héroes al cargar la página
document.addEventListener('DOMContentLoaded', cargarSuperheroes);

// Cerrar el modal cuando se haga clic fuera del contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
