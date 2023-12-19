<?php
class eii
{
    private $server;
    private $user;
    private $pass;
    private $dbname;

    public function __construct()
    {
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "eii";
    }

    public function getAlumnos()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT IDAlumno, nombre FROM alumno";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value=" . $row['IDAlumno'] . ">" . $row['nombre'] . "</option>";
                echo "";
            }
            $result->free();
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $conn->close();
    }

    public function getAsignaturas()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT IDAsignatura, NombreAsignatura FROM Asignatura";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value=" . $row['IDAsignatura'] . ">" . $row['NombreAsignatura'] . "</option>";
                echo "";
            }
            $result->free();
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $conn->close();
    }

    public function borrarAsignatura($id)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "DELETE FROM Asignatura WHERE IDAsignatura=?";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("i", $id);

        $stmt->execute();

        $stmt->close();
        $conn->close();
    }

    public function getCursos()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT IDCurso, NombreCurso FROM Curso";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value=" . $row['IDCurso'] . ">" . $row['NombreCurso'] . "</option>";
                echo "";
            }
            $result->free();
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $stmt->close();
        $conn->close();
    }

    public function getNotasAlumno($idAlumno)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sqlNombre = "SELECT nombre FROM alumno WHERE IDAlumno=?";

        $stmt = $conn->prepare($sqlNombre);

        $stmt->bind_param("i", $idAlumno);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $nombre = $row['nombre'];
        }

        $sql = "SELECT a.NombreAsignatura, a.Semestre, a.creditos, me.nota FROM MatriculadoEn me
                        INNER JOIN Asignatura a ON me.IDAsignatura=a.IDAsignatura
                        WHERE me.IDAlumno=?";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("i", $idAlumno);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            echo '<table>';
            echo "<caption>Notas de $nombre </caption>";
            echo '<thead>';
            echo '<tr>';
            echo '<th scope="col" id="asi">Nombre de la asignatura</th>';
            echo '<th scope="col" id="sem">Semestre</th>';
            echo '<th scope="col" id="cre">Créditos</th>';
            echo '<th scope="col" id="not">Nota</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            foreach ($result as $row) {
                echo '<tr>';
                echo '<td headers="asi">' . htmlspecialchars($row['NombreAsignatura']) . '</td>';
                echo '<td headers="sem">' . htmlspecialchars($row['Semestre']) . '</td>';
                echo '<td headers="cre">' . htmlspecialchars($row['creditos']) . '</td>';
                echo '<td headers="not">' . htmlspecialchars($row['nota']) . '</td>';
                echo '</tr>';
            }

            echo '</tbody>';
            echo '</table>';
        } else {
            echo "<script>alert('No se encontraron resultados')</script>";
        }

        $stmt->close();
        $conn->close();
    }

    function getProfesores()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT IDProfesor, NombreProfesor FROM profesor";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value=" . $row['IDProfesor'] . ">" . $row['NombreProfesor'] . "</option>";
                echo "";
            }
            $result->free();
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $stmt->close();
        $conn->close();
    }

    public function getAsignaturasProfesor($idProfesor)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "SELECT a.IDAsignatura, a.NombreAsignatura FROM Profesor p
                        INNER JOIN Imparte i ON p.IDProfesor=i.IDProfesor
                        INNER JOIN Asignatura a ON a.IDAsignatura=i.IDAsignatura
                        WHERE p.IDProfesor=?";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("i", $idProfesor);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value=" . $row['IDAsignatura'] . ">" . $row['NombreAsignatura'] . "</option>";
                echo "";
            }
            $result->free();
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $stmt->close();
        $conn->close();
    }

    public function registrarAsignatura($curso, $nombreAsignatura, $semestre, $creditos)
    {
        if ($nombreAsignatura == "") {
            echo "<script>alert('El nombre de la asignatura no puede estar vacío')</script>";
            return;
        }

        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "INSERT INTO Asignatura (IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("sssi", $curso, $nombreAsignatura, $semestre, $creditos);

        $stmt->execute();

        $stmt->close();
        $conn->close();
    }

    public function getInfoProfesor($id)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sqlNombre = "SELECT nombreprofesor FROM profesor WHERE IDProfesor=?";

        $stmt = $conn->prepare($sqlNombre);

        $stmt->bind_param("i", $id);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $nombre = $row['nombreprofesor'];
        }

        $sqlAsignaturas = "SELECT c.nombrecurso, a.nombreasignatura, a.semestre, a.creditos FROM Imparte i
                                    INNER JOIN Asignatura a ON i.IDAsignatura=a.IDAsignatura
                                    INNER JOIN Curso c ON c.idcurso=a.idcurso
                                    WHERE i.IDProfesor=?";
        $stmt = $conn->prepare($sqlAsignaturas);

        $stmt->bind_param("i", $id);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            echo '<table>';
            echo '<thead>';
            echo "<caption>Asignaturas de $nombre</caption>";
            echo '<tr>';
            echo '<th scope="col" id="cur">Curso</th>';
            echo '<th scope="col" id="asi">Nombre de la asignatura</th>';
            echo '<th scope="col" id="sem">Semestre</th>';
            echo '<th scope="col" id="cre">Créditos</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            foreach ($result as $row) {
                echo '<tr>';
                echo '<td headers="cur">' . htmlspecialchars($row['nombrecurso']) . '</td>';
                echo '<td headers="asi">' . htmlspecialchars($row['nombreasignatura']) . '</td>';
                echo '<td headers="sem">' . htmlspecialchars($row['semestre']) . '</td>';
                echo '<td headers="cre">' . htmlspecialchars($row['creditos']) . '</td>';
                echo '</tr>';
            }

            echo '</tbody>';
            echo '</table>';
        } else {
            echo "<script>alert('Error al obtener los registros')</script>";
        }

        $sqlAsignaturas = "SELECT m.IDAlumno, m.Nombre, a.IDAsignatura , a.NombreAsignatura FROM Imparte i 
                                    INNER JOIN Asignatura a ON i.IDAsignatura=a.IDAsignatura
                                    INNER JOIN MatriculadoEn me ON me.IDAsignatura=a.IDAsignatura
                                    INNER JOIN Alumno m ON m.IDAlumno=me.IDAlumno
                                    WHERE i.IDProfesor=?";
        $stmt = $conn->prepare($sqlAsignaturas);

        $stmt->bind_param("i", $id);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            echo '<article>';
            echo '<h3>Calificar alumno</h3>';
            echo '<form action="#" method="post" name="calificarAlumno">';
            echo "<label for='alumnoProf'>Alumnos de $nombre: </label>";
            echo '<select id="alumnoProf" name="alumnoProf">';
            foreach ($result as $row) {
                $idAsig = $row['IDAsignatura'];
                echo "<option value=" . $row['IDAlumno'] . ">" . $row['Nombre'] . " (" . $row['NombreAsignatura'] . ")" . "</option>";
                echo "";
            }
            echo '</select>';
            echo "<input type='hidden' name ='idAsig' value=" . $idAsig . ">";
            echo "<label for='notAlumno'>Calificación del alumno: </label>";
            echo '<input type="number" id="notAlumno" name="notAlumno" min="0" max="10" required>';
            echo "<label for='submit1'>Calificación del alumno: </label>";
            echo '<input type="submit" id="submit1" name="calificarAlumno" value="Calificar">';
            echo '</form>';
            echo '</article>';
        } else {
            echo "<script>alert('Error al obtener las asignaturas')</script>";
        }

        $stmt->close();
        $conn->close();
    }

    public function calificarAlumno($nota, $idAlumno, $idAsig)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sqlNombre = "UPDATE matriculadoEN SET nota=? WHERE IDAlumno=? AND IDAsignatura=?";

        $stmt = $conn->prepare($sqlNombre);

        $stmt->bind_param("iii", $nota, $idAlumno, $idAsig);

        $stmt->execute();

        $result = $stmt->get_result();
    }

    public function importCSVFiles($csvFiles)
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        foreach ($csvFiles['tmp_name'] as $key => $tmp_name) {
            $file_name = $csvFiles['name'][$key];
            $infoArchivo = pathinfo($file_name);
            if ($infoArchivo['extension'] != 'csv') {
                echo "<script>alert('El archivo " . $infoArchivo['extension'] . " no es csv')</script>";
                return;
            }
            var_dump($infoArchivo);
            $tabla = $infoArchivo['filename'];

            move_uploaded_file($tmp_name, $file_name);

            $importQuery = "LOAD DATA INFILE 'C:/xampp/htdocs/EscritorioVirtual/" . $file_name . "' INTO TABLE $tabla FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS";

            if (!$conn->query($importQuery)) {
                echo '<script>Error al importar datos desde CSV </script>';
            }
        }

        foreach ($csvFiles['tmp_name'] as $tmp_name) {
            unlink($tmp_name);
        }

        echo "Datos importados correctamente.";
    }

    public function exportCSVFile($tableName)
    {
        $tempDir = 'temp_csv';

        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        }

        $result = $conn->query("SHOW TABLES LIKE '$tableName'");
        if ($result->num_rows == 0) {
            die("La tabla '$tableName' no existe.");
        }

        if (!file_exists($tempDir)) {
            mkdir($tempDir);
        }

        $csvFileName = $tempDir . '/' . $tableName . '.csv';
        $csvFile = fopen($csvFileName, 'w');

        $result = $conn->query("SELECT * FROM $tableName");
        if ($result) {
            $headers = array();
            while ($row = $result->fetch_field()) {
                $headers[] = $row->name;
            }
            fputcsv($csvFile, $headers);

            while ($row = $result->fetch_assoc()) {
                fputcsv($csvFile, $row);
            }

            fclose($csvFile);

            header('Content-Type: text/csv');
            header('Content-disposition: attachment; filename=' . $tableName . '.csv');
            header('Content-Length: ' . filesize($csvFileName));
            readfile($csvFileName);

            unlink($csvFileName);
        } else {
            die("Error al ejecutar la consulta: " . $conn->error);
        }

        $conn->close();
    }


    public function getTables()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        $result = $conn->query('SHOW TABLES');
        if (!$result) {
            die("Error al obtener las tablas: " . $conn->error);
        }

        $tables = [];
        while ($row = $result->fetch_row()) {
            $tables[] = $row[0];
        }
        foreach ($tables as $table) {
            echo '<option value="' . $table . '">' . $table . '</option>';
        }

        $conn->close();
    }

    public function vaciarBD()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        $conn->query('SET foreign_key_checks = 0');

        $tables = ['MatriculadoEn', 'Imparte', 'Profesor', 'Asignatura', 'Curso', 'Alumno'];

        foreach ($tables as $table) {
            $conn->query("DELETE FROM $table");
        }

        $conn->query('SET foreign_key_checks = 1');
    }

    public function initBD()
    {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        $this->ejecutarScript($conn, "php/schema.sql");
        $this->ejecutarScript($conn, "php/data.sql");
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
            echo "Error al ejecutar el script: " . $conn->error;
        }
    }
}

