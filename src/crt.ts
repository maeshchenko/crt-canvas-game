export function drawCRTPixel (ctx:CanvasRenderingContext2D,colorsArr: number[] | Uint8ClampedArray, yCoord: number, xCoord: number, offsetY:number, offsetX: number){
    const colorWidth = 1.8;
    const spaceWidth = 0.2;
    const spaceHeight = 0.2;
    const pixelHeight = (colorWidth*3 + spaceWidth*2 + spaceHeight);
    const pixelWidth = (colorWidth*3 + spaceWidth*3);

    ctx.beginPath();
    ctx.roundRect(xCoord*pixelWidth + offsetX, yCoord*pixelHeight + spaceHeight*yCoord + offsetY, colorWidth,pixelHeight, 5 )
    ctx.fillStyle = `rgba(255,0,0,${colorsArr[0]/255})`;
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,0,${colorsArr[1]/255})`;
    ctx.roundRect(xCoord*pixelWidth + spaceWidth + colorWidth + offsetX, yCoord*pixelHeight + spaceHeight*yCoord + offsetY, colorWidth,pixelHeight, 5 )
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,0,255,${colorsArr[2]/255})`;
    ctx.roundRect(xCoord*pixelWidth + spaceWidth*2 + colorWidth*2 + offsetX, yCoord*pixelHeight + spaceHeight*yCoord + offsetY, colorWidth,pixelHeight, 5 )
    ctx.fill();
}

export function drawCRT(canvas_crt:HTMLCanvasElement,ctx_crt:CanvasRenderingContext2D,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,offsetX:number, offsetY:number){
    // let offsetX = (canvas_crt.width - canvas.width)/2;
    // let offsetY = (canvas_crt.height - canvas.height)/2;
    for(let h = 0; h<canvas.height; h++){
        for(let w = 0; w<canvas.width; w++){
            let arr = ctx.getImageData(w,h,1,1).data;
            drawCRTPixel(ctx_crt,arr,h,w,offsetY,offsetX)
        }
    }
}
