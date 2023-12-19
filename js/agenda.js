class Agenda {
    constructor(url) {
        this.url = url;
        this.lastApiCall = null; 
        this.lastApiResult = null; 
        this.interval = 10 * 60 * 1000; // Intervalo de 10 minutos
    }

    getInfoCarreras() {
        const now = new Date().getTime();
        const self = this;

        if (self.lastApiCall && now - self.lastApiCall < self.interval) {
            return self.lastApiResult;
        }

        const ergastURL = "https://ergast.com/api/f1/current";

        $.ajax({
            url: ergastURL,
            method: 'GET',
            dataType: 'xml',
            data: {
                units: 'metric'
            },
            success: function (data) {
                self.lastApiCall = new Date().getTime();
                self.lastApiResult = data;

                $('section article').empty();   //Se borran los articulos anteriores con cada llamada 
                $('Race', data).each(function () {
                    var raceName = $('RaceName', this).text();
                    var circuitName = $('CircuitName', this).text();
                    var location = $('Location', this);
                    var latitude = location.attr('lat');
                    var longitude = location.attr('long');
                    var date = $('Date', this).first().text();

                    var article = $('<article>');
                    var nombre = $('<h3>').text(raceName);
                    article.append(nombre);

                    var list = $('<ul>');
                    list.append(`<li>Circuito: ${circuitName}</li>`);
                    list.append(`<li>Coordenadas: ${latitude}, ${longitude}</li>`);
                    list.append(`<li>Fecha: ${date}</li>`);

                    article.append(list);
                    $('section').append(article);
                });
            },
            error: function (error) {
                console.log('Error al obtener datos de Ergast: ', error);
            }
        });
    }
}

var agenda = new Agenda();
