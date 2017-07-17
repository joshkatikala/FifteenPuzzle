window.onload = function(){ createPuzzle(); setup();backgroundImg();};

var correctPositions = [];
var correctPositions2 = [];
var time = null;
var secs = 0;
var mins = 0;
var rows = 4;
var cols = 4;
var number = 1;
var moveCount = 0;


function setup(){ 
    var timing = document.createElement("div");
    timing.id = "timerbox";
    document.getElementById("controls").appendChild(timing);

    var moving = document.createElement("div");
    moving.id = "movebox";
    document.getElementById("controls").appendChild(moving);

    var x = document.querySelectorAll(".cells");
    for (var i =0; i<x.length; i++){ 
        var tile = x[i];
        correctPositions.push(tile.style.top);
        correctPositions2.push(tile.style.left);
    }
}

function backgroundImg(){
    var rand = Math.floor((Math.random() * 5) + 1);
    for(var j = 1; j <= 16; j++){
        var t = "tile"+j;
        var tId = document.getElementById(t);
        tId.style.backgroundImage = "url('background" + rand + ".jpg')";
    }
}

function setBackgroundImg(){
    for(var i = 1; i <= 5; i++){
        if(document.getElementById(i).checked == true){
            for(var j = 1; j < 16; j++){
                var t = "tile"+j;
                var tId = document.getElementById(t);
                tId.style.backgroundImage = "url('background" + i + ".jpg')";
            }
        }
    }
}

function createPuzzle() { 
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            var newCell = document.createElement("div");
            newCell.id = "tile"+number;
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

function hoverCheck(){ 
    var tile = document.getElementById(this.id);
    var empty = document.getElementById("tile16");
    
    var emptyLeft = empty.style.left; 
    var emptyTop = empty.style.top;   
    var currentTop = tile.style.top;  
    var currentLeft = tile.style.left;
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

function moveCell(){ 
    checkCorrect();
    var tile = document.getElementById(this.id);
    var empty = document.getElementById("tile16");
    
    var emptyLeft = empty.style.left; 
    var emptyTop = empty.style.top;   
    var currentTop = tile.style.top;  
    var currentLeft = tile.style.left;
    var noCurrentTop = parseInt(currentTop);
    var leftDiff = Math.abs(parseInt(currentLeft) - parseInt(emptyLeft));
    var topDiff = Math.abs(parseInt(currentTop) - parseInt(emptyTop));
    if((leftDiff == 100 && topDiff == 0) || (topDiff ==100 && leftDiff == 0)){
        this.style.top = emptyTop;
        this.style.left = emptyLeft;
        var mv = parseInt(this.id.replace( /[^\d.]/g, "" )-1);
        document.getElementsByClassName("cells")[mv].classList.add("animation");
        empty.style.top = currentTop;
        empty.style.left = currentLeft;
        setTimeout(function(){document.getElementsByClassName("cells")[mv].classList.remove("animation");},2000);
        moveCount++;
        document.getElementById("movebox").innerHTML="Moves: " +moveCount; 
    }
    checkCorrect();
}

function checkCorrect(){ 
    var check = 0, xtop, xleft;
    var x = document.querySelectorAll(".cells"); 
    for(var i = 0; i<x.length; i++){ 
        
        xtop = window.getComputedStyle(x[i]).getPropertyValue("top");
        xleft = window.getComputedStyle(x[i]).getPropertyValue("left");

        if(correctPositions[i]==xtop){
            if(correctPositions2[i]== xleft){
                check++;}
        }
    }

    if(check==15){
        document.getElementById("output").innerHTML='you win test';
        clearInterval(time);
    }
}

function start(){
    var count = 0;
    moveCount = 0;
    time = setInterval(function(){timer()},1000);
    document.getElementById("output").innerHTML = "";
    for(var j=0; j<1000;j++){
        var empty = document.getElementById("tile16");
        var emptyLeft = empty.style.left; 
        var emptyTop = empty.style.top; 

        var movable = []; 
        var x = document.querySelectorAll(".cells");
        for(var i =0; i<x.length; i++){ 

            var tile = x[i];
            var currentTop = tile.style.top;  
            var currentLeft = tile.style.left;
            
            var leftDiff = Math.abs(parseInt(currentLeft) - parseInt(emptyLeft));
            var topDiff = Math.abs(parseInt(currentTop) - parseInt(emptyTop));
            if((leftDiff == 100 && topDiff == 0) || (topDiff ==100 && leftDiff == 0)){
                movable.push(i);
            }
        }
        
        var rand = movable[Math.round(Math.random()*(movable.length-1))]; 
        var movabletile = x[rand];
        var movabletiletop = movabletile.style.top;
        var movabletileleft = movabletile.style.left;
        movabletile.style.top = emptyTop; 
        movabletile.style.left = emptyLeft;
        var mv = parseInt(movabletile.id.replace( /[^\d.]/g, "" )-1);
        document.getElementsByClassName("cells")[mv].classList.add("animation");
        empty.style.top = movabletiletop;
        empty.style.left = movabletileleft;  
       
    } 
}

var timestamp; 
function timer(){
    if(secs==60){
        mins++;
        secs = 0;
    }
    secs++;
    timestamp="Time: "+mins+":"+secs;
    document.getElementById("timerbox").innerHTML = timestamp;
}