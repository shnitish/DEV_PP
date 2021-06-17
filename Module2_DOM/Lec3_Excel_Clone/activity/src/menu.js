let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");

bold.addEventListener("click", function(e){
    setFontStyle("bold", bold);  
})

underline.addEventListener("click", function(e){
    setFontStyle("underline", underline)
})

italic.addEventListener("click", function(e){
    setFontStyle("italic", italic);
})

function setFontStyle(styleName, element)
{
    if(lastSelectedCell)
    {
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];

        if(cellObject.fontStyle[styleName])
        {
            if(styleName == "bold")
            {
                lastSelectedCell.style.fontWeight = "normal";
            }

            else if (styleName == "underline")
            {
                lastSelectedCell.style.textDecoration = "none";
            }

            else if(styleName == "italic")
            {
                lastSelectedCell.style.fontStyle = "normal";
            }
            element.classList.remove("active-font-style");
        }

        else
        {
            if(styleName == "bold")
            {
                lastSelectedCell.style.fontWeight = "bold";
            }

            else if (styleName == "underline")
            {
                lastSelectedCell.style.textDecoration = "underline";
            }

            else if(styleName == "italic")
            {
                lastSelectedCell.style.fontStyle = "italic";
            }
            element.classList.add("active-font-style");
        }
        
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}