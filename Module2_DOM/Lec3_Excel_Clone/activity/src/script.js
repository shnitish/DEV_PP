let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let lastSelectedCell;
let formulaInput = document.querySelector("#formula");
let addressInput = document.querySelector("#address");

// fix top row and left most col 
cellsContentDiv.addEventListener("scroll", function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";
})

// get row and col cell where input was given
for(let i = 0; i < allCells.length; i++)
{
    allCells[i].addEventListener("click", function(e){

        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65 + colId) + (rowId + 1) + "";
        addressInput.value = address;
        formulaInput.value = cellObject.formula;
    })
    
    allCells[i].addEventListener("blur", function(e)
    {
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];

        if(cellValue == cellObject)
        {
            return;
        }

        // update val on db
        cellObject.value = cellValue;
    })
    
}

// event on formula input box
formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula)
    {
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId]; 
        let computedValue = solveFormula(formula);

        cellObject.formula = formula;

        // update value on UI
        lastSelectedCell.textContent = computedValue;
        // update db after calc
        cellObject.value = computedValue;
    }
})