const gridContainer = document.querySelector(".grid-container");

// use populateCells function to do what the name suggests 
populateCells(16*16); 


// Add event listener to the create button
document.querySelector("#create").addEventListener("click",function(){
    createGrid();
});   








// This function creates the grid by getting the rows and cols
// then populate it with cells
function createGrid(){
    const rows = parseInt(document.querySelector("#rows").value);
    const cols = parseInt(document.querySelector("#cols").value);
    if(rows>0 && cols>0){
        document.querySelector("body").style.setProperty("--rows",rows);
        document.querySelector("body").style.setProperty("--cols",cols);
        populateCells(rows*cols);
    }else{
        alert("Please provide sensible values for rows and columns...!");
    }
    document.querySelector("#rows").value = ""; 
    document.querySelector("#cols").value = "";
} 

// This function adds the grid cells to the grid container
function populateCells(numberOfCells){
    gridContainer.innerHTML = "";
    for(let i = 0 ; i<numberOfCells;i++){
        const gridItem = document.createElement("div"); 
        gridItem.classList.add("cell"); 
        gridItem.setAttribute("id",i);
        gridContainer.appendChild(gridItem);
    }  
}