const apiPaises = 'https://wc-qualifications-api-production.up.railway.app/api/v1/countries';
const apiLigas = 'https://wc-qualifications-api-production.up.railway.app/api/v1/leagues';
const apiMatches = 'https://wc-qualifications-api-production.up.railway.app/api/v1/matches'; 

const DB_NAME = 'WorldCupData';
const DB_VERSION = 3;  // Cambiado a versión 3
const STORE_NAME = 'DataStore';

// Función para abrir la base de datos
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Evento cuando la base de datos se abre correctamente
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        // Evento cuando ocurre un error al abrir la base de datos
        request.onerror = (event) => {
            reject('Error al abrir la base de datos');
        };

        // Evento cuando se requiere actualizar la base de datos
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Verificar si el objeto store ya existe antes de crearlo
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'key' });
            }

            // Aquí se pueden realizar más verificaciones o creaciones de objectStores si fuera necesario.
            // Si fuera necesario agregar más stores, puedes hacerlo aquí sin eliminar datos previos.

            console.log(`Base de datos actualizada a la versión ${DB_VERSION}`);
        };
    });
}

// Función para guardar los datos en IndexedDB
function saveDataToDB(data) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        data.forEach(item => {
            store.put(item); // Guardamos cada objeto en la base de datos
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject('Error al guardar datos en la base de datos');
    });
}

// Función para leer datos desde IndexedDB
function readDataFromDB() {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll(); // Obtiene todos los registros

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error al leer datos de la base de datos');
    });
}

// Función para obtener datos de la API o de IndexedDB
async function obtenerDatosDeAPI(url, key) {
    try {
        // Intentamos leer los datos de IndexedDB
        const dataFromDB = await readDataFromDB();
        const cachedData = dataFromDB.find(item => item.key === key);

        if (cachedData) {
            console.log('Datos obtenidos de IndexedDB');
            return cachedData.data; // Si hay datos almacenados en la base de datos, los devolvemos
        }

        // Si no hay datos en la base de datos, realizamos la solicitud a la API
        const response = await fetch(url);
        const data = await response.json();

        // Guardamos los datos en IndexedDB
        await saveDataToDB([{ key, data }]);

        console.log('Datos obtenidos de la API');
        return data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
}

async function mostrarPartidosPorLiga(leagueId, filtro = 'todos', fechaMin = null, fechaMax = null, stage = null) {
    try {
        // Obtener datos de ligas, partidos y países desde la API
        const responseLigas = await obtenerDatosDeAPI(apiLigas, 'leagues');
        const ligas = responseLigas.leagues || [];

        const responsePartidos = await obtenerDatosDeAPI(apiMatches, 'matches');
        const partidos = responsePartidos.matches || [];

        const responsePaises = await obtenerDatosDeAPI(apiPaises, 'countries');
        const paises = responsePaises.countries || [];

        // Seleccionar el contenedor existente
        const partidosContainer = document.querySelector('.partidos-confederacion');

        // Limpiar contenido previo
        partidosContainer.innerHTML = '';

        // Buscar la liga específica por ID
        const liga = ligas.find((liga) => liga.id === leagueId);

        if (!liga) {
            partidosContainer.innerHTML = `<p>No se encontró la liga con ID ${leagueId}.</p>`;
            return;
        }

        let contenido = `
            <div class="mb-4">
                <h3>${liga.name.es}</h3>
                <ul class="list-group list-group-flush">`;

        // Filtrar partidos por liga, estado, rango de fechas y etapa
        const partidosDeLiga = partidos
            .filter((partido) => partido.league_id === leagueId)
            .filter((partido) => {
                if (filtro === 'finalizados') {
                    return partido.status === 'Finished';
                }
                if (filtro === 'por-jugar') {
                    // Consideramos los partidos sin estado asignado como "por jugar"
                    return partido.status === '' || partido.status === null;
                }
                if (filtro === 'cancelados') {
                    // Consideramos los partidos cancelados
                    return partido.status === 'Cancelled';
                }
                return true;
            })
            .filter((partido) => {
                const partidoFecha = new Date(partido.date);
                if (fechaMin && partidoFecha < new Date(fechaMin)) return false;
                if (fechaMax && partidoFecha > new Date(fechaMax)) return false;
                return true;
            })
            .filter((partido) => {
                // Solo filtrar por etapa si no es "todos"
                if (stage && stage !== "todos" && partido.stage !== stage) return false;
                return true;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Orden ascendente por fecha

        if (partidosDeLiga.length > 0) {
            partidosDeLiga.forEach((partido) => {
                const paisLocal = paises.find((pais) => pais.id === Number(partido.hometeam_id));
                const paisVisitante = paises.find((pais) => pais.id === Number(partido.awayteam_id));

                contenido += `
                    <li class="list-group-item w-100">
                        <div class="text-center" onclick="irAPartido(${partido.league_id}, ${partido.id})" style="cursor: pointer;">
                            <img src="${paisLocal ? paisLocal.flags.png : ''}" alt="${paisLocal ? paisLocal.name.es.common : ''}" width="40" height="20">
                            <span> ${partido.hometeam_score || 0} - ${partido.awayteam_score || 0}</span>
                            <img src="${paisVisitante ? paisVisitante.flags.png : ''}" alt="${paisVisitante ? paisVisitante.name.es.common : ''}" width="40" height="20">
                            <p class="mt-2">${partido.stage} - ${partido.status || 'Por jugar'}</p>
                            <p>Fecha: ${partido.date}  Hora:${partido.time || ''} </p>
                            <p>Lugar: ${partido.stadium || 'Estadio no definido'}</p>
                        </div>
                    </li>`;
            });
        } else {
            contenido += `<li class="list-group-item w-75">No hay partidos disponibles en este rango de fechas o etapa.</li>`;
        }

        contenido += '</ul></div>';

        // Agregar contenido al contenedor principal
        partidosContainer.innerHTML += contenido;
    } catch (error) {
        console.error('Error al mostrar los partidos:', error);
    }
}

function irAPartido(leagueId, matchId) {
    sessionStorage.setItem('leagueId', leagueId);
    sessionStorage.setItem('matchId', matchId);
    window.location.href = '../page_detallePartidos/index.html';
}

// Función para manejar los filtros
function aplicarFiltros() {
    const filtroSeleccionado = document.getElementById('filtro-partidos').value;
    const fechaMinima = document.getElementById('fecha-minima').value;
    const fechaMaxima = document.getElementById('fecha-maxima').value;
    const stageSeleccionado = document.getElementById('filtro-stage').value;
    mostrarPartidosPorLiga(Number(id), filtroSeleccionado, fechaMinima, fechaMaxima, stageSeleccionado);
}

// Eventos para los filtros
document.getElementById('filtro-partidos').addEventListener('change', aplicarFiltros);
document.getElementById('fecha-minima').addEventListener('change', aplicarFiltros);
document.getElementById('fecha-maxima').addEventListener('change', aplicarFiltros);
document.getElementById('filtro-stage').addEventListener('change', aplicarFiltros);

let id;
// Llamar a la función con un ID de liga específico al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    id = sessionStorage.getItem('leagueId');
    console.log(id);
    
    if (id) {
        // Llamar a la función que muestra los partidos para la liga seleccionada
        mostrarPartidosPorLiga(Number(id));
    } else {
        console.error('No se encontró el leagueId en sessionStorage');
    }
});

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}

