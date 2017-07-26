    function ValueKeyPress()
    {
        var mymynumber = document.getElementById("rasha");
        var s = rasha.value;
    
        var mymytext = document.getElementById("demoo");
			if(s==""){
			document.getElementById("vis").style.filter = "brightness(50%)";
			document.getElementById("demoo").innerHTML = "";
			document.getElementById("mas").style.filter = "brightness(50%)";
				document.getElementById("demoo").innerHTML = "";
				document.getElementById("dis").style.filter = "brightness(50%)";
				document.getElementById("demoo").innerHTML = "";
				document.getElementById("ame").style.filter = "brightness(50%)";
				document.getElementById("demoo").innerHTML = "";
			}
			if(s==4){
				document.getElementById("vis").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "VISA";

			}
			if(s==34){
				document.getElementById("ame").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "American Express";

			}
			if(s==37){
				document.getElementById("ame").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "American Expresss";

			}
			if(s >= 644 && s <= 649){
				document.getElementById("dis").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "Discover";

			}
			if(s >= 622126 && s <= 622925){
				document.getElementById("dis").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "Discover";

			}
			if(s==65){
				document.getElementById("dis").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "Discover";

			}
			if(s==6011){
				document.getElementById("dis").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "Discover";

			}
			if(s >= 50 && s <= 55){
				document.getElementById("mas").style.filter = "brightness(100%)";
				document.getElementById("demoo").innerHTML = "Master Card";

			}
			
    }

