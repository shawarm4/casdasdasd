<?php
    class Carrousel{
        private $capital;
        private $pais; 
        private $imagenes = array();      

        public function __construct($capital, $pais){
            $this->capital = $capital;
            $this->pais = $pais;
        }

        public function loadImagenes() {
            $params = array(
                'api_key'   => '6b2cbc54c0255f646d93664ed59ccc2a',
                'method'    => 'flickr.photos.search',
                'text'      => $this->capital . ' ' . $this->pais,
                'per_page'  => 10,
                'format'    => 'php_serial',
            );
    
            $url = 'https://api.flickr.com/services/rest/?' . http_build_query($params);

            $response = file_get_contents($url);
            $data = unserialize($response);
    
            if ($data['stat'] == 'ok' && isset($data['photos']['photo'])) {
                foreach ($data['photos']['photo'] as $imagen) {
                    $imagen_url = "https://farm{$imagen['farm']}.staticflickr.com/{$imagen['server']}/{$imagen['id']}_{$imagen['secret']}.jpg";
                    $imagen_title = $imagen['title'];
                    $this->imagenes[] = array('url' => $imagen_url, 'title' => $imagen_title);
                }
            } else {
                echo 'Error al obtener las imágenes.';
            }
        }

        public function getImagenes() {
            foreach($this->imagenes as $img){
                echo "<img src=\"{$img['url']}\" alt=\"{$img['title']}\" />";
                echo '';
            }
        }
    }

    class Moneda{
        private $cambio; 
        private $local;   

        public function __construct($cambio, $local){
            $this->cambio = $cambio;
            $this->local = $local;
        }

        public function comprobarCambio(){
            $url = "https://v6.exchangerate-api.com/v6/ee7cfe9893462288fb88416b/latest/$this->cambio";
            $data = file_get_contents($url);
            $data = json_decode($data, true);

            if ($data['result'] === 'success') {
                $tasaCambio = $data['conversion_rates'][$this->local];
        
                echo "La tasa de cambio para 1 $this->cambio es $tasaCambio $this->local";
            } else {
                echo "Error en la solicitud de tipo de cambio";
            }
        }        
    }

    $carrusel = new Carrousel('Harare', 'Zimbabue');
    $carrusel->loadImagenes();
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name ="author" content ="Martin Cancio Barrera" />
        <meta name ="description" content ="Escritorio virtual para la asignatura Software y estándares para la web" />
        <meta name ="keywords" content ="SEW,Software,HTML,CSS,JS,PHP,XML" />
        <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
        <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
        <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
        <link rel="icon" type="image/ico" href="multimedia/favicon.ico">

        <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
            integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
            crossorigin="anonymous">
        </script>
        <script src="js/viajes.js"></script>   
                      
        <title>Escritorio Virtual</title>
    </head>

    <body>
        <header>
            <h1>Escritorio Virtual</h1>
            <nav>
                <a href="index.html" accesskey="I" tabindex="1">Inicio</a>
                <a href="sobremi.html" accesskey="S" tabindex="2">Sobre mi</a>
                <a href="noticias.html" accesskey="N" tabindex="3">Noticias</a>
                <a href="agenda.html" accesskey="A" tabindex="4">Agenda</a>
                <a href="meteorologia.html" accesskey="M" tabindex="5">Meteorología</a>
                <a href="viajes.html" accesskey="V" tabindex="6">Viajes</a>
                <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
            </nav>
        </header>

        <section>
            <h2>Viajes</h2>
            <label for="estatico">Obtener mapa estático:</label>
            <input id="estatico" type="button" value="Mapa estático" onclick="viajes.getMapaEstatico()" />

            <label for="dinamico">Obtener mapa dinámico:</label>
            <input id="dinamico" type="button" value="Mapa dinámico" onclick="viajes.cargarMapaGeo()" />

            <label for="cargar">Cargar archivo XML:</label>
            <input id="cargar" type="file" onchange="viajes.cargarXML(this.files)" />
            
            <label for="kmls">Cargar archivos KML:</label>
            <input id="kmls" type="file" onchange="viajes.cargarMapa()" multiple />

            <label for="svgs">Cargar archivos SVG:</label>
            <input id="svgs" type="file" onchange="viajes.cargarSVG(this.files)" multiple />

            <?php                
                $moneda = new Moneda('EUR', 'ZWL');
                $moneda->comprobarCambio();
            ?>
        </section>     
        
        <main>
            <section>
                <h3>Carrusel de imagenes:</h3>
                <?php $carrusel->getImagenes() ?>
            </section>
        </main>
    </body>
</html>