// Lista de ODS con información alusiva
const odsList = [
    {
      title: "Fin de la pobreza",
      description: "Erradicar la pobreza en todas sus formas y dimensiones.",
      url: "https://www.un.org/sustainabledevelopment/es/poverty/",
      ods:1
    },
    {
      title: "Hambre cero",
      description: "Poner fin al hambre, lograr la seguridad alimentaria y mejorar la nutrición.",
      url: "https://www.un.org/sustainabledevelopment/es/hunger/",
      ods:2
    },
    {
      title: "Salud y bienestar",
      description: "Garantizar una vida sana y promover el bienestar.",
      url: "https://www.un.org/sustainabledevelopment/es/health/",
      ods:3
    },
    {
      title: "Educación de calidad",
      description: "Garantizar una educación inclusiva y equitativa y promover oportunidades de aprendizaje.",
      url: "https://www.un.org/sustainabledevelopment/es/education/",
      ods:4
    },
    {
      title: "Igualdad de género",
      description: "Lograr la igualdad de género y empoderar a todas las mujeres y niñas.",
      url: "https://www.un.org/sustainabledevelopment/es/gender-equality/",
      ods:5
    },
    {
      title: "Agua limpia y saneamiento",
      description: "Garantizar la disponibilidad de agua y su gestión sostenible.",
      url: "https://www.un.org/sustainabledevelopment/es/water-and-sanitation/",
      ods:6
    },
    {
      title: "Energía asequible y no contaminante",
      description: "Garantizar el acceso a una energía asequible, fiable y moderna.",
      url: "https://www.un.org/sustainabledevelopment/es/energy/",
      ods:7
    },
    {
      title: "Trabajo decente y crecimiento económico",
      description: "Promover el crecimiento económico sostenido, inclusivo y sostenible.",
      url: "https://www.un.org/sustainabledevelopment/es/economic-growth/",
      ods:8
    },
    {
      title: "Industria, innovación e infraestructura",
      description: "Construir infraestructuras resilientes, promover la industrialización inclusiva.",
      url: "https://www.un.org/sustainabledevelopment/es/infrastructure/",
      ods:9
    },
    {
      title: "Reducción de las desigualdades",
      description: "Reducir las desigualdades entre los países y dentro de ellos.",
      url: "https://www.un.org/sustainabledevelopment/es/inequality/",
      ods:10
    },
    {
      title: "Ciudades y comunidades sostenibles",
      description: "Lograr que las ciudades sean inclusivas, seguras, resilientes y sostenibles.",
      url: "https://www.un.org/sustainabledevelopment/es/cities/",
      ods:11
    },
    {
      title: "Producción y consumo responsables",
      description: "Garantizar modalidades de consumo y producción sostenibles.",
      url: "https://www.un.org/sustainabledevelopment/es/sustainable-consumption-production/",
      ods:12
    },
    {
      title: "Acción por el clima",
      description: "Adoptar medidas urgentes para combatir el cambio climático.",
      url: "https://www.un.org/sustainabledevelopment/es/climate-change/",
      ods:13
    },
    {
      title: "Vida submarina",
      description: "Conservar y utilizar sosteniblemente los océanos, mares y recursos marinos.",
      url: "https://www.un.org/sustainabledevelopment/es/oceans/",
      ods:14
    },
    {
      title: "Vida de ecosistemas terrestres",
      description: "Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres.",
      url: "https://www.un.org/sustainabledevelopment/es/biodiversity/",
      ods:15
    },
    {
      title: "Paz, justicia e instituciones sólidas",
      description: "Promover sociedades pacíficas e inclusivas para el desarrollo sostenible.",
      url: "https://www.un.org/sustainabledevelopment/es/peace-justice/",
      ods:16
    },
    {
      title: "Alianzas para lograr los objetivos",
      description: "Revitalizar la Alianza Mundial para el Desarrollo Sostenible.",
      url: "https://www.un.org/sustainabledevelopment/es/globalpartnerships/",
      ods:17
    }
  ];
  
  // Función para cargar y mostrar un ODS
  function updateODS() {
    const infoOdsElement = document.querySelector(".info-ods");
    if (!infoOdsElement) {
      console.error("Elemento '.info-ods' no encontrado en el DOM.");
      return;
    }
  
    const randomOds = odsList[Math.floor(Math.random() * odsList.length)];
    infoOdsElement.innerHTML = `
      <div class="ods-container">
        <h4 class="fw-bold p-4">¡DESCUBRE LOS ODS!</h4>
        <h3 class="ods-title">${randomOds.title}</h3>
        <p class="ods-icon fw-semibold">ODS ${randomOds.ods}</p> 
        <p class="ods-description mt-1">${randomOds.description}</p>
        <a href="${randomOds.url}" class="ods-button" target="_blank">Leer más</a>
      </div>
    `;
  }
  
  // Actualizar ODS cada 10 segundos
  setInterval(updateODS, 5000);
  
  // Mostrar un ODS al cargar la página
  document.addEventListener("DOMContentLoaded", updateODS);
  
