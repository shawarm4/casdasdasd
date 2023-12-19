class Fondo{
    constructor (nombrePais, nombreCapital, coordenadas){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.coordenadas = coordenadas;
    }

    getImage(){
        const flickrAPI = "https://api.flickr.com/services/rest/";
        const apiKey = "6b2cbc54c0255f646d93664ed59ccc2a";
        const tags = `${this.nombrePais}, ${this.nombreCapital}`;
        const coords = this.coordenadas.split(',');

        $.getJSON(flickrAPI, {
            method: "flickr.photos.search",
            api_key: apiKey,
            tags: tags,
            lat: coords[0],
            lon: coords[1],
            format: "json",
            nojsoncallback: 1
        })
        .done(function(data) {
            const primeraFoto = data.photos.photo[1];
            const imagenUrl = `https://live.staticflickr.com/${primeraFoto.server}/${primeraFoto.id}_${primeraFoto.secret}_c.jpg`;

            $('body')
                .css('background-image', 'url(' + imagenUrl + ')')
                .css('background-size','cover')
        });
    }
}

var f = new Fondo('Zimbabue', 'Harare', '-17.829167, 31.052222');
f.getImage();