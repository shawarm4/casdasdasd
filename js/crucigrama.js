class Crucigrama{
    constructor(){
        const NIVEL = {
            facil: '4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16',
            intermedio: '12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32',
            dificil: '4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72'
        }      
        this.nivel = 'intermedio';
        this.board = NIVEL[this.nivel];

        this.cols = 9;
        this.rows = 11;
        this.init_time = null;
        this.end_time = null;
        this.cells = [];
        for (var i = 0; i < this.rows; i++) {
            this.cells[i] = Array(this.cols).fill(null);
        }
        this.start();
    }

    start(){
        let index = 0;
        const b = this.board.split(',');
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const char = b[index];
                index++;
                if(char >= 1 && char <= 99){
                    this.cells[i][j] = parseInt(char);
                }else if(char == '.'){
                    this.cells[i][j] = 0;
                }else if(char == '#'){
                    this.cells[i][j] = -1;
                }else if('+-*/='.includes(char)){
                    this.cells[i][j] = char;
                }
            }
        }
    }

    paintMathwork(){
        const self = this;
        $(document).ready(function(){
            for (let i = 0; i < self.rows; i++) {
                for (let j = 0; j < self.cols; j++) {
                    const char = self.cells[i][j];
                    var p = $('<p>');
                    p.attr('tabindex', '0'); 
    
                    if(char >= 1 && char <= 99){
                        p.text(char);
                        p.attr('data-state','blocked');
                    }else if(char == '0'){
                        p.attr('data-row', i);
                        p.attr('data-col', j);
                        p.on('click', function(e) {
                            var selectedCell = $('main p[data-state="clicked"]');
                            selectedCell.attr('data-state', 'init');
                            $(this).attr('data-state', 'clicked');
                        });
                        p.on('keydown', (event) => {
                            const key = event.key;
                            var selectedCell = $('main p[data-state="clicked"]');
                            if (/[1-9\+\-\*\/]/.test(key)) {
                                if (selectedCell) {
                                    self.introduceElement(key);
                                } else {
                                    alert('Selecciona una celda antes de introducir un número');
                                }
                            }
                        });
                    }else if(char == '-1'){
                        p.attr('data-state','empty');
                    }else if('+-*/='.includes(char)){
                        p.text(char);
                    }
    
                    $('main').append(p);
                }
            }
        });
        this.init_time = new Date();
    }
    
    check_win_condition(){
        for(let i = 0 ; i < this.rows; i++){
            for(let j = 0 ; j < this.cols ; j++){
                if(this.cells[i][j] == 0){
                    return false;
                }
            }
        }
        this.end_time = new Date();
        return true;
    }

    calculate_date_difference(){
        if (this.init_time && this.end_time) {
            const time_difference = this.end_time.getTime() - this.init_time.getTime();

            const hours = Math.floor(time_difference / 3600000);
            const minutes = Math.floor((time_difference % 3600000) / 60000);
            const seconds = Math.floor((time_difference % 60000) / 1000);

            const formatted_time = `${hours}:${minutes}:${seconds}`;

            return formatted_time;
        } else {
            return "No se ha iniciado o finalizado el tiempo";
        }
    }

    introduceElement(key){
        var expression_row = true;
        var expression_col = true;

        var selectedCell = $('main p[data-state="clicked"]');

        const i = selectedCell.data('row');
        const j = selectedCell.data('col');
        var prev = this.cells[i][j];
        this.cells[i][j] = key;

        var horizontalExpression = this.getHorizontalExpression(i, j);
        var verticalExpression = this.getVerticalExpression(i, j);
        
        expression_row = this.validateExpression(horizontalExpression);
        expression_col = this.validateExpression(verticalExpression);  

        if(!expression_row || !expression_col){
            this.cells[i][j] = prev;
            alert('El valor introducido no es válido');
        }else{
            selectedCell.attr('data-state','correct');
            selectedCell.text(key);
        }

        if (this.check_win_condition()) {
            const tiempo_total = this.calculate_date_difference();
            this.createRecordForm(tiempo_total);
            alert(`¡Has completado el crucigrama en ${tiempo_total}!`);
        }
    }

    getHorizontalExpression(row, col) {
        const expression = {
            first_number: '',
            operator: '',
            second_number: '',
            equals: '=',
            result: ''
        };

        if(col > 0 && this.cells[row][col - 1] == '='){
            expression.first_number = this.cells[row][col - 4];
            expression.operator = this.cells[row][col - 3];
            expression.second_number = this.cells[row][col - 2];
            expression.result = this.cells[row][col];
        }else{
            for(let j = col ; j < this.cols ; j++){
                if(this.cells[row][j] == '='){
                    expression.first_number = this.cells[row][j - 3];
                    expression.operator = this.cells[row][j - 2];
                    expression.second_number = this.cells[row][j - 1];
                    expression.result = this.cells[row][j + 1];
                    break;
                }
            }
        }
        return expression;
    }
    
    getVerticalExpression(row, col) {
        const expression = {
            first_number: '',
            operator: '',
            second_number: '',
            equals: '=',
            result: ''
        };

        if(row > 0 && this.cells[row - 1][col] == '='){
            expression.first_number = this.cells[row - 4][col];
            expression.operator = this.cells[row - 3][col];
            expression.second_number = this.cells[row - 2][col];
            expression.result = this.cells[row][col];
        }else{
            for(let i = row ; i < this.rows ; i++){
                if(this.cells[i][col] == '='){
                    expression.first_number = this.cells[i - 3][col];
                    expression.operator = this.cells[i - 2][col];
                    expression.second_number = this.cells[i - 1][col];
                    expression.result = this.cells[i + 1][col];
                    break;
                }
            }
        }
        return expression;
    }

    validateExpression(expression) {
        if(Object.values(expression).includes(-1)){
            return true;
        }
        else if (expression.first_number > 0 && /[\+\-\*\/]/.test(expression.operator) && expression.second_number > 0 && expression.result > 0) {
            const mathExpression = ['',expression.first_number, expression.operator, expression.second_number].join('');
            const evalResult = eval(mathExpression);

            return evalResult == expression.result;
        }else if(/[\+\-\*\/]/.test(expression.first_number) || expression.operator > 0 || /[\+\-\*\/]/.test(expression.second_number) || /[\+\-\*\/]/.test(expression.result)){
            return false;
        }

        return true; //No es válida por lo tanto no se evalúa
    }

    createRecordForm(tiempo){
        var body = $('body');
        var section = $('<section>');
        section.append('<h3>Introduzca sus datos para registrar su tiempo:</h3>')
        var form = $('<form action=\'#\' method=\'post\' name=\'formulario\'>\'');
        body.append(section);
        section.append(form);
                
        form.append('<label for="nombre">Nombre: </label>');
        form.append('<input id="nombre" name="nombre" type="text" />');

        form.append('<label for="apellidos">Apellidos: </label>');
        form.append('<input id="apellidos" name="apellidos" type="text" />');

        form.append('<label for="nivel">Nivel: </label>');
        form.append(`<input id="nivel" name="nivel" type="text" readonly value="${this.nivel}" />`);

        form.append('<label for="tiempo">Tiempo: </label>');
        form.append(`<input id="tiempo" name="tiempo" type="text" readonly value="${tiempo}" />`);

        form.append('<label for="submit">Registrar los datos: </label>');
        form.append('<input id="submit" type="submit" name="submit" value="Registrar" />');
    }

}
var crucigrama = null;
document.addEventListener('DOMContentLoaded', function() {
    crucigrama = new Crucigrama();
    crucigrama.paintMathwork();
});