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
    for(var j = 1; j <= 16; j++){
        var t = "cell"+j;
        var tId = document.getElementById(t);
        tId.style.backgroundImage = "url('background" + rand + ".jpg')";
    }
}

function setBackgroundImg(){
    for(var i = 1; i <= 5; i++){
        if(document.getElementById(i).checked == true){
            for(var j = 1; j < 16; j++){
                var t = "cell"+j;
                var tId = document.getElementById(t);
                tId.style.backgroundImage = "url('background" + i + ".jpg')";
            }
        }
    }
}


function hoverCheck(){ 
    var cell = document.getElementById(this.id);
    var empty = document.getElementById("cell16");
    
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

function moveCell(){ 
    checkCorrect();
    document.getElementById("response").innerHTML = "";
    var cell = document.getElementById(this.id);
    var empty = document.getElementById("cell16");
    
    var emptyLeft = empty.style.left; 
    var emptyTop = empty.style.top;   
    var currentTop = cell.style.top;  
    var currentLeft = cell.style.left;
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
        document.getElementById("moveCounter").innerHTML="Moves: " +moveCount; 
    }
    checkCorrect();
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

    if(check == 15){
        document.getElementById("response").innerHTML='you win test';
        clearInterval(time);
    }
}

function shuffle(){
    var count = 0;
    moveCount = 0;
    time = setInterval(function(){timer()},1000);
    document.getElementById("response").innerHTML = "";
    for(var j=0; j<1000;j++){
        var empty = document.getElementById("cell16");
        var emptyLeft = empty.style.left; 
        var emptyTop = empty.style.top; 

        var movable = []; 
        var x = document.querySelectorAll(".cells");
        for(var i =0; i<x.length; i++){ 

            var cell = x[i];
            var currentTop = cell.style.top;  
            var currentLeft = cell.style.left;
            
            var leftDiff = Math.abs(parseInt(currentLeft) - parseInt(emptyLeft));
            var topDiff = Math.abs(parseInt(currentTop) - parseInt(emptyTop));
            if((leftDiff == 100 && topDiff == 0) || (topDiff ==100 && leftDiff == 0)){
                movable.push(i);
            }
        }
        
        var rand = movable[Math.round(Math.random()*(movable.length-1))]; 
        var movableCell = x[rand];
        var movableCellTop = movableCell.style.top;
        var movableCellLeft = movableCell.style.left;
        movableCell.style.top = emptyTop; 
        movableCell.style.left = emptyLeft;
        var mv = parseInt(movableCell.id.replace( /[^\d.]/g, "" )-1);
        document.getElementsByClassName("cells")[mv].classList.add("animation");
        empty.style.top = movableCellTop;
        empty.style.left = movableCellLeft;  
       
    } 
}

var timestamp; 
function timer(){
    if(secs==60){
        mins++;
        secs = 0;
    }
    secs++;
    timestamp=""+mins+":"+secs;
    document.getElementById("timecont").innerHTML = timestamp;
}