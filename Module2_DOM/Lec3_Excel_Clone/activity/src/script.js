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

        if(cellObject.value == cellValue)
        {
            return;
        }

        // if manually update a cell value then, remove it's dependent formula if any, and also remove himself from the parents list
        if(cellObject.formula)
        {
            removeFormula(cellObject);
            formulaInput.value = "";
        }

        // update val on db
        cellObject.value = cellValue;
        updateChildren(cellObject);
    })

    // if backspace is used on a cell 
    allCells[i].addEventListener("keydown", function(e){
        if(e.key == "Backspace")
        {
            let cell = e.target;
            let {rowId, colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula)
            {
                cellObject.formula = "";
                formulaInput.value = "";
                removeFormula(cellObject);
                cell.textContent = "";
            }
        }
    })
    
}

// event on formula input box
formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula)
    {
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId]; 

        if(cellObject.formula)
        {
            removeFormula(cellObject);
        }
        
        let computedValue = solveFormula(formula, cellObject);

        cellObject.formula = formula;

        // update value on UI
        lastSelectedCell.textContent = computedValue;
        // update db after calc
        cellObject.value = computedValue;

        updateChildren(cellObject);
    }
})