function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        // Asegúrate de que la versión solicitada sea al menos 3
        const requestedVersion = 3;  // Cambia la versión a la más reciente que tengas
        const request = indexedDB.open('wcData', requestedVersion); 

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            const oldVersion = event.oldVersion;  // Versión anterior

            console.log(`Actualizando base de datos de la versión ${oldVersion} a la versión ${event.newVersion}`);

            // Imprimir los object stores antes de realizar cambios
            const existingStores = Array.from(db.objectStoreNames);
            console.log('Object stores existentes antes de la actualización:', existingStores);

            // Realizar las migraciones dependiendo de la versión anterior
            if (oldVersion < 1) {
                // Si estamos en la versión 1 o menos, crear los objectStores iniciales
                if (!existingStores.includes('confederaciones')) {
                    db.createObjectStore('confederaciones', { keyPath: 'id' });
                    console.log('Object store "confederaciones" creado.');
                }
                if (!existingStores.includes('partidos')) {
                    db.createObjectStore('partidos', { keyPath: 'id' });
                    console.log('Object store "partidos" creado.');
                }
            }

            if (oldVersion < 2) {
                // Si estamos actualizando de la versión 1 a la versión 2
                if (!existingStores.includes('banderas')) {
                    db.createObjectStore('banderas', { keyPath: 'id' });
                    console.log('Object store "banderas" creado.');
                }
                if (!existingStores.includes('noticion')) {
                    db.createObjectStore('noticion', { autoIncrement: true });
                    console.log('Object store "noticion" creado.');
                }
            }

            if (oldVersion < 3) {
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;

            // Imprimir el nivel (versión) actual de la base de datos
            console.log('Versión actual de la base de datos:', db.version);

            // Imprimir los object stores después de la actualización de la base de datos
            const updatedStores = Array.from(db.objectStoreNames);
            console.log('Object stores después de la actualización:', updatedStores);

            resolve(db);
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
async function mostrarPartidos(partidos) {
    const proximosPartidos = document.querySelector('#proximos-partidos .mensaje');
    const contenedorPartidos = document.querySelector('#proximos-partidos .cuadro-partidos');
  
    if (!contenedorPartidos) {
        console.error("Contenedor no encontrado");
        return;
    }

    contenedorPartidos.innerHTML = ''; // Limpiar contenido previo

    if (!partidos || partidos.length === 0) {
        contenedorPartidos.innerHTML = '<p class="text-center text-warning">No hay partidos disponibles.</p>';
        return;
    }

    const fechaActual = new Date();

    // Ordenar partidos por fecha (más próximo a más lejano)
    partidos.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Filtrar solo partidos futuros
    const partidosFuturos = partidos.filter(partido => new Date(partido.date) > fechaActual);

    if (partidosFuturos.length === 0) {
        contenedorPartidos.innerHTML = '<p class="text-center text-warning">No hay próximos partidos.</p>';
        return;
    }

    // Mostrar mensaje para ver más partidos
    const mensajeMostrarTodo = document.createElement('div');
    mensajeMostrarTodo.classList.add('mx-auto', 'text-center');
    mensajeMostrarTodo.innerHTML = `<p class="text-info-emphasis">¿Quieres ver más partidos? Haz click en Mostrar Todo para ver más información.</p>`;
    proximosPartidos.appendChild(mensajeMostrarTodo);

    // Mostrar solo los primeros 12 partidos futuros
    const partidosAMostrar = partidosFuturos.slice(0, 12);

    for (const partido of partidosAMostrar) {
        const homeFlag = await obtenerBanderaPorID(partido.hometeam_id);
        const awayFlag = await obtenerBanderaPorID(partido.awayteam_id);

        const partidoDiv = document.createElement('div');
        partidoDiv.classList.add('card', 'mb-3');

        partidoDiv.innerHTML = `
            <div class="card-body" onclick="irAPartido(${partido.league_id}, ${partido.id})" style="cursor: pointer;">
                <div class="mx-auto">
                    <img src="${homeFlag}" alt="Bandera Local" class="flag-img me-2">
                    <strong>vs</strong>
                    <img src="${awayFlag}" alt="Bandera Visitante" class="flag-img ms-2">
                </div>
                <p class="card-text">Fecha: ${partido.date || 'Fecha no especificada'}</p>
                <p class="card-text">Hora: ${partido.time || 'Hora no definida'}</p>
                <p class="card-text">Lugar: ${partido.stadium || 'Lugar no especificado'}</p>
            </div>
        `;
        contenedorPartidos.appendChild(partidoDiv);
    }
}

function irAPartido(leagueId, matchId) {
    sessionStorage.setItem('leagueId', leagueId);
    sessionStorage.setItem('matchId', matchId);
    window.location.href = 'pages/page_detallePartidos/index.html';
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

        // Registra toda la respuesta para ver la estructura de los datos
        console.log('Datos obtenidos desde la API:', data);
        
        // Acceder a la bandera correctamente
        const flagUrl = data.country.flags.png; // Aquí accedemos a la URL de la bandera
        console.log("URL de la bandera:", flagUrl); // Verificar la URL de la bandera

        // Verificar si la URL de la bandera es válida
        if (!flagUrl) {
            console.error(`No se encontró la URL de la bandera para el país ${countryID}`);
            return '-'; // Bandera por defecto en caso de error
        }

        // Guardar la bandera en IndexedDB para futuras consultas
        const bandera = {
            id: countryID,
            flag: flagUrl // Aseguramos que la URL de la bandera es un PNG
        };

        await guardarDatos('banderas', [bandera]); // Guardamos la bandera en IndexedDB
        console.log('Bandera guardada en IndexedDB:', bandera); // Verificar que la bandera se guardó

        return flagUrl;
    } catch (error) {
        console.error(`Error al obtener la bandera del país ${countryID}:`, error);
        return '-'; // Bandera por defecto en caso de error
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
                mostrarConfederaciones(confederaciones, indice);
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

// Función para guardar el ID de la confederación y redirigir
function guardarConfederacionYRedirigir(confederacionId) {
    // Guardamos el ID de la confederación en sessionStorage
    sessionStorage.setItem('confederacionId', confederacionId);

    if(Number(confederacionId) == 6){
        window.location.href = 'pages/page_uefa/uefa.html';
    } else
        // Redirigimos a la nueva página
        window.location.href = 'pages/page_tablaConfederaciones/index.html';

}

function redirectToAboutUs() {
    window.location.href = "pages/page_about_us/about.html";
}

function mostrarConfederaciones(confederaciones, indice) {
    const listaConfederaciones = document.getElementById('lista-confederaciones');
    listaConfederaciones.innerHTML = '';

    const contenedorTarjetas = document.createElement('div');
    contenedorTarjetas.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'gap-3');

    // Flecha izquierda
    const flechaIzquierda = document.createElement('button');
    flechaIzquierda.classList.add('flecha', 'izquierda', 'btn', 'btn-secondary');
    flechaIzquierda.innerHTML = '←';
    flechaIzquierda.onclick = () => {
        if (indice > 0) {
            indice -= 2;
            mostrarConfederaciones(confederaciones, indice);
        }
    };

    // Ocultar flecha izquierda si está al inicio
    if (indice === 0) {
        flechaIzquierda.style.visibility = 'hidden';
    } else {
        flechaIzquierda.style.visibility = 'visible';
    }

    // Contenedor de las tarjetas
    const contenedorTarjetasInterno = document.createElement('div');
    contenedorTarjetasInterno.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'gap-3');

    // Mostrar las tarjetas según el índice
    const tarjetasAMostrar = confederaciones.slice(indice, indice + 2);
    tarjetasAMostrar.forEach(confederacion => {
        const confederacionDiv = document.createElement('div');
        confederacionDiv.classList.add('card', 'col', 'p-3', 'm-2');
        confederacionDiv.style.width = '32rem';
        confederacionDiv.innerHTML = `
            <img src="${confederacion.logo || 'default-logo.png'}" 
                class="card-img-top mb-2" 
                alt="${confederacion.name}" 
                style="height: 250px; object-fit: contain; cursor: pointer;"
                onclick="guardarConfederacionYRedirigir(${confederacion.id})">`;

        contenedorTarjetasInterno.appendChild(confederacionDiv);
    });

    // Flecha derecha
    const flechaDerecha = document.createElement('button');
    flechaDerecha.classList.add('flecha', 'derecha', 'btn', 'btn-secondary');
    flechaDerecha.innerHTML = '→';
    flechaDerecha.onclick = () => {
        if (indice + 2 < confederaciones.length) {
            indice += 2;
            mostrarConfederaciones(confederaciones, indice);
        }
    };

    // Ocultar flecha derecha si está al final
    if (indice + 2 >= confederaciones.length) {
        flechaDerecha.style.visibility = 'hidden';
    } else {
        flechaDerecha.style.visibility = 'visible';
    }

    // Añadir flechas y tarjetas al contenedor principal
    contenedorTarjetas.appendChild(flechaIzquierda);
    contenedorTarjetas.appendChild(contenedorTarjetasInterno);
    contenedorTarjetas.appendChild(flechaDerecha);

    listaConfederaciones.appendChild(contenedorTarjetas);
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
    const noticiaPrincipal = noticias[0]; // Suponiendo que la primera noticia es la principal
    const noticiasSecundarias = noticias.slice(1, 5); // Tomar las siguientes 4 noticias como secundarias

    // Mostrar la noticia principal
    const contenedorPrincipal = document.getElementById('noticia-principal');
    if (contenedorPrincipal && noticiaPrincipal) {
        contenedorPrincipal.innerHTML = `
            <div class="card">
                <img src="${noticiaPrincipal.image || 'default-image.jpg'}" class="card-img-top" alt="Imagen principal">
                <div class="card-body">
                    <h5 class="card-title">${noticiaPrincipal.title.es}</h5>
                    <p class="card-text">${noticiaPrincipal.preview_text.es}</p>
                </div>
            </div>
        `;
    }

    // Mostrar las noticias secundarias
    const contenedorSecundarias = document.getElementById('noticias-secundarias');
    if (contenedorSecundarias) {
        contenedorSecundarias.innerHTML = ''; // Limpiar contenido previo
        contenedorSecundarias.classList.add('row', 'g-3'); // Para mantener las noticias alineadas en 2 filas

        noticiasSecundarias.forEach(noticia => {
            const noticiaDiv = document.createElement('div');
            noticiaDiv.classList.add('col-md-6'); // 2 noticias por fila en dispositivos medianos y superiores
            noticiaDiv.innerHTML = `
                <div class="card">
                    <img src="${noticia.image || 'default-image.jpg'}" class="card-img-top" alt="Imagen secundaria">
                    <div class="card-body">
                        <h5 class="card-title fs-6">${noticia.title.es}</h5>
                    </div>
                </div>
            `;
            contenedorSecundarias.appendChild(noticiaDiv);
        });
    }
}

