/*
 * filename: userlist.js
 * author: firekyrin
 * uri: http://www.firekyrin.com/
 * version: 1.0
 */

function loader(){
				
			document.getElementById("fkr-container-2").style.display="none";
			document.getElementById("fkr-container-3").style.display="none";
			

		}
		





function go_search(){

					
/*					
					       var iosocket = io.connect();
 
			               iosocket.on('connect', function () {
			              //  $('#incomingChatMessages').append($('<li>Connected</li>'));
			 
				                iosocket.on('message', function(message) {
			    	            //    $('#incomingChatMessages').append($('<li></li>').text(message));
			        	        });
			            	    iosocket.on('disconnect', function() {
			                	 //   $('#incomingChatMessages').append('<li>Disconnected</li>');
			                	});
			            	});
 */

	
	/////////Get user list from server then reserve to user list array.
	var list1=document.getElementById("user_list");
	list1.innerHTML="<li>"+localStorage.name;
	
		
	var userlist=new Array();
	userlist[0]="00000000000";
	userlist[1]="1111111111";
	userlist[2]="222222222";
	
	for (i=0;i<3;i++){	//3 is user number
		
		var li1=document.createElement("li");
		var text1=document.createTextNode(userlist[i]);
		li1.appendChild(text1);
		list1.appendChild(li1);
	
		
	}
	on();
	on_list_click();// update list  reload function click && mouseover

///////////	
	/*	
		alert('js go connect');
		var iosocket = io.connect();
			
		iosocket.on('join', function () {
			alert("connected...");// connect to server.
			
			
			
			}
		
			
			
			
			iosocket.on('message', function () {
			alert("message...");// connect to server.
			
			}
			
			iosocket.on('disconnect', function () {
			alert("disconnected...");// connect to server.
			
			}*/
	///////////////

}

	
					
		
	///////mouse over	
var list1 = document.getElementById("user_list").getElementsByTagName("li");

function color(){
	for (i=0;i<list1.length;i++){
		list1[i].className=""

		if (list1[i]==this){
			list1[i].className="blue";

		}
	}
}
function on(){
	for (i=0;i<list1.length;i++){
		
		list1[i].onmouseover=color;
	
	}
}
on();



var listclick = document.getElementById("user_list").getElementsByTagName("li");

function list_click(){
	for (i=0;i<listclick.length;i++){
		listclick[i].className=""

		if (listclick[i]==this){
			//list1[i].className="blue";
			document.getElementById("fkr-container-2").style.display="none";
			document.getElementById("fkr-container-3").style.display="block";
			localStorage.currentchat=listclick[i].innerHTML;
			
		
		}
	}
}
function on_list_click(){
	for (i=0;i<listclick.length;i++){
		listclick[i].onclick=list_click;
	
	}
}
on_list_click();

