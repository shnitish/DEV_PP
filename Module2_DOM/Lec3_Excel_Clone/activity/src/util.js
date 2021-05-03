function getRowIdColIdFromElement(element)
{
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");

    return {rowId, colId};
}

// replace cell with it's value in the formula bar
function solveFormula(formula)
{
    // "( A1 + A2 )" => "(10 + 10)"
    let formulaComponents = formula.split(" ");
    // ["(", "A1", "+", "A2", ")"]
    
    // this loop replaces value of A1 and A2 in formula with their cell value
    for(let i = 0; i < formulaComponents.length; i++)
    {   
        // extract A from "A1" and A from "A2"
        let formulaComponent = formulaComponents[i];
        if(formulaComponent[0] >= "A" && formulaComponent[0] <= "Z")
        {
            // extract value present at A1 and A2
            let {rowId, colId} = getRowIdColIdFromAddress(formulaComponent);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            formula = formula.replace(formulaComponent, value);
        } 
    }

    let computedValue = eval(formula);
    return computedValue;
}

function getRowIdColIdFromAddress(address)
{
    let rowId =  Number(address.substring(1)) - 1;
    let colId = address.charCodeAt(0) - 65;

    return {rowId, colId};
}