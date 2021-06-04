let canvas = document.querySelector("#canvas");
let {top: canvasTop} = canvas.getBoundingClientRect();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (canvasTop + 5);
canvas.addEventListener("resize", function(e)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (canvasTop + 5);
})

// drawing on canvas
let ctx = canvas.getContext("2d");
let isMouseDown = false;
canvas.addEventListener("mousedown", function(e)
{
    isMouseDown = true;
    let x = e.clientX;
    let y = e.clientY - (canvasTop + 5);
    ctx.beginPath();
    ctx.moveTo(x, y);
})

canvas.addEventListener("mousemove", function(e){

    if(isMouseDown)
    {
        let x = e.clientX;
        let y = e.clientY - canvasTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
})

canvas.addEventListener("mouseup", function(e)
{
    isMouseDown = false;
})