const apiRanking = 'https://wc-qualifications-api-production.up.railway.app/api/v1/standings';
const apiPaises = 'https://wc-qualifications-api-production.up.railway.app/api/v1/countries';
const apiLigas = 'https://wc-qualifications-api-production.up.railway.app/api/v1/leagues';
const apiMatches = 'https://wc-qualifications-api-production.up.railway.app/api/v1/matches'; 

const DB_NAME = 'WorldCupData';
const DB_VERSION = 3;
const STORE_NAME = 'DataStore';

// Función para abrir IndexedDB
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);  // Usamos la versión proporcionada

        request.onsuccess = (event) => {
            resolve(event.target.result);  // Resolvemos la promesa con la base de datos abierta
        };

        request.onerror = (event) => {
            reject('Error al abrir la base de datos');  // Rechazamos si ocurre un error
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const oldVersion = event.oldVersion;  // Versión antigua
            const newVersion = event.newVersion;  // Nueva versión
            console.log(`Actualizando base de datos de la versión ${oldVersion} a la versión ${newVersion}`);

            // Obtener los object stores existentes antes de la actualización
            const existingStoresBefore = Array.from(db.objectStoreNames);
            console.log('Object stores existentes antes de la actualización:', existingStoresBefore);

            // Solo crear el store si no existe, sin eliminar los existentes
            if (!existingStoresBefore.includes(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                console.log(`Object store "${STORE_NAME}" creado.`);
            }

            // Obtener los object stores existentes después de la actualización
            const existingStoresAfter = Array.from(db.objectStoreNames);
            console.log('Object stores existentes después de la actualización:', existingStoresAfter);

            // Aquí puedes agregar lógica adicional para manejar la actualización de datos o índices sin eliminar datos
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

async function mostrarPartidosPorLiga(leagueID) {
    try {
        const matches = await obtenerDatosDeAPI(apiMatches, 'matches');
        const countries = await obtenerDatosDeAPI(apiPaises, 'countries');
        const ligas = await obtenerDatosDeAPI(apiLigas, 'ligas');

        const listaMatches = Array.isArray(matches) ? matches : (matches.matches || []);
        const listaPaises = Array.isArray(countries) ? countries : (countries.countries || []);
        const listaLigas = Array.isArray(ligas.leagues) ? ligas.leagues : [];

        // Filtrar solo la liga especificada
        const ligaSeleccionada = listaLigas.find(liga => liga.id === Number(leagueID));

        if (!ligaSeleccionada) {
            console.error('No se pudo encontrar la liga con el ID proporcionado.');
            return;
        }

        const listaPartidosLiga = listaMatches.filter(match => match.league_id === ligaSeleccionada.id);
        
        if (listaPartidosLiga.length === 0) {
            console.error('No hay partidos para la liga seleccionada.');
            return;
        }

        const now = new Date();

        // Filtrar los partidos futuros y ordenarlos por fecha
        const partidos = listaPartidosLiga
            .filter(match => new Date(`${match.date}T${match.time}`) > now)
            .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
            .slice(0, 3); // Solo los 3 más cercanos

        const eliminatoriasDiv = document.querySelector('.eliminatorias');
        eliminatoriasDiv.innerHTML = ''; // Limpiamos cualquier contenido anterior

        // Crear la sección de la liga seleccionada
        const ligaDiv = document.createElement('div');
        ligaDiv.classList.add('liga');
        ligaDiv.innerHTML = `
            <div class="liga-header">
                <img src="${ligaSeleccionada.logo}" alt="Logo de ${ligaSeleccionada.name.es}" class="liga-logo">
                <h2>${ligaSeleccionada.name.es}</h2>
                <div class="mostrar-todo mt-3">
                    <a href="../page_partidosConfederacion/index.html" 
                        class="text-end link-offset-2 link-offset-3-hover link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                        id="mostrar-todo-enlace">
                        <p>Mostrar todo</p>
                    </a>
                </div>
            </div>
        `;
        eliminatoriasDiv.appendChild(ligaDiv);

        if (partidos.length === 0) {
            const mensajeDiv = document.createElement('div');
            mensajeDiv.classList.add('no-partidos');
            mensajeDiv.innerHTML = `<p>No hay partidos futuros programados para la liga ${ligaSeleccionada.name.es}.</p>`;
            ligaDiv.appendChild(mensajeDiv);
        } else {
            const partidosContainer = document.createElement('div');
            partidosContainer.classList.add('partidos-container');

            partidos.forEach(match => {
                const homeTeam = listaPaises.find(pais => parseInt(pais.id) === parseInt(match.hometeam_id));
                const awayTeam = listaPaises.find(pais => parseInt(pais.id) === parseInt(match.awayteam_id));

                if (!homeTeam || !awayTeam) {
                    console.warn(`Equipos no encontrados para el partido ${match.id}`);
                    return;
                }

                const matchDiv = document.createElement('div');
                matchDiv.classList.add('card');

                matchDiv.innerHTML = `
                    <div class="card-content" onclick="irAPartido(${match.league_id}, ${match.id})" style="cursor: pointer;">
                        <h3>${match.stage}</h3>
                        <p><strong>Fecha:</strong> ${new Date(match.date).toLocaleDateString()} ${match.time}</p>
                        <div class="team-info">
                            <img src="${homeTeam.flags.png}" alt="Bandera de ${homeTeam.name.es.common}" class="team-flag">
                            <p class="mt-3"><strong>VS</strong></p>
                            <img src="${awayTeam.flags.png}" alt="Bandera de ${awayTeam.name.es.common}" class="team-flag">
                        </div>
                        <p><strong>Estadio:</strong> ${match.stadium || 'No especificado'}</p>
                        <p><strong>Árbitro:</strong> ${match.referee || 'No especificado'}</p>
                    </div>
                `;

                partidosContainer.appendChild(matchDiv);
            });

            ligaDiv.appendChild(partidosContainer);
        }

        console.log('Partidos cargados correctamente para la liga seleccionada.');
    } catch (error) {
        console.error('Error al mostrar los partidos:', error);
    }
}

function irAPartido(leagueId, matchId) {
    sessionStorage.setItem('leagueId', leagueId);
    sessionStorage.setItem('matchId', matchId);
    window.location.href = '../page_detallePartidos/index.html';
}

// Función para generar las tablas de una confederación específica
async function generarTablas(confederacionId) {
    try {
        // Obtenemos los datos de las ligas, standings y países
        const ligas = await obtenerDatosDeAPI(apiLigas, 'ligas');
        const standings = await obtenerDatosDeAPI(apiRanking, 'standings');
        const paises = await obtenerDatosDeAPI(apiPaises, 'paises');

        // Verifica si ligas.leagues existe y es un array
        const listaLigas = Array.isArray(ligas.leagues) ? ligas.leagues : [];
        if (listaLigas.length === 0) {
            console.error('No se pudo obtener la lista de ligas correctamente.');
            return;
        }

        // Verifica si paises.countries existe y es un array
        const listaPaises = Array.isArray(paises.countries) ? paises.countries : [];
        if (listaPaises.length === 0) {
            console.error('No se pudo obtener la lista de países correctamente.');
            return;
        }

        // Asegúrate de que standings sea un arreglo antes de usarlo
        const listaStandings = Array.isArray(standings) ? standings : (standings.standings || []);
        if (listaStandings.length === 0) {
            console.error('No se pudo obtener la lista de standings correctamente.');
            return;
        }

        // Seleccionamos el div contenedor con la clase 'tabla'
        const contenedorTablas = document.querySelector('.tabla');
        if (!contenedorTablas) {
            console.error('No se encontró el div .tabla');
            return;
        }

        // Filtramos las ligas por la confederación específica
        const ligasFiltradas = listaLigas.filter(liga => liga.id === Number(confederacionId));

        if (ligasFiltradas.length === 0) {
            console.error(`No se encontraron ligas para la confederación con ID ${confederacionId}.`);
            return;
        }

        // Dividimos las ligas por confederación (en este caso solo una)
        const confederaciones = {
            [confederacionId]: {
                nombre: ligasFiltradas[0].confederation_name,  // Nombre de la confederación
                ligas: ligasFiltradas  // Solo las ligas filtradas
            }
        };

        // Iteramos sobre la confederación seleccionada
        for (const confId in confederaciones) {
            const confederacion = confederaciones[confId];

            // Crear el contenedor para las ligas de esta confederación
            const contenedorConfederacion = document.createElement('div');
            contenedorConfederacion.classList.add('confederacion-container');
            contenedorTablas.appendChild(contenedorConfederacion); // Lo añadimos dentro del div .tabla

            // Iteramos sobre las ligas de esta confederación
            confederacion.ligas.forEach((liga) => {
                // Crear el contenedor para la liga
                const contenedorLiga = document.createElement('div');
                contenedorLiga.classList.add('liga-container');
                contenedorConfederacion.appendChild(contenedorLiga); // Lo añadimos dentro del contenedor de la confederación

                // Crear el logo de la liga
                const logoLiga = document.createElement('img');
                logoLiga.src = liga.logo;  // Asegúrate de que liga.logo contenga la URL del logo
                logoLiga.alt = `${liga.confederation_name} logo`;  // Texto alternativo para la imagen
                logoLiga.classList.add('logo-liga');  // Clase para darle estilo

                // Añadir el logo de la liga al contenedor de la liga
                contenedorLiga.appendChild(logoLiga);

                // Crear las tablas por stage dentro de esta liga
                // Obtenemos los stages de standings para esta liga
                const stages = Array.from(new Set(listaStandings.filter(equipo => equipo.league_id === liga.id).map(equipo => equipo.stage)));

                // Iteramos sobre los stages y creamos una sección para cada uno
                stages.forEach((stage) => {
                    // Crear el título para este stage
                    const tituloStage = document.createElement('h4');
                    tituloStage.innerHTML = `Stage: ${stage}`;
                    contenedorLiga.appendChild(tituloStage);

                    // Crear el contenedor para los grupos dentro de este stage
                    const contenedorGrupos = document.createElement('div');
                    contenedorGrupos.classList.add('grupos-container');
                    contenedorLiga.appendChild(contenedorGrupos);

                    const rounds = Array.from(new Set(listaStandings.filter(equipo => equipo.stage === stage && equipo.league_id === liga.id).map(equipo => equipo.round)))
                    .sort((a, b) => parseInt(a) - parseInt(b));

                    // Iteramos sobre los rounds y mostramos las tablas correspondientes
                    rounds.forEach((round) => {
                        // Obtener los grupos dentro de este round
                        const grupos = Array.from(new Set(listaStandings.filter(equipo => equipo.round === round && equipo.stage === stage && equipo.league_id === liga.id).map(equipo => equipo.group)))
                            .sort(); // Orden alfabético de A-Z

                        // Iteramos sobre los grupos y creamos una tabla para cada uno
                        grupos.forEach((grupo) => {
                            // Crear la tabla para este grupo
                            const tabla = document.createElement('table');
                            tabla.classList.add('clasificacion');
                            contenedorGrupos.appendChild(tabla);

                            // Cabecera de la tabla con el nombre del grupo
                            const thead = document.createElement('thead');
                            thead.innerHTML = `
                                <tr>
                                    <th>GRUPO ${grupo}</th>
                                    <th>J</th>
                                    <th>G</th>
                                    <th>E</th>
                                    <th>P</th>
                                    <th>GF</th>
                                    <th>GC</th>
                                    <th>DIF</th>
                                    <th>PTS</th>
                                </tr>
                            `;
                            tabla.appendChild(thead);

                            // Cuerpo de la tabla
                            const tbody = document.createElement('tbody');
                            tabla.appendChild(tbody);

                            // Filtramos los standings que pertenecen a este grupo, stage y round
                            const standingsGrupo = listaStandings.filter((equipo) => equipo.group === grupo && equipo.stage === stage && equipo.round === round && equipo.league_id === liga.id);

                            // Ordenamos los equipos dentro del grupo por su posición (de primero a último)
                            const standingsOrdenados = standingsGrupo.sort((a, b) => a.actual_pos - b.actual_pos);

                            // Iteramos sobre los standings ordenados para este grupo
                            standingsOrdenados.forEach((equipo) => {
                                // Obtener los datos del país usando el country_id con find()
                                const pais = listaPaises.find(pais => pais.id === equipo.country_id);
                                if (!pais) return; // Si no encontramos el país, omitimos este equipo

                                // Crear la fila para el equipo
                                const fila = document.createElement('tr');
                                fila.innerHTML = `
                                    <td class="izquierda">${equipo.actual_pos} <img src="${pais.flags.png}" alt="Bandera" class="bandera"> ${pais.name.en.common}</td>
                                    <td class="centro">${equipo.matches_played}</td>
                                    <td class="centro">${equipo.wins}</td>
                                    <td class="centro">${equipo.draws}</td>
                                    <td class="centro">${equipo.loss}</td>
                                    <td class="centro">${equipo.goals_scored}</td>
                                    <td class="centro">${equipo.goals_against}</td>
                                    <td class="centro">${equipo.goal_difference}</td>
                                    <td class="derecha">${equipo.points}</td>
                                `;
                                tbody.appendChild(fila);
                            });
                        });
                    });
                });
            });
        }
    } catch (error) {
        console.error('Error al generar las tablas:', error);
    }
}

function obtenerParametros() {
    const confederacionId  = sessionStorage.getItem('confederacionId');
    return confederacionId ;
}

async function cargarProcesoClasificacionLiga(leagueID) {
    try {
        const ligas = await obtenerDatosDeAPI(apiLigas, 'ligas');

        const listaLigas = Array.isArray(ligas.leagues) ? ligas.leagues : [];
        if (listaLigas.length === 0) {
            console.error('No se pudo obtener la lista de ligas correctamente.');
            return;
        }

        // Filtrar la liga específica
        const ligaSeleccionada = listaLigas.find(liga => liga.id === Number(leagueID));
        if (!ligaSeleccionada) {
            console.error('No se pudo encontrar la liga con el ID proporcionado.');
            return;
        }

        const contenedorclasificacion = document.querySelector('.info-clasificacion-proceso');
        if (!contenedorclasificacion) {
            console.error('No se encontró el div .info-clasificacion-proceso');
            return;
        }

        // Crear la sección del proceso de clasificación
        const procesoClasificacionDiv = document.createElement('div');
        procesoClasificacionDiv.classList.add('proceso-clasificacion-clasificacion');

        const logoLiga = document.createElement('img');
        logoLiga.src = ligaSeleccionada.logo;
        logoLiga.alt = `Logo de ${ligaSeleccionada.name.es}`;
        logoLiga.classList.add('logo-liga');
        procesoClasificacionDiv.appendChild(logoLiga);

        const titulo = document.createElement('h2');
        titulo.textContent = 'Proceso de clasificación de la '+ligaSeleccionada.alias;
        procesoClasificacionDiv.appendChild(titulo);

        const procesoClasificacion = ligaSeleccionada.qualification_process.es || [];
        procesoClasificacion.forEach(parte => {
            const p = document.createElement('p');
            p.textContent = parte;
            procesoClasificacionDiv.appendChild(p);
        });

        contenedorclasificacion.appendChild(procesoClasificacionDiv);

    } catch (error) {
        console.error('Error al cargar el proceso de clasificación de la liga:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const leagueId = obtenerParametros();
    if (leagueId) {
        cargarProcesoClasificacionLiga(leagueId);
    } else {
        console.error("No se encontró leagueId en sessionStorage");
    }
});

// Obtener los parámetros al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const leagueId = obtenerParametros();
    if (leagueId) {
        mostrarPartidosPorLiga(leagueId);
        generarTablas(leagueId);
    sessionStorage.setItem('leagueId', leagueId);

        console.log("ID recibida: " + leagueId);
    } else {
        console.error("No se encontraron leagueId o matchId en sessionStorage");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const enlace = document.getElementById('mostrar-todo-enlace');
    
    if (enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir la acción predeterminada del enlace
            
            // Llamar a la función con el leagueId desde la liga seleccionada
            window.location.href = '../page_partidosConfederacion/index.html';
        });
    }
});

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}




