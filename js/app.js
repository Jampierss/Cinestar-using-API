const loadMoviesCartelera = async() => {
    try {
        const response = await fetch('https://oaemdl.es/cinestar_sweb_php/peliculas/cartelera');
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            // console.log(data);
            
            let movies = '';
            data.forEach(element => {
                movies += `
                    <div class="datos-pelicula">
                        <h2>${element.Titulo}</h2><br/>
                        <p>${element.Sinopsis}</p>
                        <br/>
                        <div class="boton-pelicula"> 
                            <a href="pelicula.html?id=${element.id}" >
                                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                            </a>
                        </div>
                        <div class="boton-pelicula"> 
                            <a href="https://www.youtube.com/v/${element.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                            </a>
                        </div> 
                    </div>
                    <img src="img/pelicula/${element.id}.jpg" width="160" height="226"/><br/><br/>
                `
            });

            document.getElementById("contenido-pelicula").innerHTML = movies;
        }

    } catch (error) {
        console.log(error);
    }
}

const loadMoviesEstrenos = async() => {
    try {
        const response = await fetch('https://oaemdl.es/cinestar_sweb_php/peliculas/estrenos');
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            // console.log(data);
            
            let movies = '';
            data.forEach(element => {
                movies += `
                    <div class="datos-pelicula">
                        <h2>${element.Titulo}</h2><br/>
                        <p>${element.Sinopsis}</p>
                        <br/>
                        <div class="boton-pelicula"> 
                            <a href="pelicula.html?id=${element.id}" >
                                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                            </a>
                        </div>
                        <div class="boton-pelicula"> 
                            <a href="https://www.youtube.com/v/${element.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                            </a>
                        </div> 
                    </div>
                    <img src="img/pelicula/${element.id}.jpg" width="160" height="226"/><br/><br/>
                `
            });

            document.getElementById("contenido-pelicula").innerHTML = movies;
        }

    } catch (error) {
        console.log(error);
    }
}

const loadCinemas = async() => {
    try {
        const response = await fetch('https://oaemdl.es/cinestar_sweb_php/cines');
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            // console.log(data);
            
            let cinemas = '';
            data.forEach(element => {
                cinemas += `
                <div class="contenido-cine" id="contenido-cine">
                    <img src="img/cine/${element.id}.1.jpg" width="227" height="170"/>
                        <div class="datos-cine">
                            <h4>${element.RazonSocial}</h4><br/>
                        <span>${element.Direccion}-${element.Detalle}<br/><br/>Teléfono: ${element.Telefonos} anexo 865</span>
                    </div>
                    <br/>
                    <a href="cine.html?id=${element.id}">
                        <img src="img/varios/ico-info2.png" width="150" height="40"/>
                    </a>
                </div>
                `
            });

            document.getElementById("contenido-interno").innerHTML = cinemas;
        }

    } catch (error) {
        console.log(error);
    }
}

