let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = pencil.querySelector(".tool-options");
let eraserOptions = eraser.querySelector(".tool-options");
let pencilSizeInput = pencil.querySelector("input");
let eraserSizeInput = eraser.querySelector("input");

let activeTool = "pencil";
let currentPencilSize = 1;
let currentEraserSize = 1;

pencilSizeInput.addEventListener("change", function()
{
    let pencilSizeInputVal = pencilSizeInput.value;
    ctx.lineWidth = pencilSizeInputVal;
    currentPencilSize = pencilSizeInputVal;
});
eraserSizeInput.addEventListener("change", function()
{
    let eraserSizeInputVal = eraserSizeInput.value;
    ctx.lineWidth = eraserSizeInputVal;
    currentEraserSize = eraserSizeInputVal;
});

pencil.addEventListener("click", function()
{
    if(activeTool == "pencil")
    {
        // open pencil options
        if(pencilOptions.classList.contains("hide"))
        {
            pencilOptions.classList.remove("hide");
        }
        else
        {
            pencilOptions.classList.add("hide");
        }
    }
    else
    {
        activeTool = "pencil";
        ctx.strokeStyle = "black";
        ctx.lineWidth = currentPencilSize;
        eraserOptions.classList.add("hide");
    }
})

eraser.addEventListener("click", function()
{
    if(activeTool == "eraser")
    {
        // open eraser options
        if(eraserOptions.classList.contains("hide"))
        {
            eraserOptions.classList.remove("hide");
        }
        else
        {
            eraserOptions.classList.add("hide");
        }

    }

    else
    {
        activeTool = "eraser";
        ctx.strokeStyle = "white";
        ctx.lineWidth = currentEraserSize;
        pencilOptions.classList.add("hide");
    }
})