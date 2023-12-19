"use strict"
class Pais{
    constructor (nombre, capital, poblacion){
        this.nombre = nombre
        this.capital = capital
        this.poblacion = poblacion
    }

    rellenarCampos(formaDeGobierno, coordenadasCapital, religionMayoritaria){
        this.formaDeGobierno = formaDeGobierno
        this.coordenadasCapital = coordenadasCapital
        this.religionMayoritaria = religionMayoritaria
    }

    getNombre(){
        return this.nombre
    }

    getCapital(){
        return this.capital
    }

    getPoblacion(){
        return this.poblacion
    }

    getFormaDeGobierno(){
        return this.formaDeGobierno
    }

    getCoordenadasCapital(){
        return this.coordenadasCapital
    }

    getReligionMayoritaria(){
        return this.religionMayoritaria
    }

    getInfoSecundaria(){
        return "<ul><li>Habitantes: " + this.poblacion + "</li><li>Forma de gobierno: " + this.formaDeGobierno + "</li><li>Religión mayoritaria: " + this.religionMayoritaria + "</li></ul>"
    }

    writeCoordenadas(){
        document.write("<p>Coordenadas: " + this.getCoordenadasCapital() + "</p>")
    }

    getMeteo(){
        const apiKey = "0b65018de0c0057989c7a14653959f24";
        const coords = this.coordenadasCapital.split(',');
        const OpenWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${apiKey}`;

        $.ajax({
            url: OpenWeatherURL,
            method: 'GET',
            dataType: 'json',
            data:{
                units: 'metric'
            },
            success: function(data) {
                for(let i = 0 ; i < data.list.length ; i++){

                    var article = $('<article>');

                    var list = $('<ul>');

                    var header = $('<h3>').text(data.list[i].dt_txt);
                    article.append(header);

                    var icon = $('<img>');
                    icon.attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
                    icon.attr('alt', data.list[i].weather[0].description);
                    article.append(icon);

                    list.append(`<li>Temperatura Máxima: ${data.list[i].main.temp_max} °C</li>`);
                    list.append(`<li>Temperatura Mínima: ${data.list[i].main.temp_min} °C</li>`);
                    list.append(`<li>Humedad: ${data.list[i].main.humidity} %</li>`);

                    if (data.list[i].rain) {
                        list.append(`<li>Lluvia en las últimas 24h: ${data.list[i].rain['3h']} L/m³</li>`);
                    } else {
                        list.append('<li>No hay datos de lluvia disponibles</li>');
                    }

                    article.append(list);

                    $('main section').append(article);
                }
            },
            error: function(error) {
                console.log('Error al obtener datos de OpenWeatherMap: ', error);
            }
        });
    }
}

var pais = new Pais("Zimbabue","Harare", 14438802)
pais.rellenarCampos("Semipresidencialismo", "-17.829167,31.052222", "Cristianismo")

document.write("<section>")
document.write("<h2>Información sobre " + pais.getNombre() + "</h2>")
document.write("<p>Capital: " + pais.getCapital() + "</p>")
pais.writeCoordenadas()
document.write(pais.getInfoSecundaria())
document.write("</section>")

pais.getMeteo()