async function cargarNoticiasCarrusel() {
    const contenedorCarrusel = document.querySelector('.carousel-inner');
    const indicadoresCarrusel = document.querySelector('.carousel-indicators');

    try {
        const noticias = await obtenerDatos('noticion'); // Intentar cargar desde IndexedDB
        const noticiasAleatorias = seleccionarNoticiasAleatorias(noticias, 3); // Seleccionar 3 noticias aleatorias

        // Limpiar el contenido previo del carrusel
        contenedorCarrusel.innerHTML = '';
        indicadoresCarrusel.innerHTML = '';

        noticiasAleatorias.forEach((noticia, index) => {
            // Crear los indicadores
            const indicador = document.createElement('button');
            indicador.type = 'button';
            indicador.dataset.bsTarget = '#carouselExampleCaptions';
            indicador.dataset.bsSlideTo = index;
            indicador.className = index === 0 ? 'active' : '';
            indicador.ariaLabel = `Slide ${index + 1}`;
            indicadoresCarrusel.appendChild(indicador);

            // Crear los elementos del carrusel
            const carruselItem = document.createElement('div');
            carruselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carruselItem.innerHTML = `
                <img src="${noticia.image || 'default-image.jpg'}" class="d-block w-100" alt="${noticia.title.es}">
                <div class="overlay">
                    <div class="carousel-caption d-none d-md-block text-start top-0">
                        <h5 class="fs-1 fw-bold">${noticia.title.es}</h5>
                    </div>
                </div>`;
            contenedorCarrusel.appendChild(carruselItem);
        });
    } catch (error) {
        console.error('Error al cargar las noticias en el carrusel:', error);
    }
}

function seleccionarNoticiasAleatorias(noticias, cantidad) {
    const noticiasAleatorias = [];
    const copiaNoticias = [...noticias]; // Crear una copia para evitar modificar el original

    while (noticiasAleatorias.length < cantidad && copiaNoticias.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * copiaNoticias.length);
        noticiasAleatorias.push(copiaNoticias.splice(indiceAleatorio, 1)[0]);
    } 

    return noticiasAleatorias;
}

window.onload = () => {
    cargarConfederaciones();
    cargarPartidos(); 
    cargarNoticias();
    cargarNoticiasCarrusel();
};