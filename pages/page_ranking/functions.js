const apiRanking = 'https://wc-qualifications-api-production.up.railway.app/api/v1/ranking';
const apiPaises = 'https://wc-qualifications-api-production.up.railway.app/api/v1/countries';

// Inicializar IndexedDB
const tiendaRanking = "ranking";
const tiendaBanderas = "banderas";

async function inicializarIndexedDB() {
    return new Promise((resolver, rechazar) => {
        const request = indexedDB.open('miBaseDeDatos', 1);

        request.onupgradeneeded = (evento) => {
            const db = evento.target.result;

            // Verificamos si el store "ranking" ya existe usando Array.from para convertir a array
            const existingStores = Array.from(db.objectStoreNames);
            if (!existingStores.includes('ranking')) {
                // Si no existe, lo creamos
                db.createObjectStore('ranking', { keyPath: 'id', autoIncrement: true });
            }

            // Verificamos si otros stores existen (Ejemplo con otros stores)
            if (!existingStores.includes('banderas')) {
                db.createObjectStore('banderas', { keyPath: 'id', autoIncrement: true });
            }

            if (!existingStores.includes('confederaciones')) {
                db.createObjectStore('confederaciones', { keyPath: 'id', autoIncrement: true });
            }

            if (!existingStores.includes('noticion')) {
                db.createObjectStore('noticion', { keyPath: 'id', autoIncrement: true });
            }

            if (!existingStores.includes('partidos')) {
                db.createObjectStore('partidos', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (evento) => {
            const db = evento.target.result;
            resolver(db);
        };

        request.onerror = (evento) => {
            rechazar(evento.target.error);
        };
    });
}

// Función para guardar datos en IndexedDB
function guardarDatosEnIndexedDB(db, datos, tienda) {
    return new Promise((resolver, rechazar) => {
        const transaccion = db.transaction(tienda, "readwrite");  // Usar el store especificado
        const tiendaStore = transaccion.objectStore(tienda);

        datos.forEach((item, indice) => {
            tiendaStore.put({ id: indice, ...item });
        });

        transaccion.oncomplete = () => {
            resolver();
        };

        transaccion.onerror = (evento) => {
            rechazar(evento.target.error);
        };
    });
}

// Función para obtener datos de IndexedDB
function obtenerDatosDeIndexedDB(db, tienda) {
    return new Promise((resolver, rechazar) => {
        const transaccion = db.transaction(tienda, "readonly");  // Usar el store especificado
        const tiendaStore = transaccion.objectStore(tienda);
        const solicitud = tiendaStore.getAll();

        solicitud.onsuccess = (evento) => {
            resolver(evento.target.result);
        };

        solicitud.onerror = (evento) => {
            rechazar(evento.target.error);
        };
    });
}

function actualizarSlider(pais, tipo, descripcion) {
    // Obtener el contenedor de la tarjeta
    const sliderItem = document.getElementById(tipo);

    // Crear el contenido de la tarjeta
    sliderItem.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <img src="${pais.bandera}" alt="Bandera" class="card-img-top" style="width: 80px; height: 50px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);">
            <h5 class="card-title mt-3">${pais.fifa}</h5>  <!-- Muestra el nombre de la FIFA -->
            <p class="card-text">${descripcion}</p>
        </div>
    `;
}

async function cargarClasificacion() {
    const db = await inicializarIndexedDB();
    try {
        // Llamadas a las APIs
        const [respuestaRanking, respuestaPaises] = await Promise.all([
            fetch(apiRanking),
            fetch(apiPaises)
        ]);

        const datosRanking = await respuestaRanking.json();
        const datosPaises = await respuestaPaises.json();

        // Crear un mapa de países para fácil acceso
        const mapaPaises = new Map();
        datosPaises.countries.forEach(pais => {
            mapaPaises.set(pais.id, {
                nombre: pais.name.es.common,  // Nombre común del país
                bandera: pais.flags.png,
                fifa: pais.fifa
            });
        });

         // Guardar datos en IndexedDB
        // Guardamos la clasificación en el store "ranking"
        await guardarDatosEnIndexedDB(db, datosRanking.ranking, "ranking");
        // Guardamos las banderas en el store "banderas"
        await guardarDatosEnIndexedDB(db, datosPaises.countries, "banderas");

        // Mostrar clasificación inicial en la tabla
        const tabla = document.getElementById('tabla-clasificacion');
        tabla.innerHTML = '';  // Limpiar la tabla antes de agregar las filas
        const elementosIniciales = 10;

        const agregarFilas = (datos, inicio, fin) => {
            for (let i = inicio; i < fin; i++) {
                const pais = datos[i];
                const infoPais = mapaPaises.get(pais.country_id) || { nombre: 'Desconocido', bandera: '', fifa: '' };
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td class="izquierda">${pais.rank}</td>
                    <td class="centro"><img src="${infoPais.bandera}" alt="Bandera"> ${infoPais.nombre}</td>  <!-- Nombre común en la tabla -->
                    <td class="derecha">${pais.points}</td>
                `;
                tabla.appendChild(fila);
            }
        };

        agregarFilas(datosRanking.ranking, 0, 10);

        // Botón para mostrar clasificación completa
        const botonMostrarMas = document.getElementById('mostrar-mas');

        if (datosRanking.ranking.length > elementosIniciales) {
            botonMostrarMas.style.display = 'inline-block';
            botonMostrarMas.addEventListener('click', async () => {
                const todosLosDatos = await obtenerDatosDeIndexedDB(db,'ranking');
                tabla.innerHTML = '';  // Limpiar la tabla antes de agregar las filas
                agregarFilas(todosLosDatos, 0, todosLosDatos.length);
                botonMostrarMas.style.display = 'none';
            });
        }

        // Obtención de los países para los sliders
        let mejorClasificacion = datosRanking.ranking[0];
        let mayorSubida = datosRanking.ranking[0];
        let mayorPuntos = datosRanking.ranking[0];
        let peorClasificacion = datosRanking.ranking[0];
        let mayorDescenso = datosRanking.ranking[0];
        let menosPuntos = datosRanking.ranking[0];

        for (let i = 1; i < datosRanking.ranking.length; i++) {
            const pais = datosRanking.ranking[i];

            // Mejor clasificación
            if (pais.rank === 1) {
                mejorClasificacion = pais;
            }

            // Mayor subida
            if (pais.previous_rank - pais.rank > mayorSubida.previous_rank - mayorSubida.rank) {
                mayorSubida = pais;
            }

            // Mayor puntos conseguidos
            if (pais.points - pais.previous_points > mayorPuntos.points - mayorPuntos.previous_points) {
                mayorPuntos = pais;
            }

            // Peor clasificación
            if (pais.rank > peorClasificacion.rank) {
                peorClasificacion = pais;
            }

            // Mayor descenso
            if (pais.previous_rank - pais.rank < mayorDescenso.previous_rank - mayorDescenso.rank) {
                mayorDescenso = pais;
            }

            // Menos puntos
            if (pais.previous_points - pais.points > menosPuntos.previous_points - menosPuntos.points) {
                menosPuntos = pais;
            }
        }

        // Actualización de los sliders
        actualizarSlider(mapaPaises.get(mejorClasificacion.country_id), 'mejor-clasificacion', 'Mejor clasificación<br>' + mejorClasificacion.rank + 'º');
        actualizarSlider(mapaPaises.get(mayorSubida.country_id), 'mayor-subida', 'Mayor subida<br>' + (mayorSubida.previous_rank - mayorSubida.rank).toFixed(0) + ' <i class="fas fa-arrow-up"></i>');
        actualizarSlider(mapaPaises.get(mayorPuntos.country_id), 'mayor-puntos', 'Más puntos conseguidos<br>' + '+' + (mayorPuntos.points - mayorPuntos.previous_points).toFixed(2));
        actualizarSlider(mapaPaises.get(peorClasificacion.country_id), 'peor-clasificacion', 'Peor clasificación<br>' + peorClasificacion.rank + 'º');
        actualizarSlider(mapaPaises.get(mayorDescenso.country_id), 'mayor-descenso', 'Mayor descenso<br>' + (mayorDescenso.previous_rank - mayorDescenso.rank).toFixed(0) + ' <i class="fas fa-arrow-down"></i>');
        actualizarSlider(mapaPaises.get(menosPuntos.country_id), 'menos-puntos', 'Mayor pérdida de puntos<br>' + (menosPuntos.points - menosPuntos.previous_points).toFixed(2));

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

cargarClasificacion();

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}