$eii = new Eii();

if (isset($_POST['anadirAsignatura'])) {
    $curso = $_POST['cursoAsignatura'];
    $nombreAsignatura = $_POST['nombreAsignatura'];
    $semestre = $_POST['semestreAsignatura'];
    $creditos = $_POST['creditosAsignatura'];
    $creditos = intval($creditos);

    $eii->registrarAsignatura($curso, $nombreAsignatura, $semestre, $creditos);
} else if (isset($_POST['eliminarAsignatura'])) {
    $id = $_POST['idAsignatura'];

    $eii->borrarAsignatura($id);
} else if (isset($_POST['import'])) {
    $eii->importCSVFiles($_FILES['csv_files']);
} else if (isset($_POST['export'])) {
    $eii->exportCSVFile($_POST['idTabla']);
} else if (isset($_POST['Vaciar'])) {
    $eii->vaciarBD();
} else if (isset($_POST['init'])) {
    $eii->initBD();
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Martin Cancio Barrera" />
    <meta name="description" content="Escritorio virtual para la asignatura Sowftware y Estándares para la Web" />
    <meta name="keywords" content="SEW,Software,HTML,CSS,JS,PHP,XML" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/juegos.css" />
    <link rel="stylesheet" type="text/css" href="estilo/eii.css" />
    <link rel="icon" type="image/ico" href="multimedia/favicon.ico">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous">
    </script>

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
        <a href="crucigrama.php">Crucigrama matemático</a>
        <a href="api.html">Paint</a>
    </section>

    <main>
        <section>
            <h2>Profesor</h2>
            <article>
                <h3>Ver asignaturas y alumnos por profesor</h3>
                <form action="#" method="post" name="infoProfesor">
                    <label for="profesor">Profesor:</label>
                    <select id="profesor" name="idProf">
                        <?php $eii->getProfesores() ?>
                    </select>
                    <label for="infoProfesor">Ver información:</label>
                    <input id="infoProfesor" type="Submit" value="Información" name="infoProfesor" />
                </form>
            </article>
            <?php
            if (isset($_POST['infoProfesor'])) {
                $id = $_POST['idProf'];

                $eii->getInfoProfesor($id);
            } else if (isset($_POST['calificarAlumno'])) {
                $idAlumno = $_POST['alumnoProf'];
                $idAsig = $_POST['idAsig'];
                $nota = $_POST['notAlumno'];

                $eii->calificarAlumno($nota, $idAlumno, $idAsig);
            }
            ?>
        </section>

        <section>
            <h2>Alumno</h2>
            <article>
                <h3>Ver notas de alumnos</h3>
                <form action="#" method="post" name="verNotas">
                    <label for="alumnos">Alumno:</label>
                    <select id="alumnos" name="idAlumno">
                        <?php $eii->getAlumnos() ?>
                    </select>

                    <label for="vernotas">Ver notas:</label>
                    <input id="vernotas" type="Submit" value="Notas" name="verNotas" />
                </form>
            </article>
            <?php
            if (isset($_POST['verNotas'])) {
                $id = $_POST['idAlumno'];

                $eii->getNotasAlumno($id);
            }
            ?>
        </section>

        <section>
            <h2>Administrador de la EII</h2>
            <article>
                <h3>Añadir asignatura</h3>
                <form action="#" method="post" name="anadirasignatura">
                    <label for="cursoAsignatura">Curso: </label>
                    <select id="cursoAsignatura" name="cursoAsignatura">
                        <?php $eii->getCursos() ?>
                    </select>

                    <label for="nombreAsignatura">Nombre de la asignatura: </label>
                    <input id="nombreAsignatura" name="nombreAsignatura" type="text" maxlength="100" required>

                    <label for="semestreAsignatura">Semestre: </label>
                    <select id="semestreAsignatura" name="semestreAsignatura">
                        <option value="Primero">Primero</option>
                        <option value="Segundo">Segundo</option>
                    </select>

                    <label for="creditosAsignatura">Créditos: </label>
                    <select id="creditosAsignatura" name="creditosAsignatura">
                        <option value=6>6</option>
                        <option value=12>12</option>
                    </select>

                    <label for="submit2">Registrar la nueva asignatura: </label>
                    <input id="submit2" type="submit" name="anadirAsignatura" value="Registrar">
                </form>
            </article>
            <article>
                <h3>Eliminar asignatura</h3>
                <form action="#" method="post" name="eliminarAsignatura">
                    <label for="idAsignatura">Asignatura: </label>
                    <select id="idAsignatura" name="idAsignatura">
                        <?php $eii->getAsignaturas() ?>
                    </select>

                    <label for="submit3">Eliminar asignatura: </label>
                    <input id="submit3" type="submit" name="eliminarAsignatura" value="Eliminar">
                </form>
            </article>
        </section>

        <section>
            <h2>Configuración</h2>
            <article>
                <h3>Inicializar la base de datos</h3>
                <form action="#" method="post" name="init">
                    <label for="submit4">Inicializar BD</label>
                    <input id="submit4" type="submit" name="init" value="Inicializar">
                </form>
            </article>
            <article>
                <h3>Importar datos a la BD desde CSV (Orden para evitar fallos de integridad: Alumno -> Profesor -> Curso -> Asignatura -> Imparte -> MatriculadoEn)</h3>
                <form action="#" method="post" name="import" enctype="multipart/form-data">
                    <label for="import">Selecciona los archivos CSV</label>
                    <input id="import" type="file" name="csv_files[]" multiple accept=".csv" required />

                    <label for="submit5">Importa los datos</label>
                    <input id="submit5" type="submit" name="import" value="Importar">
                </form>
            </article>
            <article>
                <h3>Exportar datos de la BD a CSV</h3>
                <form action="#" method="post" name="export">
                    <label for="idTabla">Asignatura: </label>
                    <select id="idTabla" name="idTabla">
                        <?php $eii->getTables() ?>
                    </select>
                    <label for="submit6">Exporta la tabla seleccionada a .csv </label>
                    <input id="submit6" type="submit" name="export" value="Exportar">
                </form>
            </article>
            <article>
                <h3>Vaciar la BD</h3>
                <form action="#" method="post" name="Vaciar">
                    <label for="submit7">Importa los datos</label>
                    <input id="submit7" type="submit" name="Vaciar" value="Vaciar">
                </form>
            </article>
        </section>
    </main>
</body>

</html>