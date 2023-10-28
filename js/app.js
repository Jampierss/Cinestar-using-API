const getMovies = async() => {
    try {
        
        const id = new URLSearchParams(window.location.search).get("idx");
        const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`);

        if (response.status === 200) {

            const data_json = await response.json();
            console.log(data_json)

            let html = '<br/><h1>Cartelera</h1><br/>';
            data_json.forEach(movie => {
                html += `
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${movie.Titulo}</h2><br/>
                            <p>${movie.Sinopsis}</p>
                            <br/>
                            <div class="boton-pelicula"> 
                                <a href="pelicula.html?id=${movie.id}" >
                                    <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                </a>
                            </div>
                            <div class="boton-pelicula"> 
                                <a href="https://www.youtube.com/v/${movie.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                    <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                </a>
                            </div> 
                        </div>
                        <img src="img/pelicula/${movie.id}.jpg" width="160" height="226"/><br/><br/>
                    </div>
                `
            });
            
            document.getElementById("contenido-interno").innerHTML = html;

        }


    } catch (err) {
        console.log(err);
    }
};

const getMovie = async() => {

    const id = new URLSearchParams(window.location.search).get('id');
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`);

    if (response.status === 200) {

        data_json = await response.json();
        let html = `
            <br/><h1>Cartelera</h1><br/>
            <div class="contenido-pelicula">
                <div class="datos-pelicula">
                    <h2>${data_json.Titulo}</h2>
                    <p>${data_json.Sinopsis}</p>
                    <br/>
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-titulo">Título Original :</div>
                            <div class="celda">${data_json.Titulo}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Estreno :</div>
                            <div class="celda">${data_json.FechaEstrenoss}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Género :</div>
                            <div class="celda">${data_json.Geneross}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Director :</div>
                            <div class="celda">${data_json.Director}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Reparto :</div>
                            <div class="celda">${data_json.Reparto}</div>
                        </div>
                    </div>
                </div>
                <img src="img/pelicula/${data_json.id}.jpg" width="160" height="226"><br/><br/>
            </div>
            <div class="pelicula-video">
                <embed src="https://www.youtube.com/v/${data_json.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
            </div>
        `

        document.getElementById("contenido-interno").innerHTML = html;
    }
};

const getCinemas = async() => {
    try {
    
        const response = await fetch("https://oaemdl.es/cinestar_sweb_php/cines");

        if (response.status === 200) {
            
            const data_json = await response.json();
            
            let cinemas = "";
            data_json.forEach(cinema => {
                cinemas += `
                    <div class="contenido-cine" id="contenido-cine">
                        <img src="img/cine/${cinema.id}.1.jpg" width="227" height="170"/>
                            <div class="datos-cine">
                                <h4>${cinema.RazonSocial}</h4><br/>
                            <span>${cinema.Direccion}-${cinema.Detalle}<br/><br/>Teléfono: ${cinema.Telefonos} anexo 865</span>
                        </div>
                        <br/>
                        <a href="cine.html?id=${cinema.id}">
                            <img src="img/varios/ico-info2.png" width="150" height="40"/>
                        </a>
                    </div>
                `
            });

            document.getElementById('contenido-interno').innerHTML = cinemas;
        }

    } catch (error) { console.log(error) }

};

const getCinema = async() => {

    const id = new URLSearchParams(window.location.search).get('id');

    const response_general = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);
    const response_prices = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`);
    const response_movies = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`);

    const responses = [response_general.status, response_movies.status, response_prices.status];

    if (responses.every(status => status === 200)) {
        
        const data_general = await response_general.json();
        const data_movies = await response_movies.json();
        const data_prices = await response_prices.json();

        let prices = '';
        data_prices.forEach(price => {
            prices += `
                <div class="fila">
                    <div class="celda-titulo">${price.DiasSemana}</div>
                    <div class="celda">${price.Precio}</div>
                </div>
            `
        });

        let row_number = 0;
        let movies = ''; 
        data_movies.forEach(movie => {
            if (row_number % 2 === 0) {
                movies += `
                    <div class="fila">
                        <div class="celda-titulo">${movie.Titulo}</div>
                        <div class="celda">${movie.Horarios}</div>
                    </div>
                `
            } else {
                movies += `
                        <div class="fila impar">
                            <div class="celda-titulo">${movie.Titulo}</div>
                            <div class="celda">${movie.Horarios}</div>
                        </div>
                    `
            }

            row_number++;
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
                            ${movies}
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

            document.getElementById('contenido-interno').innerHTML = cine;



    }
};


const currentURL = window.location.href;
const partsURL = currentURL.split('/');
const lastPartURL = partsURL[partsURL.length - 1]; 
// console.log(lastPart); // peliculas.html?idx=cartelera

if (lastPartURL.includes('cines.html')) { getCinemas(); }
else if (lastPartURL.includes('cine.html')) { getCinema(); }
else if (lastPartURL.includes('peliculas.html')) { getMovies(); }
else if (lastPartURL.includes('pelicula.html')) { getMovie(); }