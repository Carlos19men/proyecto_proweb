function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('wcData', 3); // Versión actualizada a 3

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            const oldVersion = event.oldVersion;  // Versión anterior

            console.log(`Actualizando base de datos de la versión ${oldVersion} a la versión ${event.newVersion}`);

            // Obtener los object stores existentes antes de realizar cambios
            const existingStores = Array.from(db.objectStoreNames);
            console.log('Object stores existentes antes de la actualización:', existingStores);

            // Crear 'noticion' solo si no existe
            if (!existingStores.includes('noticion')) {
                db.createObjectStore('noticion', { autoIncrement: true });
                console.log('Object store "noticion" creado.');
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
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

function cargarNoticias() {
    const url = 'https://wc-qualifications-api-production.up.railway.app/api/v1/news';
    obtenerDatos('noticion')
        .then(datos => {
            if (datos.length > 0) {
                console.log('Datos cargados desde IndexedDB');
                mostrarNoticiones(datos);
            } else {
                console.log('Haciendo petición a la API...');
                fetchNoticionDeAPI();
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de IndexedDB:', error);
            fetchNoticionDeAPI();
        });

    function fetchNoticionDeAPI() {
        fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) throw new Error(`Error en la solicitud: ${respuesta.status}`);
                return respuesta.json();
            })
            .then(data => {
                const noticias = data.news;  // Ajusta esto según el formato de la respuesta de la API
                guardarDatos('noticion', noticias); // Guardar en IndexedDB
                mostrarNoticiones(noticias);  // Mostrar en el DOM
            })
            .catch(error => {
                console.error('Error al cargar las noticias:', error);
            });
    }
}

function mostrarNoticiones(noticias) {
    const noticiasPrincipales = noticias.slice(0, 3); // Las tres primeras noticias como principales
    const noticiasSecundarias = noticias.slice(3); // Resto como secundarias

    // Mostrar noticias principales
    const contenedorPrincipal = document.getElementById('destacadas');
    if (contenedorPrincipal && noticiasPrincipales.length > 0) {
        contenedorPrincipal.innerHTML = `
            <div class="row gx-4 gy-4">
                ${noticiasPrincipales.map((noticia, index) => `
                    <div class="col-12 col-md-6 ${index === 2 ? 'col-md-12' : ''} d-flex">
                        <a href="${noticia.url}" class="d-block text-decoration-none text-dark h-100 w-100" aria-label="Leer más sobre ${noticia.title.es}">
                            <div class="card">
                                <img src="${noticia.image || 'default-image.jpg'}" class="card-img-top" alt="${noticia.title.es}" loading="lazy">
                                <div class="card-body">
                                    <h5 class="card-title">${noticia.title.es}</h5>
                                    <p class="card-text">${noticia.preview_text.es}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    }



    // Mostrar lista de noticias secundarias
    const contenedorSecundarias = document.getElementById('todas');
    if (contenedorSecundarias && noticiasSecundarias.length > 0) {
        let currentPage = 0;
        const itemsPerPage = 8;

        const renderNoticiasSecundarias = () => {
            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;
            const noticiasPagina = noticiasSecundarias.slice(start, end);

            const rowElement = contenedorSecundarias.querySelector('.row') || document.createElement('div');
            rowElement.classList.add('row', 'g-3'); // Estructura de filas y separación
            contenedorSecundarias.appendChild(rowElement);

            noticiasPagina.forEach(noticia => {
                const colElement = document.createElement('div');
                colElement.classList.add('col-md-6', 'd-flex', 'custom-card'); // Clase adicional
            
                colElement.innerHTML = `
                    <div class="card flex-row align-items-center">
                        <img src="${noticia.image || 'default-image.jpg'}" 
                            class="rounded-start" 
                            alt="${noticia.title.es}" 
                            style="width: 150px; height: 100%; object-fit: cover;">
                        <div class="card-body">
                            <h3 class="card-title mb-2">${noticia.title.es}</h3>
                            <p class="card-text text-muted">${noticia.preview_text.es}</p>
                        </div>
                    </div>
                `;
                rowElement.appendChild(colElement);
            });            

            // Mover botón después de las noticias
            const verMasBtn = document.getElementById('ver-mas-btn');
            if (verMasBtn) {
                contenedorSecundarias.appendChild(verMasBtn);
            }

            // Ocultar botón si no hay más noticias
            if (end >= noticiasSecundarias.length) {
                const verMasBtn = document.getElementById('ver-mas-btn');
                verMasBtn.style.display = 'none';
            }
        };

        // Estructura inicial
        contenedorSecundarias.innerHTML = `
            <h4 class="subtitulos fs-3 mb-3">Más Noticias</h4>
            <div class="row"></div>
            <button id="ver-mas-btn" class="btn btn-secondary mt-5">Ver más noticias</button>
        `;
        const verMasBtn = document.getElementById('ver-mas-btn');

        // Cargar la primera página de noticias
        renderNoticiasSecundarias();

        // Evento para cargar más noticias
        verMasBtn.addEventListener('click', () => {
            currentPage++;
            renderNoticiasSecundarias();
        });
    }
}

function redirectToAboutUs() {
    window.location.href = "../page_about_us/about.html";
}

window.onload = () => {
    cargarNoticias();
};