window.onload = function(){ createPuzzle(); setup();backgroundImg();};

var correctPositions = [];
var correctPositions2 = [];
var time = null;
var secs = 0;
var mins = 0;
var rows = 6;
var cols = 6;
var number = 1;
var moveCount = 0;
var tnum = 1;

function createPuzzle() { 
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            var newCell = document.createElement("div");
            newCell.id = "cell"+number;
            newCell.className = "cells";
            newCell.style.left = (j * 100) + "px";
            newCell.style.top = (i * 100) + "px";
            newCell.innerHTML = number;

            document.getElementById("puzzle").appendChild(newCell);
            newCell.onmouseenter = hoverCheck;
            newCell.onmouseout = noHover;
            newCell.onclick = moveCell;
            number++;
        }
    }   
}

function setup(){ 
    var c = document.querySelectorAll(".cells");
    for (var i =0; i < c.length; i++){ 
        var cell = c[i];
        correctPositions.push(cell.style.top);
        correctPositions2.push(cell.style.left);
    }

    var t = document.createElement("div");
    t.id = "timecont";
    document.getElementById("more").appendChild(t);

    var m = document.createElement("div");
    m.id = "moveCounter";
    document.getElementById("more").appendChild(m);
}

function backgroundImg(){
    var rand = Math.floor((Math.random() * 5) + 1);
    for(var j = 1; j <= 36; j++){
        var t = "cell"+j;
        var tId = document.getElementById(t);
        tId.style.backgroundImage = "url('sbackground" + rand + ".jpg')";
    }
}

function setBackgroundImg(){
    for(var i = 1; i <= 5; i++){
        if(document.getElementById(i).checked == true){
            for(var j = 1; j < 36; j++){
                var t = "cell"+j;
                var tId = document.getElementById(t);
                tId.style.backgroundImage = "url('sbackground" + i + ".jpg')";
            }
        }
    }
}


function hoverCheck(){ 
    var cell = document.getElementById(this.id);
    var empty = document.getElementById("cell36");
    
    var emptyLeft = empty.style.left; 
    var emptyTop = empty.style.top;   
    var currentTop = cell.style.top;  
    var currentLeft = cell.style.left;
    var noCurrentTop = parseInt(currentTop);
    var leftDiff = Math.abs(parseInt(currentLeft) - parseInt(emptyLeft));
    var topDiff = Math.abs(parseInt(currentTop) - parseInt(emptyTop));
    if((leftDiff == 100 && topDiff == 0) || (topDiff ==100 && leftDiff == 0)){
        this.style.borderColor = "red"; 
        this.style.color = "#006600";
        this.style.textDecoration = "underline";
        this.style.cursor = "pointer";
    }

}

function noHover(){ 
        this.style.borderColor = "black";
        this.style.color = "white";
        this.style.textDecoration = "none";
        this.style.cursor = "default";
}

function checkCorrect(){ 
    var check = 0, xtop, xleft;
    var x = document.querySelectorAll(".cells"); 
    for(var i = 0; i < x.length; i++){ 
        xtop = window.getComputedStyle(x[i]).getPropertyValue("top");
        xleft = window.getComputedStyle(x[i]).getPropertyValue("left");
        if(correctPositions[i] == xtop){
            if(correctPositions2[i] == xleft){
                check++;
            }
        }
    }

    if(check == 35){
        document.getElementById("zoom").style.display = "block";
        document.getElementById("response").innerHTML += "Time Taken: " +timeString+ "<br /> Moves: " +moveCount;
        document.body.style.backgroundImage  = "url('fireworks.gif')";
        clearInterval(time);
    }
}

function moveCell(){ 
    document.getElementById("zoom").style.display = "none";
    document.getElementById("response").innerHTML = "";
    document.body.style.backgroundImage  = "none";
    checkCorrect();
    var cell = document.getElementById(this.id);
    var openCell = document.getElementById("cell36");
    
    var openLeft = openCell.style.left; 
    var openTop = openCell.style.top;   
    var currentTop = cell.style.top;  
    var currentLeft = cell.style.left;
    var noCurrentTop = parseInt(currentTop);
    var leftDist = Math.abs(parseInt(currentLeft) - parseInt(openLeft));
    var topDist = Math.abs(parseInt(currentTop) - parseInt(openTop));
    if((leftDist == 100 && topDist == 0) || (topDist ==100 && leftDist == 0)){
        this.style.top = openTop;
        this.style.left = openLeft;
        var mv = parseInt(this.id.replace( /[^\d.]/g, "" )-1);
        document.getElementsByClassName("cells")[mv].classList.add("moveAnimation");
        openCell.style.top = currentTop;
        openCell.style.left = currentLeft;
        setTimeout(function(){document.getElementsByClassName("cells")[mv].classList.remove("moveAnimation");},2000);
        moveCount++;
        document.getElementById("moveCounter").innerHTML="Moves: " +moveCount; 
    }
    checkCorrect();
}

function shuffle(){
    var count = 0;
    moveCount = 0;
    time = setInterval(function(){timer();},1000);
    document.getElementById("zoom").style.display = "none";
    document.getElementById("response").innerHTML = "";
    document.body.style.backgroundImage  = "none";

    for(var j = 0; j < 800; j++){
        var openCell= document.getElementById("cell36");
        var openLeft = openCell.style.left; 
        var openTop = openCell.style.top; 
        var rando = Math.floor(Math.random() + 4);
        var movable = []; 
        var x = document.querySelectorAll(".cells");
        for(var i =0; i<x.length; i++){ 
            var cell = x[i];
            var currentTop = cell.style.top;  
            var currentLeft = cell.style.left;
            
            var leftDist = Math.abs(parseInt(currentLeft) - parseInt(openLeft));
            var topDist = Math.abs(parseInt(currentTop) - parseInt(openTop));
            if((leftDist = 100 && topDist == 0) || (topDist ==100 && leftDist == 0)) {
                movable.push(i);
            }
        }
        
        var rand = movable[Math.round(Math.random()*(movable.length-1))]; 
        var movableCell = x[rand];
        var movableCellTop = movableCell.style.top;
        var movableCellLeft = movableCell.style.left;
        movableCell.style.top = openTop; 
        movableCell.style.left = openLeft;
        var mv = parseInt(movableCell.id.replace( /[^\d.]/g, "" )-1);
        document.getElementsByClassName("cells")[mv].classList.add("moveAnimation");
        openCell.style.top = movableCellTop;
        openCell.style.left = movableCellLeft;  
    } 
}

var timeString; 
function timer(){
    if(secs == 60){
        mins++;
        secs = 0;
    }
    secs++;
    timeString = mins+":"+secs;
    document.getElementById("timecont").innerHTML = timeString;
}