const formaciones = {
    "4-3-3": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 35, y: 65 },  // Pivote defensivo
        7: { x: 73.5, y: 65 },    // Interior derecho
        8: { x: 112, y: 65 },    // Interior izquierdo
        9: { x: 27, y: 85 },   // Extremo derecho
        10: { x: 73.5, y: 92 }, // Delantero centro
        11: { x: 120, y: 85 }    // Extremo izquierdo
    },
    "4-2-3-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 43.5, y: 65 },  // Pivote defensivo
        7: { x: 103.5, y: 65 },    // Interior derecho
        8: { x: 35, y: 80 },    // Interior izquierdo
        9: { x: 73.5, y: 80 },   // Extremo derecho
        10: { x: 111, y: 80 }, // Delantero centro
        11: { x: 73.5, y: 97 }    // Extremo izquierdo
    },
    "4-4-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 29, y: 70 },  // Pivote defensivo
        7: { x: 62, y: 70 },    // Interior derecho
        8: { x: 91, y: 70 },    // Interior izquierdo
        9: { x: 118, y: 70 },   // Extremo derecho
        10: { x: 45.5, y: 93 }, // Delantero centro
        11: { x: 104.5, y: 93 }    // Extremo izquierdo
    },
    "5-3-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 20, y: 40 },   // Lateral derecho
        3: { x: 45, y: 40 },    // Central derecho
        4: { x: 73.5, y: 40 },    // Central izquierdo
        5: { x: 102, y: 40 },    // Lateral izquierdo
        6: { x: 127, y: 40 },    // Lateral izquierdo
        7: { x: 30, y: 65 },    // Interior derecho
        8: { x: 73.5, y: 65 },    // Interior izquierdo
        9: { x: 119, y: 65 },   // Extremo derecho
        10: { x: 43, y: 95 }, // Delantero centro
        11: { x: 105, y: 95 }    // Extremo izquierdo
    },
    "5-4-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 50.25, y: 40 },    // Central derecho
        4: { x: 73.5, y: 40 },    // Central izquierdo
        5: { x: 96.75, y: 40 },    // Lateral izquierdo
        6: { x: 120, y: 40 },  // Pivote defensivo
        7: { x: 30, y: 70 },    // Interior derecho
        8: { x: 61.875, y: 70 },    // Interior izquierdo
        9: { x: 93.75, y: 70 },   // Extremo derecho
        10: { x: 118, y: 70 }, // Delantero centro
        11: { x: 73.5, y: 95 }    // Extremo izquierdo
    },
    "3-4-3": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 31, y: 40 },   // Lateral derecho
        3: { x: 73.5, y: 40 },    // Central derecho
        4: { x: 117, y: 40 },    // Central izquierdo
        5: { x: 27, y: 65 },    // Lateral izquierdo
        6: { x: 55, y: 65 },  // Pivote defensivo
        7: { x: 91, y: 65 },    // Interior derecho
        8: { x: 120, y: 65 },    // Interior izquierdo
        9: { x: 30, y: 93 },   // Extremo derecho
        10: { x: 73.5, y: 93 }, // Delantero centro
        11: { x: 117, y: 93 }    // Extremo izquierdo
    },
    "3-5-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 31, y: 40 },   // Lateral derecho
        3: { x: 73.5, y: 40 },    // Central derecho
        4: { x: 117, y: 40 },    // Central izquierdo
        5: { x: 25, y: 65 },    // Lateral izquierdo
        6: { x: 51, y: 65 },  // Pivote defensivo
        7: { x: 73.5, y: 65 },    // Interior derecho
        8: { x: 97, y: 65 },    // Interior izquierdo
        9: { x: 123, y: 65 },   // Extremo derecho
        10: { x: 47, y: 93 }, // Delantero centro
        11: { x: 101, y: 93 }    // Extremo izquierdo
    },
    "3-1-4-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 31, y: 40 },   // Lateral derecho
        3: { x: 73.5, y: 40 },    // Central derecho
        4: { x: 117, y: 40 },    // Central izquierdo
        5: { x: 25, y: 70 },    // Lateral izquierdo
        6: { x: 51, y: 65 },  // Pivote defensivo
        7: { x: 73.5, y: 60 },    // Interior derecho
        8: { x: 97, y: 65 },    // Interior izquierdo
        9: { x: 123, y: 70 },   // Extremo derecho
        10: { x: 68, y: 93 }, // Delantero centro
        11: { x: 79, y: 93 }    // Extremo izquierdo
    },
    "4-5-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 25, y: 70 },    // Lateral izquierdo
        7: { x: 51, y: 70 },  // Pivote defensivo
        8: { x: 73.5, y: 70 },    // Interior derecho
        9: { x: 97, y: 70 },    // Interior izquierdo
        10: { x: 123, y: 70 },   // Extremo derecho
        11: { x: 73.5, y: 92 }    // Extremo izquierdo
    },
    "4-1-4-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 110, y: 40 },    // Lateral derecho
        3: { x: 87, y: 40 },     // Central derecho
        4: { x: 60, y: 40 },     // Central izquierdo
        5: { x: 37, y: 40 },     // Lateral izquierdo
        6: { x: 25, y: 73 },    // Lateral izquierdo
        7: { x: 58, y: 70 },  // Pivote defensivo
        8: { x: 73.5, y: 65 },    // Interior derecho
        9: { x: 89, y: 70 },    // Interior izquierdo
        10: { x: 123, y: 73 },   // Extremo derecho
        11: { x: 73.5, y: 95 }    // Extremo izquierdo
    },
    "4-1-2-1-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 73.5, y: 55 },  // Pivote defensivo
        7: { x: 43.5, y: 65 },    // Interior derecho
        8: { x: 103.5, y: 65 },    // Interior izquierdo
        9: { x: 73.5, y: 78 },   // Extremo derecho
        10: { x: 43.5, y: 95 }, // Delantero centro
        11: { x: 103.5, y: 95 }    // Extremo izquierdo
    },
    "4-1-2-3": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 73.5, y: 65 },  // Pivote defensivo
        7: { x: 43.5, y: 70 },    // Interior derecho
        8: { x: 103.5, y: 70 },    // Interior izquierdo
        9: { x: 30, y: 90 },   // Extremo derecho
        10: { x: 73.5, y: 95 }, // Delantero centro
        11: { x: 118, y: 90 }    // Extremo izquierdo
    },
    "5-2-3": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 20, y: 48 },   // Lateral derecho
        3: { x: 45, y: 40 },    // Central derecho
        4: { x: 73.5, y: 40 },    // Central izquierdo
        5: { x: 102, y: 40 },    // Lateral izquierdo
        6: { x: 127, y: 48 },    // Lateral izquierdo
        7: { x: 59.25, y: 70 },    // Interior derecho
        8: { x: 87.75, y: 70 },    // Interior izquierdo
        9: { x: 45, y: 90 },   // Extremo derecho
        10: { x: 73.5, y: 95 }, // Delantero centro
        11: { x: 102, y: 90 }    // Extremo izquierdo
    },
    "3-4-2-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 31, y: 40 },   // Lateral derecho
        3: { x: 73.5, y: 40 },    // Central derecho
        4: { x: 117, y: 40 },    // Central izquierdo
        5: { x: 27, y: 65 },    // Lateral izquierdo
        6: { x: 55, y: 65 },  // Pivote defensivo
        7: { x: 91, y: 65 },    // Interior derecho
        8: { x: 120, y: 65 },    // Interior izquierdo
        9: { x: 41, y: 80 },   // Extremo derecho
        10: { x: 105.5, y: 80 }, // Delantero centro
        11: { x: 73.5, y: 93 }    // Extremo izquierdo
    },
    "3-4-1-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 120, y: 40 },    // Lateral derecho
        3: { x: 87, y: 40 },     // Central derecho
        4: { x: 60, y: 40 },     // Central izquierdo
        5: { x: 27, y: 40 },     // Lateral izquierdo
        6: { x: 60, y: 70 },     // Centrocampista defensivo
        7: { x: 87, y: 70 },     // Centrocampista central
        8: { x: 120, y: 85 },    // Centrocampista izquierdo
        9: { x: 60, y: 100 },    // Extremo derecho
        10: { x: 73.5, y: 105 }, // Delantero centro
        11: { x: 120, y: 105 }   // Delantero centro
    },
    "4-3-2-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 62, y: 65 },  // Pivote defensivo
        7: { x: 73.5, y: 65 },    // Interior derecho
        8: { x: 86, y: 65 },    // Interior izquierdo
        9: { x: 60, y: 85 },   // Extremo derecho
        10: { x: 73.5, y: 95 }, // Delantero centro
        11: { x: 88, y: 85 }    // Extremo izquierdo
    },
    "4-2-2-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 29, y: 75 },  // Pivote defensivo
        7: { x: 63, y: 70 },    // Interior derecho
        8: { x: 84, y: 70 },    // Interior izquierdo
        9: { x: 118, y: 75 },   // Extremo derecho
        10: { x: 62, y: 95 }, // Delantero centro
        11: { x: 85, y: 95 }    // Extremo izquierdo
    },
    "4-1-3-2": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 37, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 110, y: 40 },    // Lateral izquierdo
        6: { x: 73.5, y: 58 },  // Pivote defensivo
        7: { x: 27, y: 70 },    // Interior derecho
        8: { x: 73.5, y: 70 },    // Interior izquierdo
        9: { x: 120, y: 70 },   // Extremo derecho
        10: { x: 64, y: 95 }, // Delantero centro
        11: { x: 84, y: 95 }    // Extremo izquierdo
    },
    "4-4-1-1": {
        1: { x: 73.5, y: 20 },   // Portero
        2: { x: 27, y: 40 },   // Lateral derecho
        3: { x: 60, y: 40 },    // Central derecho
        4: { x: 87, y: 40 },    // Central izquierdo
        5: { x: 120, y: 40 },    // Lateral izquierdo
        6: { x: 29, y: 65 },  // Pivote defensivo
        7: { x: 62, y: 65 },    // Interior derecho
        8: { x: 91, y: 65 },    // Interior izquierdo
        9: { x: 118, y: 65 },   // Extremo derecho
        10: { x: 73.5, y: 80 }, // Delantero centro
        11: { x: 73.5, y: 95 }    // Extremo izquierdo
    },
};


