const data = [
    {
        "name": "Samuel Isaac Guzmán Salazar",
        "photo":"img/samuel_Guzman.jpeg",
        "description":"Ingeniero en formación con un enfoque multidisciplinario que combina ciencia, creatividad y cultura. Mis intereses abarcan desde la programación, hasta la música y los juegos de lógica. "
    },
    {
        "name": "Maria Fernanda Sandoval",
        "photo":"img/maria_Sandoval.jpeg",
        "description":"Estudiante de Ingeniería Informática en la UCAB, apasionada por aprender todos los días algo nuevo y compartir con seres queridos."
    },
    {
        "name": "Carlos Alcides Méndez Rivero",
        "photo":"img/carlos_mendez.jpeg",
        "description":"Estudiante de la carrera de Ingeniería en Informática de la UCAB. Mis pasatiempos son escuchar musica jugar  el voleibol y practicar ajedrez."
    },
    {
        "name": "Carlos Alberto Arévalo Gómez",
        "photo":"img/images.png",
        "description":"Ninguna."
    }
]


function bodyDeveloper(developer){
    console.log(developer.photo)
    return `
    <div class='card-profile'>
        <img src="${developer.photo}" class="rounded-circle photo" alt="...">
       
        <div class="information">
            <div class="name">
                <h3>${developer.name}</h3>
            </div>
            <div class="biography">
                <p>${developer.description}</p>
            </div>
        </div>
    </div>
    `;
}

function loadData(){

    html = ''
    for(let element of data){
        html += bodyDeveloper(element)
    }

    return html; 
}

$(function(){

    $("#developers-container").ready(function(){
        
        //Eliminamos los hijos 
        $("#developers-container").empty();

        //mostramos los datos de los develpeds
        $("#developers-container").append(loadData()); 
    });

    
});




