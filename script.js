const gridContainer = document.querySelector(".grid-container");

// use populateCells function to do what the name suggests 
populateCells(16*16); 


// Add event listener to the create button
document.querySelector("#create").addEventListener("click",function(){
    createGrid();
});   

let isSketching = false;
let isErasing = false;
// Add event listener (keydown) to the document to capture (s) and (e) keys in addtion to 
// (Enter) key
document.addEventListener("keydown",function(event){
    if(event.code ==="KeyS"){
        isSketching = !isSketching;
        isErasing = false;
    }
    if(event.code === "Enter"){
        createGrid();
        document.querySelector("#rows").blur(); 
        document.querySelector("#cols").blur();
    }
    if(event.code === "KeyE"){
       isErasing = !isErasing; 
       isSketching = false;
    }
}); 


// Mouse Over Event
// Add event listener to the grid container (this will include all the cells inside it)
gridContainer.addEventListener("mouseover",function(event){
    if(isSketching){
        let id = event.target.id;
        let cellBackgroundColor = getComputedStyle(event.target).getPropertyValue("background-color"); 
        if(cellBackgroundColor === "rgb(255, 255, 255)"){
            let randColor = randomColor(); 
            event.target.style.backgroundColor = convertRGBtoHEX(randColor);
        }
    }if(isErasing){
        erase(event);
    }
    
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

// This function generates random color
// in RGB format
function randomColor(){
    let color = {}; 
    color.red = Math.floor(Math.random()*240); 
    color.green = Math.floor(Math.random()*240); 
    color.blue = Math.floor(Math.random()*240);
    return color; 
}  

// This function convert RGB color to HEX Code
function convertRGBtoHEX(color){
    let zeroPad = (colorPortion)=> colorPortion.length===1 ? "0"+colorPortion : colorPortion;
    return "#"+zeroPad(color.red.toString(16))+zeroPad(color.green.toString(16))+zeroPad(color.blue.toString(16)); 
}

// This function erases a cell when being pointed at. 
function erase(event){ 
    let cellBackgroundColor = getComputedStyle(event.target).getPropertyPriority("background-color"); 
    if(cellBackgroundColor !== "rgb(255, 255, 255)"){
        event.target.style.backgroundColor = convertRGBtoHEX({red:255,green:255,blue:255});
    }
}