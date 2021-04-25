let cellsContentDiv = document.querySelector(".cells-content");

function initCell()
{
    // top most fixed row
    let cellsContent = `<div class="top-left-cell"></div>`;
    cellsContent += `<div class="top-row">`;
    for(let i = 0; i < 26; i++)
    {
        cellsContent += `<div class="top-row-cell">${String.fromCharCode(65 + i)}</div>`;
    }
    cellsContent += `</div>`;

    // leftmost fixed col
    cellsContent += `<div class = "left-col">`;
    for(let i = 0; i < 100; i++)
    {
        cellsContent += `<div class="left-col-cell">${i + 1}</div>`;
    }
    cellsContent += `</div>`;
    cellsContent += `<div class="cells">`;
    // inner cells
    for(let i = 0; i < 100; i++)
    {
        cellsContent += `<div class="row">`;
        for(let j = 0; j < 26; j++)
        {
            cellsContent += `<div class="cell" rowid="${i}" colid="${j}" contenteditable="true"></div>`;
        }
        cellsContent += `</div>`;
    }
    cellsContent += `</div>`;

    cellsContentDiv.innerHTML = cellsContent;
}
initCell();