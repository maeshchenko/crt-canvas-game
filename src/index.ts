import "../style.scss";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const color_brown = '#794a3a';
const color_red = '#dd5341'
const color_white = '#faebcc'
const color_yellow = '#faca78'
const color_green = '#68c7c1'

const SIZE = 40;
const BORDER_SIZE = SIZE;

canvas.width = SIZE * 12;
canvas.height = SIZE * 12;

ctx.fillStyle = '#666547';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fill();

let field0 = [
    [0,0,0,0,1,0,0,0,0,0],
    [0,1,1,1,1,0,1,1,1,0],
    [0,1,0,0,0,0,1,0,1,0],
    [0,1,0,1,1,0,1,0,0,0],
    [0,1,0,1,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,1,1,0],
    [0,1,0,0,0,1,0,1,0,0],
    [0,1,1,1,0,1,0,1,1,1],
    [0,0,0,0,0,1,0,0,0,0]
]

let apples0 = [
    [0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,2,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

class Player{
    x:number;
    y:number;

    constructor(init_x:number,init_y:number) {
        this.x = init_x;
        this.y = init_y;
    }
    get getCoord() {
        return [this.x, this.y]
    }
    draw(){
        ctx.fillStyle = color_green;
        ctx.fillRect(this.x*SIZE + BORDER_SIZE,this.y*SIZE + BORDER_SIZE,SIZE, SIZE);
        ctx.fill()
    }
    moveLeft(){
        this.x = this.x - 1;
    }
    moveRight(){
        this.x = this.x + 1;
    }
    moveUp(){
        this.y = this.y - 1;
    }
    moveDown(){
        this.y = this.y + 1;
    }
}

function clearField(){
    ctx.clearRect(BORDER_SIZE,BORDER_SIZE,canvas.width - BORDER_SIZE*2, canvas.height - BORDER_SIZE*2);
}

function drawField(field:number[][], apples: number[][]){
    for(let i = 0; i<field.length; i++){
        for(let j = 0; j<field[i].length; j++){
            if(field[j][i] === 0){
                ctx.fillStyle = color_white;
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE,SIZE);
                ctx.fill()
            } else if(field[j][i] === 1){
                ctx.fillStyle = color_brown;
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            }

            if(apples[j][i] === 2){
                ctx.fillStyle = color_red;
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            }
        }
    }
}

let player = new Player(0,0);

document.addEventListener('keydown', (evt:KeyboardEvent) => {
    console.log(evt.key);
    if (evt.isComposing || evt.key === '229'){
        return;
    }
    if(
        evt.key === 'ArrowUp'
        && player.getCoord[1] - 1 >= 0
        && field0[player.getCoord[1] - 1][player.getCoord[0]] !== 1
    ){
        player.moveUp()
    }
    if(
        evt.key === 'ArrowDown'
        && player.getCoord[1] + 1 < field0.length
        && field0[player.getCoord[1] + 1][player.getCoord[0]] !== 1
    ){
        player.moveDown();
    }
    if(
        evt.key === 'ArrowLeft'
        && player.getCoord[0] - 1 >= 0
        && field0[player.getCoord[1]][player.getCoord[0] - 1] !== 1
    ){
        player.moveLeft();
    }
    if(
        evt.key === 'ArrowRight'
        && player.getCoord[0] + 1 < field0.length
        && field0[player.getCoord[1]][player.getCoord[0] + 1] !== 1
    ){
        player.moveRight();
    }
    if(evt.key === 'Escape'){}
});

function processInput(){
    // console.log('processInput');
}
function changeState(){
    if(apples0[player.getCoord[1]][player.getCoord[0]] === 2){
        apples0[player.getCoord[1]][player.getCoord[0]] = 0
    }
    // console.log('changeState');
}
function render(){
    clearField();
    drawField(field0, apples0);
    player.draw();
}

let gameLoop = function(){
    processInput();
    changeState();
    render();

    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