// Función para abrir la base de datos IndexedDB
function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('wcData', 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            db.createObjectStore('partidos', { keyPath: 'id' });
            db.createObjectStore('paises', { keyPath: 'id' });
            db.createObjectStore('ligas', { keyPath: 'id' });
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Error al abrir la base de datos: ' + event.target.errorCode);
        };
    });
}

// Función para guardar datos en IndexedDB
function guardarDatos(storeName, data) {
    abrirBaseDatos().then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        data.forEach(item => {
            store.put(item);
        });

        tx.oncomplete = function() {
            console.log(`Datos guardados en el almacén ${storeName}`);
        };

        tx.onerror = function(event) {
            console.error('Error al guardar los datos:', event.target.errorCode);
        };
    });
}

// Función para obtener datos de IndexedDB
function obtenerDatos(storeName) {
    return new Promise((resolve, reject) => {
        abrirBaseDatos().then(db => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = function() {
                resolve(request.result);
            };

            request.onerror = function(event) {
                reject('Error al obtener los datos: ' + event.target.errorCode);
            };
        });
    });
}

// Función para cargar los datos de las APIs o de IndexedDB
function cargarDatos() {
    // Intentar obtener los datos de IndexedDB primero
    Promise.all([obtenerDatos('partidos'), obtenerDatos('paises'), obtenerDatos('ligas')])
        .then(([partidos, paises, ligas]) => {
            if (partidos.length > 0 && paises.length > 0 && ligas.length > 0) {
                console.log('Datos cargados desde IndexedDB');
                renderizarPartidos({ matches: partidos }, { countries: paises }, { leagues: ligas });
            } else {
                // Si no hay datos en IndexedDB, hacer las peticiones
                console.log('Haciendo peticiones a las APIs...');
                fetchDatosDeAPIs();
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de IndexedDB:', error);
            // Si hay algún error, hacer las peticiones
            fetchDatosDeAPIs();
        });
}

// Función para hacer las peticiones a las APIs
function fetchDatosDeAPIs() {
    const urlPartidos = 'https://wc-qualifications-api-production.up.railway.app/api/v1/matches';
    const urlPaises = 'https://wc-qualifications-api-production.up.railway.app/api/v1/countries';
    const urlLigas = 'https://wc-qualifications-api-production.up.railway.app/api/v1/leagues';

    Promise.all([fetch(urlPartidos), fetch(urlPaises), fetch(urlLigas)])
        .then(responses => {
            if (!responses[0].ok || !responses[1].ok || !responses[2].ok) {
                throw new Error('Error en la respuesta de las APIs');
            }
            return Promise.all([responses[0].json(), responses[1].json(), responses[2].json()]);
        })
        .then(data => {
            const partidos = data[0].matches;
            const paises = data[1].countries;
            const ligas = data[2].leagues;

            // Guardar los datos en IndexedDB
            guardarDatos('partidos', partidos);
            guardarDatos('paises', paises);
            guardarDatos('ligas', ligas);

            // Renderizar los datos
            renderizarPartidos(data[0], data[1], data[2]);
        })
        .catch(error => {
            console.error('Hubo un error:', error);
        });
}

// Función para renderizar los partidos (igual que antes)
function renderizarPartidos(partidos, paises, ligas) {
    const listaPartidos = partidos.matches || [];
    const listaPaises = paises.countries || [];
    const listaLigas = ligas.leagues || [];

    if (!Array.isArray(listaPartidos) || !Array.isArray(listaPaises) || !Array.isArray(listaLigas)) {
        console.error("Los datos de partidos, países o ligas no están en el formato esperado");
        return;
    }

    const partidosContainer = document.getElementById('partidos-container');
    partidosContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos partidos

    listaPartidos.forEach(partido => {
        const equipo1 = listaPaises.find(pais => pais.id === Number(partido.hometeam_id));
        const equipo2 = listaPaises.find(pais => pais.id === Number(partido.awayteam_id));
        const confederacion = listaLigas.find(liga => liga.id === Number(partido.league_id));

        const partidoHTML = `
            <section class="info-partido text-center mb-4">
                <h2 class="mb-3 subtitulos">${confederacion ? confederacion.name.es : 'Confederación no disponible'} (${partido.date})</h2>
                <span class="arbitro"><i class="fas fa-whistle"></i> Árbitro: ${partido.referee || 'Desconocido'}</span>
                <span class="hora"><i class="fas fa-clock"></i> ${partido.time || 'Hora no especificada'}</span>
                <span class="ronda"><i class="fas fa-trophy"></i> ${partido.stage || 'Ronda no especificada'}</span>
                <div class="equipos d-flex justify-content-between align-items-center">
                    <div class="equipo text-center">
                        <img src="${equipo1 ? equipo1.flags.png : ''}" alt="${equipo1 ? equipo1.name.en.common : 'Equipo Local'}">
                        <p>${equipo1 ? equipo1.name.en.common : 'Equipo Local'}</p>
                    </div>
                    <div class="marcador">${partido.hometeam_score ? partido.hometeam_score : 'N/A'} - ${partido.awayteam_score ? partido.awayteam_score : 'N/A'} <br>
                        <span class="info-partido text-center confederacion">
                            <img src="${confederacion ? confederacion.logo : ''}" alt="${confederacion ? confederacion.name.es : 'Logo de Confederación'}" class="logo-confederacion">
                        </span>
                    </div>
                    <div class="equipo text-center">
                        <img src="${equipo2 ? equipo2.flags.png : ''}" alt="${equipo2 ? equipo2.name.en.common : 'Equipo Visitante'}">
                        <p>${equipo2 ? equipo2.name.en.common : 'Equipo Visitante'}</p>
                    </div>
                </div>
                <p class="mt-3">${partido.status || 'Estado desconocido'}</p>
            </section>
        `;
        // Por si se te olvida Samuel
        //partidosContainer.innerHTML += partidoHTML;
        partidosContainer.innerHTML = partidoHTML;

        // Llamamos a la función para renderizar las estadísticas del partido
        renderizarEstadisticas(partido, equipo1, equipo2);
        cargarAlineaciones(partido,equipo1, equipo2)
    });
}

function renderizarEstadisticas(partido, equipo1, equipo2) {
    const contenedorPartidos = document.getElementById('estadisticas');

    // Verificar si el contenedor de estadísticas existe
    if (!contenedorPartidos) {
        console.error("No se encontró la sección de estadísticas.");
        return;
    }

    // Obtener las estadísticas del partido
    const stats = partido.statistics || [];

    // Obtener las estadísticas para cada tipo (si existe) o asignar 'X' si no se encuentra
    const remates = stats.find(stat => stat.type.es === "Remates")?.home || 'N/A';
    const rematesArco = stats.find(stat => stat.type.es === "Remates al arco")?.home || 'N/A';
    const posesion = stats.find(stat => stat.type.es === "Posesión")?.home || 'N/A';
    const pases = stats.find(stat => stat.type.es === "Pases")?.home || 'N/A';
    const precisionPases = stats.find(stat => stat.type.es === "Precisión de los pases")?.home || 'N/A';
    const faltas = stats.find(stat => stat.type.es === "Faltas")?.home || 'N/A';
    const tarjetasAmarillas = stats.find(stat => stat.type.es === "Tarjetas amarillas")?.home || 'N/A';
    const tarjetasRojas = stats.find(stat => stat.type.es === "Tarjetas rojas")?.home || 'N/A';
    const posicionAdelantada = stats.find(stat => stat.type.es === "Posición adelantada")?.home || 'N/A';
    const tirosEsquina = stats.find(stat => stat.type.es === "Tiros de esquina")?.home || 'N/A';

    // Crear la estructura HTML dentro de la sección
    contenedorPartidos.innerHTML = `
        <div class="encabezado-estadisticas">
            <div class="imagenes-titulo">
                <div class="columna columna-izquierda">
                    <img src="${equipo1 ? equipo1.flags.png : ''}" alt="Bandera ${equipo1 ? equipo1.name.en.common : 'Equipo Local'}" class="imagen-columna">
                </div>
                <div class="titulo-estadisticas-centro">
                    <h2 class="mb-3 subtitulos">ESTADÍSTICAS DEL EQUIPO</h2>
                </div>
                <div class="columna columna-derecha">
                    <img src="${equipo2 ? equipo2.flags.png : ''}" alt="Bandera ${equipo2 ? equipo2.name.en.common : 'Equipo Visitante'}" class="imagen-columna">
                </div>
            </div>
        </div>
        <div class="contenido-estadisticas">
            <div class="columna-izquierda">
                <ul>
                    <li>${remates}</li>
                    <li>${rematesArco}</li>
                    <li>${posesion}</li>
                    <li>${pases}</li>
                    <li>${precisionPases}</li>
                    <li>${faltas}</li>
                    <li>${tarjetasAmarillas}</li>
                    <li>${tarjetasRojas}</li>
                    <li>${posicionAdelantada}</li>
                    <li>${tirosEsquina}</li>
                </ul>
            </div>
            <div class="columna etiquetas">
                <ul class="etiquetas">
                    <li>Remates</li>
                    <li>Remates al arco</li>
                    <li>Posesión</li>
                    <li>Pases</li>
                    <li>Precisión de los pases</li>
                    <li>Faltas</li>
                    <li>Tarjetas amarillas</li>
                    <li>Tarjetas rojas</li>
                    <li>Posición adelantada</li>
                    <li>Tiros de esquina</li>
                </ul>
            </div>
            <div class="columna-derecha">
                <ul>
                    <li>${stats.find(stat => stat.type.es === "Remates")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Remates al arco")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Posesión")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Pases")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Precisión de los pases")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Faltas")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Tarjetas amarillas")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Tarjetas rojas")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Posición adelantada")?.away || 'N/A'}</li>
                    <li>${stats.find(stat => stat.type.es === "Tiros de esquina")?.away || 'N/A'}</li>
                </ul>
            </div>
        </div>
    `;
}

function cargarAlineaciones(partido, equipo1, equipo2) {
    const contenedorAlineaciones = document.getElementById('alineaciones');

    if (!contenedorAlineaciones) {
        console.error("No se encontró el contenedor de alineaciones.");
        return;
    }

    // Limpiar el contenedor de alineaciones antes de agregar el partido seleccionado
    contenedorAlineaciones.innerHTML = '';  // Borra todo el contenido anterior

    const contenedorPartido = document.createElement('div');
    contenedorPartido.classList.add('partido');
    contenedorPartido.style.position = 'relative';

    // Información del equipo 1
    const informacionEquipo1 = document.createElement('div');
    informacionEquipo1.classList.add('informacion-equipo');
    informacionEquipo1.innerHTML = `
        <div class="pais">
            <img src="${equipo1.flags.png}" alt="Bandera de ${equipo1.name.es.common}" class="bandera">
            <span class="nombre-pais">${equipo1.fifa}</span>
        </div>
        <div class="formacion">
            ${partido?.lineups?.hometeam?.system || 'No disponible'}
        </div>
    `;
    contenedorPartido.appendChild(informacionEquipo1);

    // Imagen de fondo de alineaciones
    const imagenAlineaciones = document.createElement('img');
    imagenAlineaciones.src = 'img/8083862_1137.jpg';
    imagenAlineaciones.alt = 'Imagen de alineaciones';
    imagenAlineaciones.classList.add('img-fluid');
    imagenAlineaciones.style.width = '100%';
    imagenAlineaciones.style.height = 'auto';
    imagenAlineaciones.style.position = 'relative';

    const contenedorJugadores = document.createElement('div');
    contenedorJugadores.style.position = 'absolute';
    contenedorJugadores.style.top = '0';
    contenedorJugadores.style.left = '0';
    contenedorJugadores.style.width = '100%';
    contenedorJugadores.style.height = '100%';
    contenedorJugadores.style.pointerEvents = 'none';

    const jugadoresEquipo1 = partido?.lineups?.hometeam?.starting_players || [];
    const jugadoresEquipo2 = partido?.lineups?.awayteam?.starting_players || [];

    if (jugadoresEquipo1.length === 11) {
        jugadoresEquipo1.forEach(jugador => {
            const jugadorElemento = crearJugador(jugador, true, partido?.lineups?.hometeam?.system || 'No disponible');
            contenedorJugadores.appendChild(jugadorElemento);
        });
    } else {
        mostrarMensajeNoDisponible(contenedorJugadores, true);
    }

    if (jugadoresEquipo2.length === 11) {
        jugadoresEquipo2.forEach(jugador => {
            const jugadorElemento = crearJugador(jugador, false, partido?.lineups?.awayteam?.system || 'No disponible');
            contenedorJugadores.appendChild(jugadorElemento);
        });
    } else {
        mostrarMensajeNoDisponible(contenedorJugadores, false);
    }

    contenedorPartido.appendChild(imagenAlineaciones);
    contenedorPartido.appendChild(contenedorJugadores);

    // Información del equipo 2
    const informacionEquipo2 = document.createElement('div');
    informacionEquipo2.classList.add('informacion-equipo');
    informacionEquipo2.innerHTML = `
        <div class="pais">
            <img src="${equipo2.flags.png}" alt="Bandera de ${equipo2.name.es.common}" class="bandera">
            <span class="nombre-pais">${equipo2.fifa}</span>
        </div>
        <div class="formacion">
            ${partido?.lineups?.awayteam?.system || 'No disponible'}
        </div>
    `;
    contenedorPartido.appendChild(informacionEquipo2);

     // Renderizar suplentes en la sección correcta
     const contenedorSuplentes = document.getElementById('suplentes');
     if (contenedorSuplentes) {
        contenedorSuplentes.innerHTML = '';  // Limpiar cualquier contenido previo
        renderizarSuplentes(partido, equipo1, equipo2, contenedorSuplentes);
     } 

     // Renderizar directores técnicos en la sección correcta
     const contenedorDirectores = document.getElementById('directores-tecnicos');
     if (contenedorDirectores) {
        contenedorDirectores.innerHTML = '';  // Limpiar cualquier contenido previo
        cargarDirectoresTecnicos(partido, contenedorDirectores);
     }

    // Renderizar lugar
    const contenedorLugar = document.createElement('div');
    contenedorPartido.appendChild(contenedorLugar);
    renderizarLugar(partido);

    // Agregar contenedorPartido al contenedorAlineaciones
    contenedorAlineaciones.appendChild(contenedorPartido);
}

function obtenerCoordenadas(posicion, esEquipoLocal, formacion) {
     // Verificar si la formación seleccionada existe
     if (!formaciones[formacion]) {
        console.error(`Formación ${formacion} no encontrada.`);
        return { x: 76, y: 108 }; // Coordenadas por defecto
    }

    // Obtener las coordenadas para el equipo local o visitante
    let posiciones = formaciones[formacion];

    // Si es el equipo visitante, reflejamos las coordenadas sobre el eje
    if (!esEquipoLocal) {
        posiciones = Object.keys(posiciones).reduce((map, key) => {
            const coord = posiciones[key];
            map[key] = {
                x: 152 - coord.x - 4.5,  // Reflejo sobre el eje central
                y: 215 - coord.y - 5     // Reflejo sobre el eje central
            };
            return map;
        }, {});
    }

    // Obtener la coordenada del jugador según su ID
    const coordenada = posiciones[posicion] || { x: 76, y: 108 }; // Coordenadas por defecto

    // Convertir coordenadas absolutas a porcentajes (en base a un campo de 152x215)
    return {
        x: (coordenada.x / 152) * 100,
        y: (coordenada.y / 215) * 100
    };
}

function crearJugador(jugador, esEquipoLocal, formacion) {
    const jugadorElement = document.createElement('div');
    jugadorElement.classList.add('jugador');

    // Calcular las posiciones relativas en porcentaje sobre la imagen
    const coordenadas = obtenerCoordenadas(jugador.player_position, esEquipoLocal, formacion);
    jugadorElement.style.position = 'absolute';
    jugadorElement.style.left = `${coordenadas.x}%`;
    jugadorElement.style.top = `${coordenadas.y}%`;

    // Asignar clase según el equipo (local o visitante)
    const equipoClass = esEquipoLocal ? 'equipo-local' : 'equipo-visitante';
    jugadorElement.classList.add(equipoClass);

    jugadorElement.innerHTML = `
        <div class="jugador">
            <div class="jugador-circulo">
                <span class="numero-jugador">${jugador.player_number}</span>
            </div>
            <span class="nombre-jugador">${jugador.player_name}</span>
        </div>
    `;

    // Estilo del círculo
    jugadorElement.style.zIndex = 10;
    return jugadorElement;
}

function mostrarMensajeNoDisponible(contenedor, esEquipoLocal) {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-no-disponible');
    mensaje.innerText = 'La alineación no está disponible.';
    mensaje.style.position = 'absolute';
    mensaje.style.width = '100%'; // Ocupa el 100% del ancho del contenedor
    mensaje.style.textAlign = 'center';
    mensaje.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    mensaje.style.color = 'white';
    mensaje.style.padding = '10px 20px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.zIndex = 100;
    mensaje.style.left = '0'; // Alineado al borde izquierdo para ocupar toda la anchura

    // Mostrar en la mitad superior o inferior
    if (esEquipoLocal) {
        mensaje.style.top = '30%'; // Mitad superior
    } else {
        mensaje.style.top = '70%'; // Mitad inferior
    }

    contenedor.appendChild(mensaje);
}

function renderizarSuplentes(partido, equipo1, equipo2, contenedorSuplentes) {

    if (!contenedorSuplentes) {
        console.error("No se encontró la sección de suplentes.");
        return;
    }

    // Bandera de los equipos
    const banderaEquipoLocal = equipo1?.flags?.png || ''; // Bandera equipo local
    const banderaEquipoVisitante = equipo2?.flags?.png || ''; // Bandera equipo visitante

    // Obtener los suplentes de ambos equipos desde la API
    const suplentesEquipoLocal = partido.lineups.hometeam.substitutes || [];
    const suplentesEquipoVisitante = partido.lineups.awayteam.substitutes || [];

    // Si ambos equipos no tienen suplentes, mostrar el mensaje
    if (suplentesEquipoLocal.length === 0 && suplentesEquipoVisitante.length === 0) {
        contenedorSuplentes.innerHTML = '<p>No se encontraron suplentes para este partido.</p>';
        return; // Salir de la función si no hay suplentes
    }

    // Crear el encabezado con banderas para los suplentes
    const encabezadoSuplentes = document.createElement('div');
    encabezadoSuplentes.classList.add('encabezado-suplentes');
    encabezadoSuplentes.innerHTML = `
        <div class="columna">
            <img src="${banderaEquipoLocal}" alt="Bandera local" class="imagen-columna">
        </div>
        <div class="titulo-estadisticas-centro">
            <h2 class="mb-3 subtitulos">SUPLENTES</h2>
        </div>
        <div class="columna">
            <img src="${banderaEquipoVisitante}" alt="Bandera visitante" class="imagen-columna">
        </div>
    `;

    // Contenedor para las listas de suplentes
    const contenedorListasSuplentes = document.createElement('div');
    contenedorListasSuplentes.classList.add('contenedor-suplentes');

    // Crear las columnas para cada equipo
    const columnaIzquierda = document.createElement('div');
    columnaIzquierda.classList.add('columna-suplentes', 'izquierda');
    const columnaDerecha = document.createElement('div');
    columnaDerecha.classList.add('columna-suplentes', 'derecha');

    // Generar la lista de suplentes para el equipo local
    let listaHTMLIzquierda = `<ul>`;
    if (suplentesEquipoLocal.length === 0) {
        listaHTMLIzquierda += `
            <li class="jugadorS">
                <span class="nombre-jugadorS">N/A</span>
                <div class="numero-jugadorS">N/A</div>
            </li>
        `;
    } else {
        suplentesEquipoLocal.forEach(suplente => {
            listaHTMLIzquierda += `
                <li class="jugadorS">
                    <div class="numero-jugadorS">${suplente.player_number}</div>
                    <span class="nombre-jugadorS">${suplente.player_name || 'N/A'}</span>
                </li>
            `;
        });
    }
    listaHTMLIzquierda += `</ul>`;

    // Generar la lista de suplentes para el equipo visitante
    let listaHTMLDerecha = `<ul>`;
    if (suplentesEquipoVisitante.length === 0) {
        listaHTMLDerecha += `
            <li class="jugadorS">
                <span class="nombre-jugadorS">N/A</span>
            </li>
        `;
    } else {
        suplentesEquipoVisitante.forEach(suplente => {
            listaHTMLDerecha += `
                <li class="jugadorS">
                    <span class="nombre-jugadorS">${suplente.player_name || 'N/A'}</span>
                    <div class="numero-jugadorS">${suplente.player_number}</div>
                </li>
            `;
        });
    }
    listaHTMLDerecha += `</ul>`;

    // Agregar las listas HTML a sus respectivas columnas
    columnaIzquierda.innerHTML = listaHTMLIzquierda;
    columnaDerecha.innerHTML = listaHTMLDerecha;

    // Agregar las columnas al contenedor de suplentes
    contenedorListasSuplentes.appendChild(columnaIzquierda);
    contenedorListasSuplentes.appendChild(columnaDerecha);

    // Agregar el encabezado y el contenedor de suplentes a la sección
    contenedorSuplentes.appendChild(encabezadoSuplentes);
    contenedorSuplentes.appendChild(contenedorListasSuplentes);
}

function cargarDirectoresTecnicos(partido, contenedorDirectores) {

    if (!contenedorDirectores) {
        console.error("No se encontró la sección de directores técnicos.");
        return;
    }

    // Obtener nombres de los directores técnicos
    const directorTecnicoLocal = partido.lineups.hometeam.coach || 'No especificado';
    const directorTecnicoVisitante = partido.lineups.awayteam.coach || 'No especificado';

    // Crear el contenido de la sección
    const contenidoDirectores = `
        
        <div class="titulo-directores">Director Técnico</div>
        <div class="nombre-equipo izquierda">${directorTecnicoLocal}</div>
        <div class="nombre-equipo derecha">${directorTecnicoVisitante}</div>
    `;

    // Reemplazar el contenido del contenedor con la nueva información
    contenedorDirectores.innerHTML = contenidoDirectores;
}

function renderizarLugar(partido) {
    const contenedorLugar = document.getElementById('nombre-lugar');

    if (!contenedorLugar) {
        console.error("No se encontró el contenedor para el lugar del partido.");
        return;
    }

    // Limpiar el contenido del contenedor
    contenedorLugar.innerHTML = '';

    // Crear el elemento para mostrar el lugar
    const lugarHTML = document.createElement('p');
    lugarHTML.classList.add('lugar');
    lugarHTML.innerHTML = `
        <strong>Lugar:</strong> <span class="texto-gris">${partido.stadium || 'Información no disponible'}</span>
    `;

    // Agregar el elemento al contenedor
    contenedorLugar.appendChild(lugarHTML);
}

// Llamar a cargarDatos cuando la página esté completamente cargada
document.addEventListener("DOMContentLoaded", cargarDatos);

document.querySelectorAll('.titulo').forEach(function(titulo) {
    titulo.addEventListener('click', function() {
        // Remover la clase 'clicked' de todos los títulos
        document.querySelectorAll('.titulo').forEach(function(t) {
            t.classList.remove('clicked');
        });

        // Añadir la clase 'clicked' solo al título clicado
        this.classList.add('clicked');

        // Mostrar/ocultar el contenido relacionado
        const idRelacionada = this.getAttribute('data-target'); // Obtener el objetivo del atributo 'data-target'
        document.querySelectorAll('.contenido').forEach(function(contenido) {
            if (contenido.id === idRelacionada) {
                contenido.style.display = 'block'; // Mostrar el contenido relacionado
            } else {
                contenido.style.display = 'none'; // Ocultar el contenido no relacionado
            }
        });

        // Si se hace clic en "Alineaciones", mostrar también los suplentes y directores técnicos
        if (idRelacionada === 'alineaciones') {
            document.getElementById('suplentes').style.display = 'block';
            document.getElementById('directores-tecnicos').style.display = 'block';
        } else {
            document.getElementById('suplentes').style.display = 'none';
            document.getElementById('directores-tecnicos').style.display = 'none';
        }
    });
});


