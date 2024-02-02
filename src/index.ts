import "../style.scss";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fill();

const SIZE = 10;
const BORDER_SIZE = 10;

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

let start_position = [0, 0];
let player_position = [0,0];

function clearField(){
    ctx.clearRect(BORDER_SIZE,BORDER_SIZE,canvas.width - BORDER_SIZE*2, canvas.height - BORDER_SIZE*2);
}

function drawField(field:number[][], apples: number[][], player_position:number[]){
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
            }

            if(apples[j][i] === 2){
                ctx.fillStyle = 'blue';
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            }

            if(player_position[0] === i && player_position[1] === j){
                ctx.fillStyle = 'yellow';
                ctx.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx.fill()
            }
        }
    }
}

document.addEventListener('keydown', (evt:KeyboardEvent) => {
    console.log(evt.key);
    if (evt.isComposing || evt.key === '229'){
        return;
    }
    if(evt.key === 'ArrowUp'){
        player_position[1] === player_position[1] + 1;
        console.log(player_position)
    }
    if(evt.key === 'ArrowDown'){}
    if(evt.key === 'ArrowLeft'){}
    if(evt.key === 'ArrowRight'){}
    if(evt.key === 'Escape'){}
})

function processInput(){
    // console.log('processInput');
}
function changeState(){
    // console.log('changeState');
}
function render(){
    clearField();
    drawField(field0, apples0, player_position);
}

let gameLoop = function(){
    processInput();
    changeState();
    render();

    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
