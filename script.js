//Variables.
let computerBtn = document.getElementById("computerBtn");
let playerBtn = document.getElementById("playerBtn");
let container = document.getElementById("container");
let home = document.getElementById("home");

let resetBtn = document.getElementById("resetBtn");

//Functions to hide and display the homepage.
function hideHome(){
    container.style.display = "block";
    home.style.display = "none";
}
function displayHome(){
    container.style.display = "none";
    home.style.display = "block";
}
playerBtn.addEventListener("click",hideHome);
computerBtn.addEventListener("click", hideHome);

resetBtn.addEventListener("click", displayHome);
