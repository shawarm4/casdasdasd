class Noticias{
    constructor(){
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob){  
            alert("Este navegador no soporta el API File");
        }
    }

    readInputFile(files){
        if(files[0]){
            var lector = new FileReader();

            lector.onload = function (e){
                const content = e.target.result;

                Noticias.processFileContent(content);
            }

            lector.readAsText(files[0])
        }
    }

    static processFileContent(content) {
        const section = document.querySelector("main section");
    
        const noticias = content.split('\n');
    
        for (const noticia of noticias) {
            let lineData = noticia.split('_');

            let title = document.createElement('h3');
            title.textContent = lineData[0];
    
            let subtitle = document.createElement('p');
            subtitle.textContent = lineData[1];

            let header = document.createElement('header');
            header.appendChild(title);
            header.appendChild(subtitle);
    
            let paragraph = document.createElement('p');
            paragraph.textContent = lineData[2];

            let author = document.createElement('footer');
            author.textContent = lineData[3];
    
            let article = document.createElement('article');
            article.appendChild(header);
            article.appendChild(paragraph);
            article.appendChild(author);
    
            section.appendChild(article);
        }
    }

    añadirNoticia(){
        const inputs = document.querySelectorAll("input[type=\"text\"]");
        const titulo = inputs[0].value;
        const subtitulo = inputs[1].value;
        const parrafo = inputs[2].value;
        const autor = inputs[3].value;


        if(titulo && subtitulo && parrafo && autor){
            let section = document.querySelector("main section");

            let title = document.createElement('h3');
            title.textContent = titulo;
    
            let subtitle = document.createElement('p');
            subtitle.textContent = subtitulo;

            let header = document.createElement('header');
            header.appendChild(title);
            header.appendChild(subtitle);
    
            let paragraph = document.createElement('p');
            paragraph.textContent = parrafo;

            let author = document.createElement('footer');
            author.textContent = autor;
    
            let article = document.createElement('article');
            article.appendChild(header);
            article.appendChild(paragraph);
            article.appendChild(author);
    
            section.appendChild(article);
        }else{
            alert("Los campos de la noticia no pueden estar vacíos")
        }
    }
    
}
var noticias = new Noticias();