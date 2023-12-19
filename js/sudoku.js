class Sudoku {
    constructor() {
        this.data = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        this.rows = 9;
        this.columns = 9;
        this.table = [];
    }

    start() {
        this.table = Array.from({ length: this.rows }, () => Array(this.columns).fill(-1));
        let index = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const char = this.data[index];
                this.table[i][j] = char === '.' ? 0 : parseInt(char);
                index++;
            }
        }
    }

    createStructure(){
        const table = document.querySelector('main');
        let index = 0;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const paragraph = document.createElement('p');
                paragraph.setAttribute('tabindex', '0'); 

                paragraph.setAttribute('data-row', i);
                paragraph.setAttribute('data-col', j);

                table.appendChild(paragraph);
                index++;

                paragraph.addEventListener('click', this.clickEnParrafo);
    
                paragraph.addEventListener('keydown', (event) => {
                    const key = event.key;
                    let selectedCell = event.target;
                    if (/[1-9]/.test(key)) {
                        if (selectedCell !== null) {
                            this.introduceNumber(selectedCell, key);
                            selectedCell = null;
                        } else {
                            alert('Selecciona una celda antes de introducir un número');
                        }
                    }
                });

                paragraph.addEventListener('blur', (event) => {
                    const lostFocusCell = event.target;
                    if(lostFocusCell.dataset.state == 'clicked'){
                        lostFocusCell.removeAttribute('data-state');
                    }
                });
            }
        }
    }

    clickEnParrafo(e){      
        e.target.dataset.state = 'clicked';
    }

    paintSudoku(){
        const cells = document.querySelectorAll('p');
        for(let i = 0 ; i < this.data.length ; i++){
            if(this.data.charAt(i) != '.'){
                cells[i].textContent = this.data.charAt(i);
                cells[i].removeEventListener('click', this.clickEnParrafo);
                cells[i].dataset.state = 'blocked';
            }          
        }
    }

    introduceNumber(selectedCell, key){
        //Se comprueba la fila
        for(let i = 0 ; i < this.columns ; i++){
            if(key == this.table[selectedCell.dataset.row][i]){
                alert('Hay un número igual en la misma fila');
                selectedCell.removeAttribute('data-state');
                return;
            }
        }

        //Se comprueba la columna
        for(let i = 0 ; i < this.rows ; i++){
            if(key == this.table[i][selectedCell.dataset.col]){
                alert('Hay un número igual en la misma columna');
                selectedCell.removeAttribute('data-state');
                return;
            }
        }

        const startRow = Math.floor(parseInt(selectedCell.dataset.row / 3) * 3)
        const startCol = Math.floor(parseInt(selectedCell.dataset.col / 3) * 3)

        //Se comprueba el cuadrante
        for(let i = startRow ; i < startRow + 3 ; i++){
            for(let j = startCol ; j < startCol + 3 ; j++){
                if(key == this.table[i][j]){                 
                    alert('Hay un número igual en el mismo cuadrante');
                    return;
                }
            }
        }
        this.table[selectedCell.dataset.row][selectedCell.dataset.col] = key;
        selectedCell.textContent = key;
        selectedCell.removeEventListener('click', this.clickEnParrafo);
        selectedCell.dataset.state = 'correct';

        if(this.sudokuCompleto()){
            alert('Sudoku completado');
        }
    }

    sudokuCompleto(){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.table[i][j] == 0) {
                    return false; 
                }
            }
        }
        return true;
    }
}
var sudokuGame = null;
document.addEventListener('DOMContentLoaded', function() {
    sudokuGame = new Sudoku();
    sudokuGame.start();
    sudokuGame.createStructure();
    sudokuGame.paintSudoku();
});