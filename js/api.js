class DrawingApp {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 5;
        this.isDrawing = false;

        this.setupEventListeners();
        this.handleResize();
    }

    saveDrawingWithName(name) {
        const state = {
            drawingData: this.canvas.toDataURL(),
            strokeStyle: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
        };

        localStorage.setItem(`drawing-${name}`, JSON.stringify(state));
    }

    loadDrawingByName(name) {
        const savedState = localStorage.getItem(`drawing-${name}`);

        if (savedState) {
            const state = JSON.parse(savedState);

            this.ctx.strokeStyle = state.strokeStyle;
            this.ctx.lineWidth = state.lineWidth;

            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            };
            img.src = state.drawingData;
        }
    }

    getSavedDrawingsList() {
        const drawingsList = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('drawing-')) {
                drawingsList.push(key.replace('drawing-', ''));
            }
        }

        return drawingsList;
    }

    loadState(state) {
        this.ctx.strokeStyle = state.strokeStyle;
        this.ctx.lineWidth = state.lineWidth;

        const img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = state.drawingData;
    }

    saveStateToLocalStorage() {
        const state = {
            drawingData: this.canvas.toDataURL(),
            strokeStyle: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
        };

        localStorage.setItem('drawingState', JSON.stringify(state));
    }

    loadStateFromLocalStorage() {
        const savedState = localStorage.getItem('drawingState');

        if (savedState) {
            const state = JSON.parse(savedState);

            this.ctx.strokeStyle = state.strokeStyle;
            this.ctx.lineWidth = state.lineWidth;

            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            };
            img.src = state.drawingData;
        }
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.draw(e);
        this.saveStateToLocalStorage();
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
        this.saveStateToLocalStorage();
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        this.ctx.lineCap = 'round';

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        this.saveStateToLocalStorage();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        window.addEventListener('resize', this.handleResize.bind(this));

        const inputs = document.querySelectorAll('input');

        inputs[0].addEventListener('change', this.handleImageUpload.bind(this));

        inputs[1].addEventListener('change', this.handleColorChange.bind(this));

        inputs[2].addEventListener('change', this.handleWidthChange.bind(this));

        inputs[3].addEventListener('click',this.handleErase.bind(this));

        inputs[4].addEventListener('click', () => {
            const drawingName = prompt('Introduce un nombre para el dibujo a guardar:');
            if (drawingName) {
                this.saveDrawingWithName(drawingName);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        });

        inputs[5].addEventListener('click', () => {
            const drawingsList = this.getSavedDrawingsList();
            const selectedDrawing = prompt('Elige una imagen para cargar:\n' + drawingsList.join(', '));
            if (drawingsList.includes(selectedDrawing)) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.loadDrawingByName(selectedDrawing);
            } else {
                alert('No existe una imagen guardada con ese nombre');
            }
        });

        inputs[6].addEventListener('click', () => {
            this.eliminarImagenesGuardadas();   
        });

        inputs[7].addEventListener('click', () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    handleResize() {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;

        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(this.canvas, 0, 0);

        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;

        this.ctx.drawImage(tempCanvas, 0, 0);
    }

    handleImageUpload() {
        const imageInput = document.querySelector('input');
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.backgroundImage = new Image();
                this.backgroundImage.onload = () => {
                    this.drawBackgroundImage();
                };
                this.backgroundImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    handleColorChange(){
        const colorInput = document.querySelector('input[type="color"]');
        this.ctx.strokeStyle = colorInput.value;
    }

    handleWidthChange(){
        const widthInput = document.querySelector('input[type="number"]');
        this.ctx.lineWidth = widthInput.value;
    }

    handleErase(){
        const colorInput = document.querySelector('input[type="button"]');
        this.ctx.strokeStyle = '#DBF5F0';
        this.ctx.lineWidth = 20;
    }

    drawBackgroundImage() {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    eliminarImagenesGuardadas() {
        const confirmacion = confirm("¿Estás seguro de que quieres eliminar todas las imágenes guardadas?");
        if (confirmacion) {
            localStorage.clear();
            alert("Imágenes eliminadas con éxito.");
        }
    }
}
var drawingApp = null;
document.addEventListener('DOMContentLoaded', function() {
    drawingApp = new DrawingApp();
    drawingApp.loadStateFromLocalStorage();
});