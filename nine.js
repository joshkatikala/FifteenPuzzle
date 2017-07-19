
window.onload = function(){ breakdown(); setup();backgroundImg();};

var correctPositions = [];
var correctPositions2 = [];
var time = null;
var secs = 0;
var mins = 0;
var rows = 3;
var cols = 3;
var number = 1;
var moveCount = 0;
var tnum = 1;

function breakdown(){
    for(var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            var newCell = document.createElement("div");
            newCell.id = "tcell"+tnum;
            newCell.className = "tcells";
            newCell.style.left = (j * 100) + "px";
            newCell.style.top = (i * 100) + "px";
            newCell.innerHTML = tnum;

            document.getElementById("tpuzzle").appendChild(newCell);
            newCell.onmouseenter = hoverCheck;
            newCell.onmouseout = noHover;
            newCell.onclick = moveCell;
            tnum++;
        }
    }
    tbackgroundImg();
    tnum = 1;
}

function tbackgroundImg(){
    var rand = Math.floor((Math.random() * 5) + 1);
    for(var j = 1; j <= 9; j++){
        var t = "tcell"+j;
        var tId = document.getElementById(t);
        tId.style.backgroundImage = "url('tbackground" + rand + ".jpg')";
    }
}

function setTBackgroundImg(){
    for(var i = 1; i <= 5; i++){
        if(document.getElementById(i).checked == true){
            for(var j = 1; j < (cols * rows); j++){
                var t = "tcell"+j;
                var tId = document.getElementById(t);
                tId.style.backgroundImage = "url('tbackground" + i + ".jpg')";
            }
        }
    }
}

function setup(){ 
    var c = document.querySelectorAll(".tcells");
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

function hoverCheck(){ 
    var cell = document.getElementById(this.id);
    var empty = document.getElementById("tcell9");
    
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
    var x = document.querySelectorAll(".tcells"); 
    for(var i = 0; i < x.length; i++){ 
        xtop = window.getComputedStyle(x[i]).getPropertyValue("top");
        xleft = window.getComputedStyle(x[i]).getPropertyValue("left");
        if(correctPositions[i] == xtop){
            if(correctPositions2[i] == xleft){
                check++;
            }
        }
    }

    if(check == 8){
        clearInterval(time);
		
		  document.getElementById("zoom").style.display = "block";
		     document.body.style.backgroundImage  = "url('fireworks.gif')";
    }
}

function moveCell(){ 
    checkCorrect();
    document.getElementById("response").innerHTML = "";
    var cell = document.getElementById(this.id);
    var openCell = document.getElementById("tcell9");
    
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
        document.getElementsByClassName("tcells")[mv].classList.add("moveAnimation");
        openCell.style.top = currentTop;
        openCell.style.left = currentLeft;
        setTimeout(function(){document.getElementsByClassName("tcells")[mv].classList.remove("moveAnimation");},2000);
        moveCount++;
        document.getElementById("moveCounter").innerHTML="Moves: " +moveCount; 
    }
    checkCorrect();
}

function shuffle(){
    var count = 0;
    moveCount = 0;
    time = setInterval(function(){timer();},1000);
    document.getElementById("response").innerHTML = "";

    for(var j = 0; j < 800; j++){
        var openCell= document.getElementById("tcell9");
        var openLeft = openCell.style.left; 
        var openTop = openCell.style.top; 
        var rando = Math.floor(Math.random() + 4);
        var movable = []; 
        var x = document.querySelectorAll(".tcells");
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
        document.getElementsByClassName("tcells")[mv].classList.add("moveAnimation");
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