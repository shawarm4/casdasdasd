DELETE FROM MatriculadoEn;
DELETE FROM Imparte;
DELETE FROM Asignatura;
DELETE FROM Curso;
DELETE FROM Profesor;
DELETE FROM Alumno;

/*------------------------------------------------------------CURSOS------------------------------------------------------------*/
INSERT INTO Curso(IDCurso, NombreCurso) VALUES (1, 'Primero');
INSERT INTO Curso(IDCurso, NombreCurso) VALUES (2, 'Segundo');
INSERT INTO Curso(IDCurso, NombreCurso) VALUES (3, 'Tercero');
INSERT INTO Curso(IDCurso, NombreCurso) VALUES (4, 'Cuarto');

/*------------------------------------------------------------ASIGNATURAS------------------------------------------------------------*/
/* PRIMERO */
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (1, 1,'Álgebra lineal','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (2, 1,'Cálculo','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (3, 1,'Empresa','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (4, 1,'Fundamentos de Informática','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (5, 1,'Introducción a la Programación','Primero', 6);

INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (6, 1,'Ondas y Electromagnetismo','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (7, 1,'Estadística','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (8, 1,'Fundamentos de Computadores y Redes','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (9, 1,'Autómatas y Matemáticas Discretas','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (10, 1,'Metodología de la Programación','Segundo', 6);

/* SEGUNDO */
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (11, 2,'Ondas y Electromagnetismo','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (12, 2,'Arquitectura de Computadores','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (13, 2,'Estructuras de Datos','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (14, 2,'Autómatas y Matemáticas Discretas','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (15, 2,'Comunicación Persona Máquina','Primero', 6);

INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (16, 2,'Sistemas Operativos','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (17, 2,'Tecnologías y Paradigmas de la Programación','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (18, 2,'Bases de Datos','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (19, 2,'Computación numérica','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (20, 2,'Algoritmia','Segundo', 6);

/* TERCERO */
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (21, 3,'Repositorios de Información','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (22, 3,'Software y Estándares para la Web','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (23, 3,'Ingeniería del Proceso Software','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (24, 3,'Diseño del Software','Primero', 6);

INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (25, 3,'Sistemas Distribuidos e Internet','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (26, 3,'Administración de Sistemas y Redes','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (27, 3,'Arquitectura del Software ','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (28, 3,'Diseño de Lenguajes de Programación','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (29, 3,'Seguridad de Sistemas Informáticos ','Segundo', 6);

/** CUARTO */
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (30, 4,'Sistemas Inteligentes','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (31, 4,'Ingeniería de requisitos','Primero', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (32, 4,'Calidad, Validación y Verificación del Software','Primero', 6);

INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (33, 4,'Dirección y Planificación de Proyectos Informáticos','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (34, 4,'Aspectos sociales, legales, éticos y profesionales de la Informática ','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (35, 4,'Prácticas en Empresa','Segundo', 6);
INSERT INTO Asignatura(IDAsignatura, IDCurso, NombreAsignatura, Semestre, Creditos) VALUES (36, 4,'Trabajo Fin de Grado','Segundo', 12);

/*------------------------------------------------------------PROFESORES------------------------------------------------------------*/
/*PRIMERO*/
    /*Álgebra lineal*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (40, 'Arturo Santamaria Gutiérrez', 'asantamaria@uniovi.es');
    /*Cálculo*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (41, 'Manuel José Fernández Gutiérrez', 'mjfg@uniovi.es');
    /*Empresa*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (42, 'María Begoña López Fernández', 'blopez@uniovi.es');
    /*Fundamentos de Informática*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (43, 'Oliverio González Alonso', 'oliver@uniovi.es');
    /*Introducción a la programación*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (44, 'María Cándida Luengo Díez', 'candi@uniovi.es');
    /*Ondas y electromagnetismo*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (45, 'María José Pérez Fernández', 'mjp@uniovi.es');
    /*Estadística*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (46, 'María Asunción Lubiano Gómez', 'lubiano@uniovi.es');
    /*Fundamentos de Computadores y Redes*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (47, 'Jose María López López', 'chechu@uniovi.es');
    /*Autómatas y Matemáticas Discretas*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (48, 'Elías Fernández-Combarro Álvarez', 'efernandezca@uniovi.es');
    /*Metodología de la Programación*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (49, 'Sara Vecino García', 'vecinosara@uniovi.es');

/*SEGUNDO*/
    /*Tecnología Electrónica de Computadores*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (50, 'Marta Valledor Llopis', 'valledormarta@uniovi.es');
    /*Arquitectura de Computadores*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (51, 'Jose Ramón Arias García', 'ariasjr@uniovi.es');    
    /*Estructuras de Datos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (52, 'María Puerto Paule Ruiz', 'paule@uniovi.es');    
    /*Comunicación Persona Máquina*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (53, 'María del Carmen Suárez Torrente', 'macamen@uniovi.es');
    /*Computabilidad*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (54, 'Miguel Ángel González Fernández', 'mig@uniovi.es');
    /*Sistemas Operativos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (55, 'Miguel Riesco Albizu', 'albizu@uniovi.es');
    /*Tecnologías y  Paradigmas de la Programación*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (56, 'Javier Escalada Gómez', 'escaladajavier@uniovi.es');
    /*Bases de Datos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (57, 'Darío Álvarez Gutiérrez', 'darioa@uniovi.es');
    /*Computación numérica*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (58, 'Fernando Sánchez Lasheras', 'sanchezfernando@uniovi.es');
    /*Algoritmia*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (59, 'Juan Ramón Pérez Pérez', 'jrpp@uniovi.es');

/*TERCERA*/
    /*Repositorios de Información*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (60, 'Sara Vecino García', 'vecinosara@uniovi.es');

    /*Software y Estándares para la Web*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (61, 'Juan Manuel Cueva Lovelle', 'cueva@uniovi.es');
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (62, 'Jaime Solís Martínez', 'solisjaime@uniovi.es');
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (63, 'Begoña Cristina Pelayo García-Bustelo', 'crispelayo@uniovi.es');

    /*Ingeniería del Proceso de Software*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (64, 'Claudio A. de la Riva Álvarez', 'claudio@uniovi.es');

    /*Diseño del Software*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (65, 'Sara Vecino García', 'vecinosara@uniovi.es');

    /*Sistemas Distribuidos e Internet*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (66, 'Eduard Rolando Núñez Valdez', 'nunezedward@uniovi.es');

    /*Administración de Sistemas y Redes*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (67, 'Jose Antonio Correles González', 'ja@uniovi.es');
   
    /*Arquitectura del Software*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (68, 'Cristian Augusto Alonso', 'augustocristian@uniovi.es');

    /*Diseño de Lenguajes de Programación*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (69, 'José Quiroga Álvarez', 'quirogajose@uniovi.es');

    /*Seguridad de Sistemas Informáticos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (70, 'Jose Manuel Redondo López', 'redondojose@uniovi.es');

/*CUARTO*/
    /*Sistemas Inteligentes*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (71, 'Noelia Rico Pachón', 'noeliarico@uniovi.es');
    /*Ingeniería de Requisitos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (72, 'Jorge Álvarez Fidalgo', 'alvarezfjorge@uniovi.es');
    /*Calidad, Validación y Verificación del Software*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (73, 'Raquel Blanco Aguirre', 'rblanco@uniovi.es');
    /*Dirección y Planificación de Proyectos Informáticos*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (74, 'Enol García González', 'garciaenol@uniovi.es');
    /*Aspectos Sociales, Legales, Éticos y Profesionales de la Informática*/
    INSERT INTO Profesor(IDProfesor, NombreProfesor, correo) VALUES (75, 'Hugo Lebredo Bujan', 'lebredohugo@uniovi.es');
    /*Prácticas en Empresa*/
    /*Trabajo Fin de Grado*/

/*--------------------------------------------------------------IMPARTE----------------------------------------------------------*/
/* PRIMERO */
    -- Álgebra lineal
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (40, 1);
    -- Cálculo
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (41, 2);
    -- Empresa
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (42, 3);
    -- Fundamentos de Informática
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (43, 4);
    -- Introducción a la Programación
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (44, 5);

    -- Ondas y Electromagnetismo
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (45, 6);
    -- Estadística
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (46, 7);
    -- Fundamentos de Computadores y Redes
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (47, 8);
    -- Autómatas y Matemáticas Discretas
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (48, 9);
    -- Metodología de la Programación
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (49, 10);

/* SEGUNDO */
    -- Tecnología Electrónica de Computadores
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (50, 11);
    -- Arquitectura de Computadores
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (51, 12);
    -- Estructuras de Datos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (52, 13);
    -- Comunicación Persona Máquina
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (53, 14);
    -- Computabilidad
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (54, 15);

    -- Sistemas Operativos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (55, 16);
    -- Tecnologías y Paradigmas de la Programación
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (56, 17);
    -- Bases de Datos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (57, 18);
    -- Computación numérica
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (58, 19);
    -- Algoritmia
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (59, 20);

/* TERCERO */
    -- Repositorios de Información
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (60, 21);
    -- Software y Estándares para la Web
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (61, 22);
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (62, 22);
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (63, 22);
    -- Ingeniería del Proceso de Software
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (64, 23);
    -- Diseño de Software
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (65, 24);

    -- Sistemas Distribuidos e Internet
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (66, 25);
    -- Administración de Sistemas y Redes
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (67, 26);
    -- Arquitectura del Software
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (68, 27);
    -- Diseño de Lenguajes de Programación
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (69, 28);
    -- Seguridad de Sistemas Informáticos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (70, 29);

/* CUARTO */
    -- Sistemas Inteligentes
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (71, 30);
    -- Ingeniería de requisitos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (72, 31);
    -- Calidad, Validación y Verificación del Software
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (73, 32);

    -- Dirección y Planificación de Proyectos Informáticos
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (74, 33);
    -- Aspectos sociales, legales, éticos y profesionales de la Informática
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (75, 34);
    -- Prácticas en Empresa
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (53, 35);
    -- Trabajo Fin de Grado
    INSERT INTO Imparte(IDProfesor, IDAsignatura) VALUES (53, 36);

/*--------------------------------------------------------------ALUMNO----------------------------------------------------------*/ 
-- Generar Alumnos aleatorios para cada Curso
-- Curso 1
INSERT INTO Alumno(IDAlumno, Nombre, FechaNacimiento, Direccion) VALUES 
    (76, 'Juan Pérez', '1998-02-15', 'Calle A #123'),
    (77, 'Ana López', '1999-05-20', 'Avenida B #456'),
    (78, 'Carlos Rodríguez', '1997-11-10', 'Calle C #789'),
    (79, 'María Gómez', '2000-03-25', 'Avenida D #1011'),
    (80, 'Javier Martínez', '1996-08-05', 'Calle E #1213');

-- Curso 2
INSERT INTO Alumno(IDAlumno, Nombre, FechaNacimiento, Direccion) VALUES 
    (81, 'Laura Fernández', '1998-06-18', 'Avenida X #1415'),
    (82, 'Pedro García', '1997-09-30', 'Calle Y #1617'),
    (83, 'Isabel González', '2001-01-12', 'Avenida Z #1819'),
    (84, 'Miguel Sánchez', '1999-04-08', 'Calle W #2021'),
    (85, 'Sofía Díaz', '1996-10-22', 'Avenida V #2223');

-- Curso 3
INSERT INTO Alumno(IDAlumno, Nombre, FechaNacimiento, Direccion) VALUES 
    (86, 'Alejandro Ruiz', '1997-07-14', 'Calle M #2425'),
    (87, 'Elena Torres', '2000-08-28', 'Avenida N #2627'),
    (88, 'David López', '1999-03-05', 'Calle O #2829'),
    (89, 'Marina Rodríguez', '1998-12-17', 'Avenida P #3031'),
    (90, 'Adrián Martínez', '1996-05-03', 'Calle Q #3233');

-- Curso 4
INSERT INTO Alumno(IDAlumno, Nombre, FechaNacimiento, Direccion) VALUES 
    (91, 'Laura Pérez', '1998-11-09', 'Avenida K #3435'),
    (92, 'Carlos García', '1997-04-21', 'Calle L #3637'),
    (93, 'Sara González', '2000-09-14', 'Avenida R #3839'),
    (94, 'Jorge Sánchez', '1999-02-27', 'Calle S #4041'),
    (95, 'Natalia Díaz', '1996-06-11', 'Avenida T #4243');

-- Asociar Alumnos a Asignaturas en la tabla MatriculadoEn
-- Seleccionamos Asignaturas aleatorias para cada Alumno

-- Curso 1
-- Curso 1
INSERT INTO MatriculadoEn(IDAlumno, IDAsignatura, nota) VALUES
    (76, 1, 8), (76, 2, 7), (76, 3, 9), (76, 4, 8), (76, 5, 10), (76, 6, 7), (76, 7, 8), (76, 8, 9), (76, 9, 8), (76, 10, 9),
    (77, 1, 9), (77, 2, 8), (77, 3, 7), (77, 4, 9), (77, 5, 10), (77, 6, 8), (77, 7, 7), (77, 8, 9), (77, 9, 8), (77, 10, 10),
    (78, 1, 7), (78, 2, 8), (78, 3, 9), (78, 4, 10), (78, 5, 8), (78, 6, 7), (78, 7, 9), (78, 8, 8), (78, 9, 10), (78, 10, 7),
    (79, 1, 9), (79, 2, 8), (79, 3, 7), (79, 4, 8), (79, 5, 10), (79, 6, 9), (79, 7, 8), (79, 8, 7), (79, 9, 10), (79, 10, 8),
    (80, 1, 8), (80, 2, 9), (80, 3, 7), (80, 4, 10), (80, 5, 8), (80, 6, 9), (80, 7, 7), (80, 8, 10), (80, 9, 8), (80, 10, 9);

-- Curso 2
INSERT INTO MatriculadoEn(IDAlumno, IDAsignatura, nota) VALUES
    (81, 11, 8), (81, 12, 9), (81, 13, 7), (81, 14, 8), (81, 15, 9), (81, 16, 10), (81, 17, 8), (81, 18, 7), (81, 19, 9), (81, 20, 8),
    (82, 11, 10), (82, 12, 8), (82, 13, 9), (82, 14, 7), (82, 15, 8), (82, 16, 9), (82, 17, 10), (82, 18, 8), (82, 19, 7), (82, 20, 9),
    (83, 11, 8), (83, 12, 10), (83, 13, 9), (83, 14, 7), (83, 15, 8), (83, 16, 7), (83, 17, 9), (83, 18, 10), (83, 19, 8), (83, 20, 9),
    (84, 11, 9), (84, 12, 8), (84, 13, 10), (84, 14, 7), (84, 15, 8), (84, 16, 9), (84, 17, 8), (84, 18, 7), (84, 19, 9), (84, 20, 10),
    (85, 11, 7), (85, 12, 8), (85, 13, 9), (85, 14, 10), (85, 15, 8), (85, 16, 7), (85, 17, 9), (85, 18, 8), (85, 19, 10), (85, 20, 9);

-- Curso 3
INSERT INTO MatriculadoEn(IDAlumno, IDAsignatura, nota) VALUES
    (86, 21, 8), (86, 22, 9), (86, 23, 10), (86, 24, 8), (86, 25, 9), (86, 26, 7), (86, 27, 8), (86, 28, 9), (86, 29, 8), (86, 30, 9),
    (87, 21, 9), (87, 22, 8), (87, 23, 7), (87, 24, 9), (87, 25, 10), (87, 26, 8), (87, 27, 7), (87, 28, 9), (87, 29, 8), (87, 30, 10),
    (88, 21, 7), (88, 22, 8), (88, 23, 9), (88, 24, 10), (88, 25, 8), (88, 26, 7), (88, 27, 9), (88, 28, 8), (88, 29, 10), (88, 30, 7),
    (89, 21, 9), (89, 22, 8), (89, 23, 7), (89, 24, 8), (89, 25, 10), (89, 26, 9), (89, 27, 8), (89, 28, 7), (89, 29, 10), (89, 30, 8),
    (90, 21, 8), (90, 22, 9), (90, 23, 7), (90, 24, 10), (90, 25, 8), (90, 26, 9), (90, 27, 7), (90, 28, 10), (90, 29, 8), (90, 30, 9);

-- Curso 4
INSERT INTO MatriculadoEn(IDAlumno, IDAsignatura, nota) VALUES
    (91, 31, 8), (91, 32, 7), (91, 33, 9), (91, 34, 8), (91, 35, 10), (91, 36, 7),
    (92, 31, 10), (92, 32, 8), (92, 33, 9), (92, 34, 7), (92, 35, 8), (92, 36, 9),
    (93, 31, 7), (93, 32, 8), (93, 33, 9), (93, 34, 10), (93, 35, 8), (93, 36, 7),
    (94, 31, 9), (94, 32, 8), (94, 33, 10), (94, 34, 7), (94, 35, 8), (94, 36, 9),
    (95, 31, 8), (95, 32, 9), (95, 33, 7), (95, 34, 10), (95, 35, 8), (95, 36, 9);
