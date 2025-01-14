function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        // Establece la versión más alta que quieres usar
        const requestedVersion = 3;  // O la versión más actual que necesitas
        const request = indexedDB.open('wcData', requestedVersion); 

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            const oldVersion = event.oldVersion;  // Obtén la versión antigua

            console.log(`Actualizando base de datos de la versión ${oldVersion} a la versión ${event.newVersion}`);

            // Solo necesitamos comprobar si el store "partidos" existe y crearlo si es necesario
            const existingStores = Array.from(db.objectStoreNames);
            console.log('Object stores existentes antes de la actualización:', existingStores);

            if (oldVersion < 1) {
                // Si la versión es 1 o menor, crear el object store de "partidos" solo si no existe
                if (!existingStores.includes('partidos')) {
                    db.createObjectStore('partidos', { keyPath: 'id' });
                    console.log('Object store "partidos" creado.');
                }
            }

            // Aquí puedes añadir más condiciones para futuras versiones si es necesario
            // Por ejemplo, si quieres actualizar o añadir otros objectStores
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            const error = event.target.error || event.target.errorCode;
            console.error('Error al abrir la base de datos:', error);
            reject('Error al abrir la base de datos: ' + error);
        };
    });
}

function obtenerDatos(storeName) {
    return new Promise((resolve, reject) => {
        abrirBaseDatos().then(db => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function (event) {
                reject('Error al obtener los datos: ' + event.target.errorCode);
            };
        });
    });
}

async function guardarDatos(storeName, data) {
    try {
        const db = await abrirBaseDatos();
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        // Añadir un campo id si no existe
        const dataWithId = data.map((item, index) => ({
            ...item,
            id: item.id || index  // Si no tiene un id, usa el índice como id único
        }));

        dataWithId.forEach(item => {
            store.put(item);
        });

        // Asegurar que la transacción se complete correctamente
        tx.oncomplete = () => {
            console.log(`Datos guardados correctamente en ${storeName}`);
        };

        tx.onerror = (event) => {
            console.error('Error al guardar los datos en IndexedDB:', event.target.errorCode);
        };
    } catch (error) {
        console.error('Error al acceder a la base de datos:', error);
    }
}

