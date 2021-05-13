let menu = document.querySelector(".menu");
let fileMenuOptions = document.querySelector(".file-menu-options");
let homeMenuOptions = document.querySelector(".home-menu-options");
let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");

menu.addEventListener("click", function(e){
    
    if(e.target.classList.contains("menu"))
    {
        return;
    }

    let selectedMenu = e.target;
    if(selectedMenu.classList.contains("active-menu"))
    {
        return;
    }

    document.querySelector(".active-menu").classList.remove("active-menu");
    selectedMenu.classList.add("active-menu");


    let menuName = selectedMenu.classList[0];
    if(menuName == "home")
    {
        homeMenuOptions.classList.remove("hide");
        fileMenuOptions.classList.add("hide");
    }
    
    else
    {
        homeMenuOptions.classList.add("hide");
        fileMenuOptions.classList.remove("hide");
    }
})

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