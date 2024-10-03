document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
    const superHeroes = document.getElementById('contenedor');
    const dialo = document.getElementById('dialo');
    const contenidoDialo = document.getElementById('contenidodialo');
    const cerrar = document.getElementById('cerrar');

    // Inicializar los eventos
    cerrar.addEventListener('click', cerrarDialo);

    // Cargar personajes
    cargarPersonajes();

    // Función para cargar personajes del archivo JSON
    async function cargarPersonajes() {
        try {
            const personajes = await obtenerPersonajes();
            renderizarTarjetasPersonajes(personajes);
        } catch (error) {
            console.error('Error al cargar personajes:', error);
        }
    }

    // Función para obtener personajes del archivo JSON
    async function obtenerPersonajes() {
        const respuesta = await fetch('./json/data.json');
        if (!respuesta.ok) throw new Error('Error al cargar el archivo JSON');
        return respuesta.json();
    }

    // Función para renderizar las tarjetas de personajes
    function renderizarTarjetasPersonajes(personajes) {
        superHeroes.innerHTML = ''; // Limpiar el contenedor
        personajes.forEach(personaje => {
            const tarjeta = crearTarjetaPersonaje(personaje);
            superHeroes.appendChild(tarjeta);
        });
    }

    // Función para crear una tarjeta de personaje
    function crearTarjetaPersonaje(personaje) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-personaje');
        tarjeta.innerHTML = `
            <img src="${personaje.imagen}" alt="${personaje.nombrePersonaje}">
            <h3>${personaje.nombrePersonaje}</h3>
            <p>${personaje.casaProductora}</p>
        `;
        tarjeta.addEventListener('click', () => abrirDialogo(personaje));
        return tarjeta;
    }

    // Función para abrir el cuadro de diálogo
    function abrirDialogo(personaje) {
        contenidoDialo.innerHTML = `
            <h2>${personaje.nombrePersonaje}</h2>
            <img src="${personaje.imagen}" alt="${personaje.nombrePersonaje}">
            <p><strong>Nombre Real:</strong> ${personaje.nombreReal}</p>
            <p><strong>Biografía:</strong> ${personaje.biografia}</p>
            <p><strong>Resistencia:</strong> ${personaje.resistencia}</p>
            <p><strong>Fuerza de Ataque:</strong> ${personaje.fuerzaAtaque}</p>
        `;
        dialo.showModal();
    }

    // Función para cerrar el cuadro de diálogo
    function cerrarDialo() {
        dialo.close();
    }
}
