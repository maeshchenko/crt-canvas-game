import "../style.scss";
import {drawCRT} from "./crt";

const canvas_game = document.getElementById('game') as HTMLCanvasElement;
const ctx_game = canvas_game.getContext('2d', {willReadFrequently: true});

const canvas_crt = document.getElementById('canvas-crt') as HTMLCanvasElement;
const ctx_crt = canvas_crt.getContext('2d',{willReadFrequently: true});

const canvas_screen = document.getElementById('canvas-screen') as HTMLCanvasElement;
const ctx_screen = canvas_screen.getContext('2d',{willReadFrequently: true});

enum EGameStatus {
    Off,
    LoadingVideo,
    StartScreen,
    Game
}
let game_status = EGameStatus.Game;

const colors = {
    wall: '#fff',
    field: '#000',
    apple: '#00f',
    player: '#0f0'
}

const SIZE = 6;
const BORDER_SIZE = SIZE;

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

ctx_game.fillStyle = '#666547';
ctx_game.fillRect(0,0, field0.length*SIZE + SIZE*2, field0.length*SIZE + SIZE*2);
ctx_game.fill();

ctx_screen.fillStyle = '#212121';
ctx_screen.fillRect(0,0, canvas_screen.width, canvas_screen.height);
ctx_screen.fill();

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
        ctx_game.fillStyle = colors.player;
        ctx_game.fillRect(this.x*SIZE + BORDER_SIZE,this.y*SIZE + BORDER_SIZE,SIZE, SIZE);
        ctx_game.fill()
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
    ctx_game.fillStyle = '#666547';
    ctx_game.fillRect(0,0, field0.length*SIZE + SIZE*2, field0.length*SIZE + SIZE*2);
    ctx_game.fill();
}

function drawField(field:number[][], apples: number[][]){
    for(let i = 0; i<field.length; i++){
        for(let j = 0; j<field[i].length; j++){
            if(field[j][i] === 0){
                ctx_game.fillStyle = colors.field;
                ctx_game.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE,SIZE);
                ctx_game.fill()
            } else if(field[j][i] === 1){
                ctx_game.fillStyle = colors.wall;
                ctx_game.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx_game.fill()
            }

            if(apples[j][i] === 2){
                ctx_game.fillStyle = colors.apple;
                ctx_game.fillRect(i*SIZE + BORDER_SIZE,j*SIZE + BORDER_SIZE,SIZE, SIZE);
                ctx_game.fill()
            }
        }
    }
}

let player = new Player(0,0);

document.addEventListener('keydown', (evt:KeyboardEvent) => {
    // console.log(evt.key);
    if (evt.isComposing || evt.key === '229'){
        return;
    }
    if(
        evt.key === 'ArrowUp'
        && player.getCoord[1] - 1 >= 0
        && field0[player.getCoord[1] - 1][player.getCoord[0]] !== 1
    ){
        evt.preventDefault()
        player.moveUp()
    }
    if(
        evt.key === 'ArrowDown'
        && player.getCoord[1] + 1 < field0.length
        && field0[player.getCoord[1] + 1][player.getCoord[0]] !== 1
    ){
        evt.preventDefault()
        player.moveDown();
    }
    if(
        evt.key === 'ArrowLeft'
        && player.getCoord[0] - 1 >= 0
        && field0[player.getCoord[1]][player.getCoord[0] - 1] !== 1
    ){
        evt.preventDefault()
        player.moveLeft();
    }
    if(
        evt.key === 'ArrowRight'
        && player.getCoord[0] + 1 < field0.length
        && field0[player.getCoord[1]][player.getCoord[0] + 1] !== 1
    ){
        evt.preventDefault()
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

function CRTDraw(canvas_source:HTMLCanvasElement){
    let ctx_source = canvas_source.getContext('2d', {willReadFrequently: true})

    let tv_screen = {
        width : 638,
        height : 456,
        x : 220,
        y : 100,
    }

    // ctx_crt.fillStyle = '#171523';
    // ctx_crt.fillRect(tv_screen.x,tv_screen.y, tv_screen.width, tv_screen.height);
    // ctx_crt.fill();

    drawCRT(canvas_crt, ctx_crt, canvas_game, ctx_game,320,100);
}

function clearCRT(){
    let tv_screen = {
        width : 638,
        height : 456,
        x : 220,
        y : 100,
    }

    ctx_crt.fillStyle = '#171523';
    ctx_crt.fillRect(tv_screen.x,tv_screen.y, tv_screen.width, tv_screen.height);
    ctx_crt.fill();

    drawCRT(canvas_crt, ctx_crt, canvas_screen, ctx_screen,tv_screen.x,tv_screen.y);
}

function render(){
    clearField();
    const img1 = new Image();
    img1.src = 'public/wega1.png';
    img1.setAttribute('crossOrigin', '');
    img1.crossOrigin = `Anonymous`;

    img1.onload = function(){
        ctx_crt.drawImage(img1, 0, 0, 1098, 735);

        if(game_status === EGameStatus.Off) {
            clearCRT();
        } else if(game_status === EGameStatus.LoadingVideo){

        } else if(game_status === EGameStatus.StartScreen){

        } else if(game_status === EGameStatus.Game){
            var promise = document.querySelector('audio').play();

            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    // Autoplay was prevented.
                    // Show a "Play" button so that user can start playback.
                });
            }

            clearCRT();
            drawField(field0, apples0);
            player.draw();
            CRTDraw(canvas_game);
        }
    }
}

let gameLoop = function(){
    processInput();
    changeState();
    render();

    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