function cargarPartidos() {
    const url = 'https://wc-qualifications-api-production.up.railway.app/api/v1/matches';
    
    obtenerDatos('partidos')
        .then(datos => {
            console.log('Datos obtenidos desde IndexedDB:', datos); // Verifica la estructura aquí
            if (datos && datos.length > 0) {
                console.log('Partidos cargados desde IndexedDB:', datos);
                mostrarPartidos(datos);
            } else {
                console.log('No se encontraron partidos en IndexedDB. Cargando desde la API...');
                fetchPartidosDeAPI();
            }
        })
        .catch(error => {
            console.error('Error al cargar partidos desde IndexedDB:', error);
            console.log('Cargando partidos desde la API...');
            fetchPartidosDeAPI();
        });

    function fetchPartidosDeAPI() {
        const contenedorPartidos = document.querySelector('#proximos-partidos .cuadro-partidos');
        
        console.log('Cargando partidos desde la API...'); // Mensaje de depuración

        fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`Error en la solicitud: ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then(data => {
                console.log('Datos obtenidos desde la API:', data); // Verificar la estructura de los datos
                const partidos = data.matches;
                if (partidos && partidos.length > 0) {
                    guardarDatos('partidos', partidos); // Guardar en IndexedDB
                    mostrarPartidos(partidos); // Mostrar en el DOM
                } else {
                    console.log('No hay partidos disponibles en la API.');
                    contenedorPartidos.innerHTML = '<p class="text-center text-warning">No hay partidos disponibles en la API.</p>';
                }
            })
            .catch(error => {
                console.error('Error al cargar los partidos desde la API:', error);
                contenedorPartidos.innerHTML = '<p class="text-center text-danger">Error al cargar los partidos. Intenta nuevamente más tarde.</p>';
            });
    }
}


async function obtenerBanderaPorID(countryID) { 
    // Obtener las banderas de IndexedDB
    const paises = await obtenerDatos('banderas');
    
    // Buscar la bandera en IndexedDB por ID
    const paisExiste = paises.find(country => country.id === countryID);
    if (paisExiste) {
        // Si la bandera ya está en IndexedDB, devolverla
        return paisExiste.flag;  // Devuelve la bandera si está disponible
    }

    // Si la bandera no está en IndexedDB, obtenerla desde la API
    const url = `https://wc-qualifications-api-production.up.railway.app/api/v1/countries/${countryID}`;
    
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener la bandera: ${respuesta.status}`);
        }
        const data = await respuesta.json();

        console.log('Datos obtenidos desde la API:', data);

        const flagUrl = data.country.flags.png; 
        console.log("URL de la bandera:", flagUrl); 

        if (!flagUrl) {
            console.error(`No se encontró la URL de la bandera para el país ${countryID}`);
            return 'no disponible';
        }

        const bandera = {
            id: countryID,
            flag: flagUrl 
        };

        await guardarDatos('banderas', [bandera]); 
        console.log('Bandera guardada en IndexedDB:', bandera); 

        return flagUrl;
    } catch (error) {
        console.error(`Error al obtener la bandera del país ${countryID}:`, error);
        return 'no disponible'; 
    }
}

function irAPartido(leagueId, matchId) {
    sessionStorage.setItem('leagueId', leagueId);
    sessionStorage.setItem('matchId', matchId);
    window.location.href = '../page_detallePartidos/index.html';
}

async function mostrarPartidos(partidos) {
    const contenedorPrincipales = document.getElementById('principales');
    const contenedorTodos = document.getElementById('todos');

    if (!contenedorPrincipales || !contenedorTodos) {
        console.error("Contenedores no encontrados.");
        return;
    }

    contenedorPrincipales.innerHTML = '';
    contenedorTodos.innerHTML = '';

    if (!partidos || partidos.length === 0) {
        contenedorPrincipales.innerHTML = '<p class="text-center text-warning">No hay partidos disponibles.</p>';
        contenedorTodos.innerHTML = '<p class="text-center text-warning">No hay más partidos disponibles.</p>';
        return;
    }

    const fechaActual = new Date();
    partidos.sort((a, b) => new Date(a.date) - new Date(b.date));
    const partidosFuturos = partidos.filter(partido => new Date(partido.date) > fechaActual);

    if (partidosFuturos.length === 0) {
        contenedorPrincipales.innerHTML = '<p class="text-center text-warning">No hay próximos partidos.</p>';
        return;
    }

    // Mostrar los tres primeros partidos en la sección "Principales"
    const principalesPartidos = partidosFuturos.slice(0, 3);

    const filaPrincipales = document.createElement('div');
    filaPrincipales.classList.add('row', 'g-3');

    for (const partido of principalesPartidos) {
        const homeFlag = await obtenerBanderaPorID(partido.hometeam_id);
        const awayFlag = await obtenerBanderaPorID(partido.awayteam_id);

        const partidoDiv = document.createElement('div');
        partidoDiv.classList.add('col-12', 'col-md-4');
        partidoDiv.innerHTML = `
            <div class="card">
                <div class="card-body" onclick="irAPartido(${partido.league_id}, ${partido.id})" style="cursor: pointer;">
                    <div class="banderas d-flex justify-content-center align-items-center">
                        <img src="${homeFlag}" alt="Bandera Local" class="flag-img me-2" style="width: 130px; height: 90px; object-fit: fill;">
                        <strong>vs</strong>
                        <img src="${awayFlag}" alt="Bandera Visitante" class="flag-img ms-2" style="width: 130px; height: 90px; object-fit: fill;">
                    </div>
                    <p class="card-text text-center">Fecha: ${partido.date || 'No especificada'}</p>
                    <p class="card-text text-center">Hora: ${partido.time || 'No definida'}</p>
                    <p class="card-text text-center">Lugar: ${partido.stadium || 'No especificado'}</p>
                </div>
            </div>`;
        filaPrincipales.appendChild(partidoDiv);
    }
    contenedorPrincipales.appendChild(filaPrincipales);

    // Excluir los tres primeros partidos y dividir en grupos de 9 partidos
    const todosPartidos = partidosFuturos.slice(3);

    const partidosPorPagina = 9; // Mostrar 9 partidos por carga
    let paginaActual = 0;

    const botonVerMas = document.createElement('button');
    botonVerMas.classList.add('btn', 'btn-primary', 'mt-3', 'mx-auto', 'd-block');
    botonVerMas.textContent = 'Ver más partidos';

    const cargarMasPartidos = async () => {
        const start = paginaActual * partidosPorPagina;
        const end = start + partidosPorPagina;
        const partidosPagina = todosPartidos.slice(start, end);
    
        if (partidosPagina.length > 0) {
            let indexFila = 0; // Contador de posición dentro de la fila
    
            const filaPartidos = document.createElement('div');
            filaPartidos.classList.add('row', 'g-3');
    
            partidosPagina.forEach(async (partido, index) => {
                const homeFlag = await obtenerBanderaPorID(partido.hometeam_id);
                const awayFlag = await obtenerBanderaPorID(partido.awayteam_id);
    
                const partidoDiv = document.createElement('div');
                partidoDiv.classList.add('col-12', 'col-md-4'); // 3 columnas por fila
    
                // Si es una carta lateral (no la del medio)
                if (index % 3 === 0) { // Carta izquierda
                    partidoDiv.classList.add('card-izquierda');
                } else if (index % 3 === 2) { // Carta derecha
                    partidoDiv.classList.add('card-derecha');
                }
    
                partidoDiv.innerHTML = `
                    <div class="card w-75">
                        <div class="card-body" onclick="irAPartido(${partido.league_id}, ${partido.id})" style="cursor: pointer;">
                            <div class="d-flex justify-content-center align-items-center">
                                <img src="${homeFlag}" alt="Bandera Local" class="flag-img me-2" style="width: 40px; height: 30px;">
                                <strong>vs</strong>
                                <img src="${awayFlag}" alt="Bandera Visitante" class="flag-img ms-2" style="width: 40px; height: 30px;">
                            </div>
                            <p class="card-text text-center">Fecha: ${partido.date || 'Fecha no especificada'}</p>
                            <p class="card-text text-center">Hora: ${partido.time || 'Hora no definida'}</p>
                            <p class="card-text text-center">Lugar: ${partido.stadium || 'Lugar no especificado'}</p>
                        </div>
                    </div>
                `;
    
                filaPartidos.appendChild(partidoDiv);
                contenedorTodos.appendChild(botonVerMas);
    
                // Incrementar el índice para la fila
                indexFila++;
    
                // Crear una nueva fila después de cada 3 partidos
                if (indexFila === 3) {
                    contenedorTodos.appendChild(filaPartidos);
                    filaPartidos = document.createElement('div');
                    filaPartidos.classList.add('row', 'g-3');
                    indexFila = 0; // Reiniciar el índice de la fila
                }
            });
    
            contenedorTodos.appendChild(filaPartidos);        
        }
    
        paginaActual++;
    
        if (paginaActual * partidosPorPagina >= todosPartidos.length) {
            botonVerMas.style.display = 'none';
        }
    };          

    botonVerMas.addEventListener('click', cargarMasPartidos);
    cargarMasPartidos();
    contenedorTodos.appendChild(botonVerMas);
}

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}

window.onload = () => {
    cargarPartidos(); 
};
