/*
 * filename: script.js
 * author: firekyrin
 * uri: http://www.firekyrin.com/
 * version: 1.0
 */

var socket = io.connect(); 

var ulist ={};

function login() {
	var username = $('#username_input').val(); //attr("value");
	var myname=username.trim();
	
	if(myname==""){
		alert("Please input your name.");
	}else{
	
			if(0 <= myname.search(/ /)){
				alert("User name shouldn't have space");
			}
			else{
				//var socket = io.connect(); 
				socket.on('join', function (data) { 
					//alert(data.cid);
					status('Client ' + data.cid + ' joins!'); 
				});
				socket.emit('submitnick', {myname:myname});
				localStorage.myname=myname;
				$('#fkr-container-1').hide();
				$('#fkr-container-2').show();
				$('#fkr-container-3').hide();
			}
		}	
}

socket.on('quit', function (data) { 
	status('Client ' + data.cid + ' quits!'); 
}); 

/*
socket.on('join', function (data) { 
	//alert(data.cid);
	socket.emit('me', {cid:data.cid, nick:nick});
	status('Client ' + data.cid + ' joins!'); 
}); 
*/

socket.on('broadcast', function (data) { 
	//$('#thread').append($('<div>').html('client ' + data.cid + ' says:<br/>' + data.w)); 
	//$('#incomingChatMessages').append($('<li style="color:'+ getRandomColor() +'">').html('client ' + data.cid + ' says:<br/>' + data.w)); 
	/*
	for(var client in ulist)
	{
		if(client != data.cid)
	}
	*/
	
	//deal message from server.
	var message=data.w;
//	var showMessage=message;
/*	alert(message.split("@#",0));
	alert(message.split("@#",1));
	alert(message.split("@#",2));
	alert(message.split("@#",3));
	*/
	showMessage=message.split("@#");
	
	fromUser=showMessage[1];
	toUser=showMessage[3];
	var messageText=message.split(showMessage[3]+"@#");///bug????? show empty but "to@#"

	if(toUser.match($('#username_input').val())){
			if(fromUser.match($('#username_input').val())){
				;
			}else{
							
						if(fromUser.match($('#title-nick').text())){
							$('#incomingChatMessages').append($('<li style="color:blue">').html(messageText[1])); 
						}else{
								
							var switchchat=confirm("You have a new message from "+fromUser+",Chat Now ?")
							if(switchchat){// change to a new client chat
								$('#fkr-container-2').hide();
								$('#fkr-container-3').show();
								$('#title-nick').text(fromUser);
								$('#incomingChatMessages').empty();
								$('#incomingChatMessages').append($('<li style="color:blue">').html(messageText[1])); 
								
							}
							
						}
															 
						
						
			
			}
	}
	else
	{
		;
		
	}
	
	
}); 


socket.on('userlist', function(data) {
	ulist = JSON.parse(data);
	$('#user_list').empty();
	for(var euser in ulist)
	{
		if(ulist[euser]=="aaa")
			continue;
		$('#user_list').append($('<li id="'+euser+'">').html(ulist[euser]+'<br/>'));
		$('#'+euser+'').hover(
			function (){
				var curUserId = $(this).attr("id");
				$('#'+curUserId+'').css("color", "blue");
				},
			function (){
				var curUserId = $(this).attr("id");
				$('#'+curUserId+'').css("color", "black");
				}

		);
		
		$('#'+euser+'').click(
			function (){
				
				var curUserId = $(this).attr("id");
				var curUserName = ulist[curUserId];
			
				//$('#fkr-container-1').hide();
				$('#fkr-container-2').hide();
				$('#fkr-container-3').show();
				$('#title-nick').text(curUserName);
				$('#incomingChatMessages').empty();
			}
		);
		
	}
	
});

function repeat() { 
	var message=$('#outgoingChatMessage').val();
	var words ="from@#"+localStorage.myname+"@#to@#"+$('#title-nick').text()+"@#"+$('#outgoingChatMessage').val();
	 
//	if($.trim($('#outgoingChatMessage').val())) { 
	if($.trim(message)){
		//socket.send(words); 
		socket.emit('say', {w: words}); 
		$('#outgoingChatMessage').val(''); 
		$('#incomingChatMessages').append($('<li style="color:red">').html(message));
	} 
} 

function status(w) { 
	$('#status').html(w); 
}

function initialize() { 
	$(document).delegate('#outgoingChatMessage', 'keydown', function (evt) { 
		//console.info(evt.keyCode); 
		if(evt.keyCode == 13 && evt.ctrlKey) { 
			$('#send').focus().click(); 
		} 
	}); 
	$('#fkr-container-2').hide();
	$('#fkr-container-3').show();
}

/////////////////////////////////////////////////////


function goback() {
	//$('#fkr-container').removeClass("fkr-chat fkr-chat-360p");
	//$('#fkr-container').remove();
	/*
	$('#fkr-container').empty();
	$('#fkr-container').add('' +
				'<div class="fkr-header">' +
                           		'<div class="fkr-back">' +
                           		'</div>' +
                           		'<div class="fkr-title">' +
                               	 		'FChat' +
                           		'</div>' +
                           		'<div class="fkr-search">' +
                                		'<button onclick="go-search">搜 索</button>' +
                           		'</div>' +
                        	'</div>' +
                        	'<div class="fkr-controls-friend">' +
                        	        '<ul>' +
                	                        '<li><a href="*"> test-user1</a></li>' +
        	                                '<li><a href="*"> test-user2</a></li>' +
	                                        '<li><a href="*"> test-user3</a></li>' +
                                        	'<li><a href="*"> test-user4</a></li>' +
                                	'</ul>' +
                        	'</div>').appendTo('#fkr-container');
	
	*/
	$('#fkr-container-3').hide();
	$('#fkr-container-2').show();
}

function keypress_cb() {
	$(document).delegate('#outgoingChatMessage', 'keydown', function (evt) { 
		if(evt.keyCode == 13) { 
			repeat();
		} 
	}); 
}

function getRandomColor(){
	return '#'+(Math.random()*0xffffff<<0).toString(16);
}


