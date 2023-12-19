class Viajes {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this), this.catchErrors.bind(this));
    }

    getPosition(position) {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
    }

    catchErrors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("El usuario no permite la peticion de geolocalizacion");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Informacion de geolocalizacion no disponible");
                break;
            case error.TIMEOUT:
                alert("La peticion de geolocalizacion ha caducado");
                break;
            case error.UNKNOWN_ERROR:
                alert("Se ha producido un error desconocido");
                break;
        }
    }

    getMapaEstatico() {
        var key = "AIzaSyD-_ks7PKBNo9LOhIXSE4zYotqjk8QExrY";

        var zoom = 15;
        var width = 600;
        var lenght = 400;

        var src = `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lon}&zoom=${zoom}&size=${width}x${lenght}&markers=color:red%7Clabel:S%7C${this.lat},${this.lon}&sensor=false&key=${key}`
        var alt = 'Mapa estático de Google Maps';

        var section = $('main section');
        section.empty();

        var h3 = $('<h3>');
        h3.text('Mapa estático: ');
        section.append(h3);

        var img = $('<img>');
        img.attr('src', src);
        img.attr('alt', alt);

        section.append(img);
    }

    cargarXML(files) {
        var tipoTexto = "text/xml";
        var file = files[0];
        var areaVisualizacion = $('main section');
        areaVisualizacion.empty();

        var h3 = $('<h3>').text('Información sobre las rutas: ');
        areaVisualizacion.append(h3);

        if (file.type.match(tipoTexto)) {
            var lector = new FileReader();

            lector.onload = function (e) {
                var xmlString = e.target.result;
                var parser = new DOMParser();
                var xmlDOM = parser.parseFromString(xmlString, 'application/xml');

                var rutas = $('ruta', xmlDOM);

                for (let i = 0; i < rutas.length; i++) {
                    this.addRuta(rutas.get(i));
                }
            }.bind(this);

            lector.readAsText(file);
        }
        else {
            alert('El archivo introducido no tiene formato XML');
        }
    }

    addRuta(ruta) {
        var mainSection = $('main>section', document);
        var section = $('<article>').appendTo(mainSection);

        // Obtener los valores de los elementos dentro de la ruta
        var nombre = $('nombre', ruta).text();
        var tipo = $('tipo', ruta).text();
        var transporte = $('transporte', ruta).text();
        var fechaInicio = $('fechaInicio', ruta).text();
        var horaInicio = $('horaInicio', ruta).text();
        var duracion = $('duracion', ruta).text();
        duracion = this.durationATexto(duracion);

        var agencia = $('agencia', ruta).text();
        var descripcion = $('descripcion', ruta).text();
        var gruposAdecuados = $('grupoAdecuado', ruta).map(function () {
            return $(this).text();
        }).get();
        var lugarInicio = $('lugarInicio', ruta).text();
        var direccionInicio = $('direccionInicio', ruta).text();
        var coordenadasInicio = $('coordenadasInicio', ruta);
        var bibliografia = $('referencia', ruta).map(function () {
            let src = $(this).text();
            return `<a href="${src}">${src}</a>`;
        }).get();
        var recomendacion = $('recomendacion', ruta).text();
        var hitos = $('hito', ruta).map(function () {
            return {
                nombreHito: $('nombreHito', this).text(),
                descripcionHito: $('descripcionHito', this).text(),
                coordenadasHito: $('coordenadasInicio', this),
                distanciaHitoAnterior: $('distanciaHitoAnterior', this).text(),
                fotografiasHito: $('foto', this).map(function () {
                    let src = $(this).attr('src');
                    let alt = $(this).attr('alt');
                    let title = $(this).attr('title');
                    return `<img src="${src}" alt="${alt}" title="${title}" />`;
                }).get(),
                videosHito: $('video', this).map(function () {
                    let src = $(this).attr('src');
                    let title = $(this).attr('title');
                    let type = src.substring(src.lastIndexOf('.') + 1);

                    return `<video title="${title}" controls preload="auto">
                                <source src="${src}" type="video/${type}" />
                            </video>`;
                }).get()
            };
        }).get();

        // Agregar los valores al HTML
        section.append(`<h3>${nombre}</h3>`);
        section.append(`<p>Tipo: ${tipo}</p>`);
        section.append(`<p>Transporte: ${transporte}</p>`);
        section.append(`<p>Fecha de Inicio: ${fechaInicio}</p>`);
        section.append(`<p>Hora de Inicio: ${horaInicio}</p>`);
        section.append(`<p>Duración: ${duracion}</p>`);
        section.append(`<p>Agencia: ${agencia}</p>`);
        section.append(`<p>Descripción: ${descripcion}</p>`);
        section.append(`<p>Grupos Adecuados: ${gruposAdecuados.join(', ')}</p>`);
        section.append(`<p>Lugar de Inicio: ${lugarInicio}</p>`);
        section.append(`<p>Dirección de Inicio: ${direccionInicio}</p>`);
        section.append(`<p>Coordenadas de Inicio: Longitud ${coordenadasInicio.attr('longitud')}, Latitud ${coordenadasInicio.attr('latitud')}, Altitud ${coordenadasInicio.attr('altitud')}</p>`);
        section.append(`<pre>Bibliografía:\n${bibliografia.join('\n')}</pre>`);
        section.append(`<p>Recomendación: ${recomendacion}</p>`);

        // Agregar hitos
        var hitosSection = $('<section>').appendTo(section);
        hitosSection.append('<h4>Hitos:</h4>');
        for (let i = 0; i < hitos.length; i++) {
            var hito = hitos[i];
            var hitoArticle = $('<article>').appendTo(hitosSection);
            hitoArticle.append(`<h5>${hito.nombreHito}</h5>`);
            hitoArticle.append(`<p>Descripción: ${hito.descripcionHito}</p>`);
            hitoArticle.append(`<p>Coordenadas: Longitud ${hito.coordenadasHito.attr('longitud')}, Latitud ${hito.coordenadasHito.attr('latitud')}, Altitud ${hito.coordenadasHito.attr('altitud')}</p>`);
            hitoArticle.append();
            if (hito.distanciaHitoAnterior) {
                hitoArticle.append(`<p>Distancia al Hito Anterior: ${hito.distanciaHitoAnterior} ${$('distanciaHitoAnterior', ruta).attr('unidad')}</p>`);
            }
            var galeria = $('<article>').appendTo(hitoArticle);
            galeria.append('<h6>Fotos:</h6>');
            galeria.append(`${hito.fotografiasHito.join('\n')}`);
            if(hito.videosHito.length){
                galeria.append('<h6>Vídeos:</h6>');
                galeria.append(`${hito.videosHito.join('\n')}`);
            }
        }
    }

    durationATexto(xsdDuration) {
        const durationMatch = xsdDuration.match(/P(\d+Y)?(\d+M)?(\d+D)?T?(\d+H)?(\d+M)?/);
    
        const years = parseInt(durationMatch[1]) || 0;
        const months = parseInt(durationMatch[2]) || 0;
        const days = parseInt(durationMatch[3]) || 0;
        const hours = parseInt(durationMatch[4]) || 0;
        const minutes = parseInt(durationMatch[5]) || 0;
    
        const durationText = [];
        if (years > 0) {
            durationText.push(`${years} años`);
        }
        if (months > 0) {
            durationText.push(`${months} meses`);
        }
        if (days > 0) {
            durationText.push(`${days} días`);
        }
        if (hours > 0) {
            durationText.push(`${hours} horas`);
        }
        if (minutes > 0) {
            durationText.push(`${minutes} minutos`);
        }
    
        return durationText.join(' ');
    }

    cargarMapaGeo() {
        const apiKey = 'AIzaSyD-_ks7PKBNo9LOhIXSE4zYotqjk8QExrY';

        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=viajes.initMapGeo`;
        script.async = true;

        // Agrega el script al head del documento
        document.head.appendChild(script);
    }

    initMapGeo() {
        var container = $('main section').empty();

        var h3 = $('<h3>').text('Mapa dinámico: ');
        container.append(h3);

        var mapContainer = $('<section>');

        container.append(mapContainer);

        var map = new google.maps.Map(mapContainer[0], {
            center: new google.maps.LatLng(this.lat, this.lon),
            zoom: 15,
            mapTypeId: 'terrain'
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat, this.lon),
            map: map,
            title: 'Usted está aquí'
        });

    }

    cargarMapa() {
        const apiKey = 'AIzaSyD-_ks7PKBNo9LOhIXSE4zYotqjk8QExrY';

        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=viajes.initMap`;
        script.async = true;

        // Agrega el script al head del documento
        document.head.appendChild(script);
    }

    initMap() {
        var container = $('main section').empty();

        var h3 = $('<h3>').text('Mapa dinámico: ');
        container.append(h3);

        var mapContainer = $('<section>');

        container.append(mapContainer);

        var map = new google.maps.Map(mapContainer[0], {
            center: new google.maps.LatLng(-19.257753, 146.823688),
            zoom: 2,
            mapTypeId: 'terrain'
        });

        var bounds = new google.maps.LatLngBounds();

        var files = $('input[type=\'file\'][multiple]')[0].files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            const reader = new FileReader();
            console.log(file);
            if (file.name.endsWith(".kml")) {
                reader.onload = function (e) {
                    const kmlString = e.target.result;
                    const geoJSON = this.kmlToGeoJSON(kmlString);

                    var geojsonLayer = new google.maps.Data();
                    geojsonLayer.addGeoJson(geoJSON);

                    geojsonLayer.setStyle({
                        strokeColor: '#ff0000',
                        strokeWeight: 5
                    });

                    geojsonLayer.setMap(map);

                    geojsonLayer.forEach(function (feature) {
                        feature.getGeometry().forEachLatLng(function (latLng) {
                            bounds.extend(latLng);
                        });
                    });

                    map.fitBounds(bounds);
                }.bind(this);

                reader.readAsText(file);
            }else{
                alert('El archivo ' + file.name + ' no tiene formato KML y será ignorado.');
            }
        }
    }

    kmlToGeoJSON(kmlString) {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlString, 'application/xml');

        const placemark = kmlDoc.querySelector('Placemark');
        const lineString = placemark.querySelector('LineString');
        const coordinates = lineString.querySelector('coordinates').textContent.trim().split('\n');

        const lineCoordinates = coordinates.map(coord => {
            const [lon, lat, alt] = coord.split(',').map(parseFloat);
            return [lon, lat, alt];
        });

        const geoJSON = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: lineCoordinates
            },
        };

        return geoJSON;
    }

    cargarSVG(files) {
        var tipoImagenSVG = "image/svg+xml";
        var areaVisualizacion = $('main section').empty();

        var h3 = $('<h3>').text('Perfil de las rutas: ');
        areaVisualizacion.append(h3);

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            if (file.type === tipoImagenSVG) {
                var lector = new FileReader();

                lector.onload = function (evento) {
                    var svgElement = $(evento.target.result);
                    console.log(svgElement[svgElement.length - 1]);
                    var width = svgElement[svgElement.length - 1].getAttribute('width');
                    var height = svgElement[svgElement.length - 1].getAttribute('height');
                    svgElement.attr('viewBox', `0 0 ${width} ${height}`);

                    areaVisualizacion.append(svgElement);
                };

                lector.readAsText(file);
            } else {
                alert('El archivo ' + file.name + ' no tiene formato SVG y será ignorado.');
            }
        }
    }

    inicializarCarrusel(){
        const section = document.querySelector('main > section');

        var prev = document.createElement('button');
        prev.textContent = '<';
        section.appendChild(prev);

        var next = document.createElement('button');
        next.textContent = '>';
        section.appendChild(next);

        let curSlide = 3;

        const slides = document.querySelectorAll("body > main > section > img");
        let maxSlide = slides.length - 1;

        next.addEventListener("click", function () {
            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });

        prev.addEventListener("click", function () {
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }

            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }
}
var viajes = null;
document.addEventListener('DOMContentLoaded', function() {
    viajes = new Viajes();
    viajes.inicializarCarrusel();
});