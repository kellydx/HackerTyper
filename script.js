// function to record key pressed and call addText function
$(function(){
	$( document ).keydown(
		function ( event ) {
			Typer.addText( event ); 
		}
	);
    } 
);

var Typer={
	text: null,
	accessCountimer:null,
	index:0, // current cursor position
	speed:2, // speed of the Typer
	file:"source.txt", 
	
	init: function(){
		this.accessCountimer=setInterval(function(){Typer.updLstChr();},500); 
		$.get(Typer.file,function(data){// get the text file
			Typer.text=data;
		});
	},

    //get console content
	content:function(){
		return $("#console").html();
	},
    
    // append text to console
	write:function(str){
		$("#console").append(str);
		return false;
	},

	addText:function(key){
	  var console=$("#console")
		if(Typer.text){ 
			var cont=Typer.content(); 
			if(cont.substring(cont.length-1,cont.length)==="|") // if the last char is the blinking cursor
				console.html(console.html().substring(0,cont.length-1)); // remove it before adding the text
			if(key.key!=='Backspace'){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			var text=$("<div/>").text(Typer.text.substring(0,Typer.index)).html();// parse the text for stripping html entities
			var rtn= new RegExp("\n", "g"); // newline regex
			var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
      console.html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0,50); // scroll to make sure bottom is always visible
		}	
		}
	},

	
}