const loadCine = async() => {

    let values = window.location.search;
    let urlSearchParams = new URLSearchParams(values);
    let idValue = urlSearchParams.get('id');

    try {
        const response_general = await fetch('https://oaemdl.es/cinestar_sweb_php/cines/' + idValue);
        const response_prices = await fetch('https://oaemdl.es/cinestar_sweb_php/cines/' + idValue + '/tarifas');
        const response_movies = await fetch('https://oaemdl.es/cinestar_sweb_php/cines/' + idValue + '/peliculas');

        console.log(response_prices);
        console.log(response_movies);

        if (response_prices.status === 200 && response_movies.status === 200 && response_general.status === 200) {
            const data_prices = await response_prices.json();
            const data_movies = await response_movies.json();
            const data_general = await response_general.json();
            // console.log(data);

            let prices = '';
            data_prices.forEach(element =>{
                prices += `
                    <div class="fila">
                        <div class="celda-titulo">${element.DiasSemana}</div>
                        <div class="celda">${element.Precio}</div>
                    </div>
                `
            });

            let count = 1;
            let movie = '';
            data_movies.forEach(element =>{
                if (count % 2 === 0) {
                    movie += `
                        <div class="fila">
                            <div class="celda-titulo">${element.Titulo}</div>
                            <div class="celda">${element.Horarios}</div>
                        </div>
                    `
                } else {
                    movie += `
                        <div class="fila impar">
                            <div class="celda-titulo">${element.Titulo}</div>
                            <div class="celda">${element.Horarios}</div>
                        </div>
                    `
                }

                count += 1;
            });
            
            let cine = `
                <h2>${data_general.RazonSocial}</h2>
                <div class="cine-info">
                    <div class="cine-info datos">
                        <p>${data_general.Direccion} - ${data_general.Detalle}</p>
                        <p>Teléfono: ${data_general.Telefonos}</p>
                        <br/>
                        <div class="tabla">
                            ${prices}
                        </div>
                        <div class="aviso">
                            <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                        </div>
                    </div>
                    <img src="img/cine/${data_general.id}.1.jpg"/>
                    <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                    <div class="cine-info peliculas">
                        <div class="tabla">
                            <div class="fila">
                                <div class="celda-cabecera">Películas</div>
                                <div class="celda-cabecera">Horarios</div>
                            </div>
                            ${movie}
                        </div>
                    </div>
                </div>
                <div>
                    <img style="float:left;" src="img/cine/${data_general.id}.2.jpg" alt="Imagen del cine"/>
                    <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                        Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
                        <br/><br/>
                        Visitános y diviértete con nosotros. 
                        <br/><br/>
                        <b>CINESTAR</b>, siempre pensando en tí. 
                    </span>		
                </div>

            `
                
            

            document.getElementById("contenido-interno").innerHTML = cine;
        }

    } catch (error) {
        console.log(error);
    }
}

const loadMovie = async() => {

    let values = window.location.search;
    let urlSearchParams = new URLSearchParams(values);
    let idValue = urlSearchParams.get('id');

    try {
        const response = await fetch('https://oaemdl.es/cinestar_sweb_php/peliculas/' + idValue);

        if (response.status === 200) {
            const data = await response.json();
            // console.log(data);

            let movie = `
                <br/><h1>Cartelera</h1><br/>
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${data.Titulo}</h2>
                        <p>${data.Sinopsis}</p>
                        <br/>
                        <div class="tabla">
                            <div class="fila">
                                <div class="celda-titulo">Título Original :</div>
                                <div class="celda">${data.Titulo}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Estreno :</div>
                                <div class="celda">${data.FechaEstrenoss}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Género :</div>
                                <div class="celda">${data.Geneross}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Director :</div>
                                <div class="celda">${data.Director}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Reparto :</div>
                                <div class="celda">${data.Reparto}</div>
                            </div>
                        </div>
                    </div>
                    <img src="img/pelicula/${data.id}.jpg" width="160" height="226"><br/><br/>
                </div>
                <div class="pelicula-video">
                    <embed src="https://www.youtube.com/v/${data.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
                </div>
            `;

            document.getElementById("contenido-interno").innerHTML = movie;
        }

    } catch (error) {
        console.log(error);
    }
}

const currentURL = window.location.href;
const parts = currentURL.split('/');
const lastPart = parts[parts.length - 1];
console.log(lastPart);

const values = window.location.search;
const urlSearchParams = new URLSearchParams(values);
const idxValue = urlSearchParams.get('idx');

console.log(idxValue);

if (idxValue === "cartelera") {
    loadMoviesCartelera();
} else if (idxValue === "estrenos") {
    loadMoviesEstrenos();
}

if (lastPart === "cines.html") {
    loadCinemas();
} else if (lastPart.includes("cine.html")) {
    loadCine();
} else if (lastPart.includes("pelicula.html")) {
    loadMovie();
}