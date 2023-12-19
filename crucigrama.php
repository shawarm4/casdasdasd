<?php
class Record
{
    private $server;
    private $user;
    private $pass;
    private $dbname;

    public $nombre;
    public $apellidos;
    public $nivel;
    public $tiempo;

    public function __construct()
    {
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "records";

        $this->initBD();
    }

    public function insertRecord()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("ssss", $this->nombre, $this->apellidos, $this->nivel, $this->tiempo);

        $stmt->execute();

        $stmt->close();
        $conn->close();
    }

    public function getRecords()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT nombre, apellidos, tiempo FROM registro WHERE nivel=? ORDER BY tiempo ASC LIMIT 10";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("s", $this->nivel);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            echo "<section>";
            echo "  <h3>Mejores 10 del nivel {$this->nivel}</h3>";
            echo "  <ol>";
            while ($row = $result->fetch_assoc()) {
                echo "<li>Nombre: {$row['nombre']} Apellidos: {$row['apellidos']} Tiempo: {$row['tiempo']}</li>";
            }
            echo "  </ol>";
            echo "</section>";
            $result->free();
        } else {
            echo '<script>alert("Error al obtener los registros")</script>';
        }

        $conn->close();
    }

    private function initBD()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        $this->ejecutarScript($conn, "php/registro.sql");
    }

    private function ejecutarScript($conn, $scriptPath)
    {
        $scriptContent = file_get_contents($scriptPath);

        if ($conn->multi_query($scriptContent)) {
            do {
                if ($result = $conn->store_result()) {
                    $result->free();
                }
            } while ($conn->more_results() && $conn->next_result());
        } else {
            echo '<script>alert("Error al inicializar la BD")</script>';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Martin Cancio Barrera" />
    <meta name="description" content="Escritorio virtual para la asignatura Sowftware y estándares para la web" />
    <meta name="keywords" content="SEW,Software,HTML,CSS,JS,PHP,XML" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/juegos.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo_botonera.css" />
    <link rel="icon" type="image/ico" href="multimedia/favicon.ico">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous">
    </script>
    <script src="js/crucigrama.js"></script>

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
            <a href="viajes.php" accesskey="V" tabindex="6">Viajes</a>
            <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
        </nav>
    </header>
    <section>
        <h2>Menú de juegos</h2>
        <a href="memoria.html">Memoria</a>
        <a href="sudoku.html">Sudoku</a>
        <a href="api.html">Paint</a>
        <a href="eii.php">Gestor de la EII</a>
    </section>
    <section>
        <h2>Explicación del juego</h2>
        <p>
            En el Crucigrama Matemático, el jugador debe completar una cuadrícula llenando cada casilla con un número que resuelva las ecuaciones proporcionadas como pistas.
            Estas ecuaciones, en lugar de definiciones de palabras, requieren operaciones matemáticas para determinar el valor correcto.
            Los números se intersecan en la cuadrícula, y la resolución precisa de cada ecuación es esencial para garantizar que los valores en las intersecciones sean consistentes.

            En el Crucigrama Matemático, imagina que una pista te presenta la ecuación "3 + _ = 8".
            Para completar esta casilla, deduces que el espacio en blanco debe contener el número 5. Ahora, si otra pista cruza con esta y presenta la ecuación "2 x _ = 10",
            puedes determinar que el espacio en blanco debe ser 5, ya que 2 multiplicado por 5 es igual a 10
        </p>
    </section>
    <main>
    </main>

    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>
    <?php
    if (count($_POST) > 0) {
        $record = new Record();
        $record->nombre = $_POST['nombre'];
        $record->apellidos = $_POST['apellidos'];
        $record->nivel = $_POST['nivel'];
        $record->tiempo = $_POST['tiempo'];

        $record->insertRecord();
        $record->getRecords();

        exit;
    }
    ?>
</body>

</html>