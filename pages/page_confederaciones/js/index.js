function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('wcData', 3); // Versión actualizada

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            // Obtener los nombres de los almacenes existentes
            const existingStores = Array.from(db.objectStoreNames);
            console.log('Almacenes existentes antes de la actualización:', existingStores);

            // Crear el almacén "confederaciones" solo si no existe
            if (!existingStores.includes('confederaciones')) {
                db.createObjectStore('confederaciones', { keyPath: 'id' });
                console.log('Almacén "confederaciones" creado.');
            } else {
                console.log('El almacén "confederaciones" ya existe.');
            }

            // Después de posibles cambios, listar los almacenes actuales
            const updatedStores = Array.from(db.objectStoreNames);
            console.log('Almacenes existentes después de la actualización:', updatedStores);
        };

        request.onsuccess = function (event) {
            resolve(event.target.result); // Resolver con la instancia de la base de datos
        };

        request.onerror = function (event) {
            reject('Error al abrir la base de datos: ' + event.target.errorCode);
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

function cargarConfederaciones() {
    const url = 'https://wc-qualifications-api-production.up.railway.app/api/v1/leagues';
    const listaConfederaciones = document.getElementById('lista-confederaciones');
    let confederaciones = [];
    let indice = 0; // Índice de las tarjetas mostradas

    obtenerDatos('confederaciones')
        .then(datos => {
            if (datos.length > 0) {
                console.log('Datos cargados desde IndexedDB');
                confederaciones = datos;
                mostrarConfederaciones(confederaciones);
            } else {
                console.log('Haciendo petición a la API...');
                fetchConfederacionesDeAPI();
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de IndexedDB:', error);
            fetchConfederacionesDeAPI();
        });

    function fetchConfederacionesDeAPI() {
        fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) throw new Error(`Error en la solicitud: ${respuesta.status}`);
                return respuesta.json();
            })
            .then(data => {
                confederaciones = data.leagues;
                guardarDatos('confederaciones', confederaciones);
                mostrarConfederaciones(confederaciones, indice);
            })
            .catch(error => {
                console.error('Error al cargar las confederaciones:', error);
                listaConfederaciones.innerHTML = '<p class="text-center text-danger">Error al cargar las confederaciones. Intenta nuevamente más tarde.</p>';
            });
    }
}

function mostrarConfederaciones(confederaciones, indice) {
    const listaConfederaciones = document.getElementById('todas-confederaciones');
    if (!listaConfederaciones) {
        console.error('Elemento "todas-confederaciones" no encontrado.');
        return;
    }

    listaConfederaciones.innerHTML = '';

    // Crear el contenedor principal
    const contenedorFilas = document.createElement('div');
    contenedorFilas.classList.add('container', 'd-flex', 'flex-wrap', 'justify-content-center', 'gap-3');

    // Recorrer las confederaciones y crear filas de tarjetas
    confederaciones.forEach(confederacion => {
        const columna = document.createElement('div');
        columna.classList.add(
            'col-12',   // Ocupa todo el ancho en pantallas pequeñas
            'col-sm-6', // Ocupa la mitad en pantallas medianas
            'col-md-4', // Dos tarjetas por fila en pantallas grandes
            'col-lg-3', // Tres tarjetas por fila en pantallas más grandes
            'd-flex', 
            'justify-content-center',
            'mb-4',
            'mt-4'
        );

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'p-3', 'h-100'); // Tarjetas consistentes
        tarjeta.style.width = '20rem'; // Ancho máximo para todas las tarjetas

        tarjeta.innerHTML = `
            <img src="${confederacion.logo || 'default-logo.png'}" 
                class="card-img-top mb-2" 
                alt="${confederacion.name || 'Sin nombre'}" 
                style="height: 200px; object-fit: contain; cursor: pointer;"
                onclick="guardarConfederacionYRedirigir(${confederacion.id})">
            `;
        columna.appendChild(tarjeta);
        contenedorFilas.appendChild(columna);
    });

    // Añadir el contenedor al DOM
    listaConfederaciones.appendChild(contenedorFilas);
}

// Función para guardar el ID de la confederación y redirigir
function guardarConfederacionYRedirigir(confederacionId) {
    // Guardamos el ID de la confederación en sessionStorage
    sessionStorage.setItem('confederacionId', confederacionId);
    if(Number(confederacionId) == 6){
        window.location.href = '../page_uefa/uefa.html';
    } else
        // Redirigimos a la nueva página
        window.location.href = '../page_tablaConfederaciones/index.html';
}

window.onload = () => {
    cargarConfederaciones();
};

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}