import "../style.scss";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fill();

const SIZE = 10;
const BORDER_SIZE = 10;

let field0 = [
    [0,0,0,2,1,0,0,0,0,0],
    [0,1,1,1,1,0,1,1,1,0],
    [0,1,0,0,0,0,1,2,1,0],
    [0,1,0,1,1,0,1,0,0,0],
    [0,1,0,1,2,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,1,1,0],
    [0,1,2,0,0,1,0,1,2,0],
    [0,1,1,1,0,1,0,1,1,1],
    [0,0,0,0,0,1,0,0,0,0]
]

function clearField(){
    ctx.clearRect(BORDER_SIZE,BORDER_SIZE,canvas.width - BORDER_SIZE*2, canvas.height - BORDER_SIZE*2);
}
function drawField(field:number[][]){
    for(let i = 0; i<field.length; i++){
        for(let j = 0; j<field[i].length; j++){
            if(field[j][i] === 0){
                ctx.fillStyle = 'white';
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE,SIZE);
                ctx.fill()
            } else if(field[j][i] === 1){
                ctx.fillStyle = 'black';
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            } else if(field[j][i] === 2){
                ctx.fillStyle = 'blue';
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            }
        }
    }
}


function processInput(){
    console.log('processInput');
}
function changeState(){
    console.log('changeState');
}
function render(){
    drawField(field0);
}

let gameLoop = function(){
    processInput();
    changeState();
    render();

    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
