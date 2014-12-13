/**
 * Created by User on 12/13/14.
 */

src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
src="//cdn.firebase.com/v0/firebase.js"
src="//cdnjs.cloudflare.com/ajax/libs/spin.js/1.2.7/spin.min.js"

var spinner = new Spinner({color: '#ddd'});
var firebaseRef = 'https://holidayjs2014.firebaseio.com/';
var chatRef = firebaseRef+'chat/';
var imagesRef = firebaseRef+'images/';

//variables referred to on the html
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#example-messages');

function saveImage(ImageRef,hitbox) {

    var firebase = new Firebase(imagesRef);

    var _URL = window.URL || window.webkitURL;

    imgString = getBase64FromImageUrl(imagesRef)

    firebase.push({filePayload:imgString, hitbox:hitbox})
}

function getListOfImages(){
    var f = new Firebase(imagesRef);
    f.once('value', function(snap) {
        var payload = snap.val();
        console.log(payload);
        return payload
    });
}

////////////////////////////////////////////////////////////////////////////////////////////
//                                      Chat functions
////////////////////////////////////////////////////////////////////////////////////////////
messageField.keypress(function (e) {
    if (e.keyCode == 13) {
        //FIELD VALUES
        var username = nameField.val();
        var message = messageField.val();

        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        saveChat(username,message);
        messageField.val('');
    }
});

function saveChat(username,message) {

    var messagesRef = new Firebase(chatRef);

    messagesRef.push({name:username, text:message});
}

//watch for new chat messages
chatRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
});

function loadChat(){


    return;
}

