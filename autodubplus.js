
var autoDub = {
	started: false,
	version: "00.02"
}
var userList= [];


autoDub.test = function()
{
	console.log('in test');
var newlist = autoDub.getUsers();

autoDub.testList(newlist, userList, function(user) { if(user) { console.log(user+' diff found'); $("#chat-txt-message").val("heya @"+user+"!");} autoDub.testList(userList, newlist, function(user) { if(user) { console.log(user+'otherdiff'); $("#chat-txt-message").val("see ya @"+user);} userList = newlist; });});
//autoDub.testList(userList, newlist, function(user) { console.log(user+'otherdiff'); userList = newlist; });
}

autoDub.testList = function(listLoop, listCompare, callback)
{
	console.log('in testList');
	$.each(listLoop, function(index, item) {
		console.log('testing '+item);
		if ($.inArray(item, listCompare) < 0)
		{
			console.log(item+' is not in list');
			callback(item);
			return true;
		} else {
		
		}
	});
	callback(false);
}

autoDub.userEnterLeave = function() {
console.log('original users');
console.log(userList);
	nowUsers = autoDub.getUsers();
	var entertext = '';	
	if (nowUsers.length > userList.length)
	{
		entertext = "Heya @";		
	} else {
		entertext = "seeya @";
	}
console.log(entertext);
	var userEnter = autoDub.notInList(nowUsers, userList);
	var userLeave = autoDub.notInList(userList, nowUsers);
	
	if (userEnter)
	{
		console.log(entertext + userEnter);
		$("#chat-txt-message").val(entertext + userEnter + "!");
	}
	if (userLeave)
	{
		console.log(entertext+userLeave);
		$("#chat-txt-message").val(entertext + userLeave + "!");
	}

	
	console.log('new userlist');
	console.log(userList);
}
autoDub.notInList = function(listLoop, listCompare, callback)
{
	$.each(listLoop, function(index, item) {
		console.log('testing '+item);
		if ($.inArray(item, listCompare) < 0)
		{
			console.log(item+' is not in list');
			callback(item);
		} else {
		
		}
	});
	return false;
}
autoDub.getUsers = function()
{
	users = [];
	$("#avatar-list li p").each(function(one, thing) { 

	if (thing.className == 'username')
	{
		users.push($(thing).html());
	}
	
	});

	return users;
}

autoDub.newSong = function(){
	var songName = $(".currentSong").text();
	if (songName == "loading...") return;
	$(".dubup").click();
	console.log("voted for "+songName);
};

autoDub.init = function(){
	$('.currentSong').bind("DOMSubtreeModified", autoDub.newSong);
	
	$(".dubup").click();

		
	$('.room-user-counter').bind("DOMSubtreeModified", autoDub.test);

	userList = autoDub.getUsers();

	console.log("autodub v"+autoDub.version+" is a go!");
};

if (!autoDub.started) autoDub.init();
