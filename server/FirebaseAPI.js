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

function loadImage(selectedImage){
    $('#spin').append(spinner);

    spinner.spin(document.getElementById('spin'));
    var f = new Firebase(imagesRef + 'images/' + selectedImage );
    f.once('value', function(snap) {
        var payload = snap.val();
        if (payload != null) {
            //FIXME: convert the recovered image into an actual image?
            return payload;
        }
        spinner.stop();
    });
}

function getBase64FromImageUrl(URL) {
    var img = new Image();
    img.src = URL;
    img.onload = function () {


        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);


        var dataURL = canvas.toDataURL("image/png");

        //alert(  dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

        return dataURL;
    }
}

function getListOfImages(){
    new Firebase(imagesRef).once(
        'value',
        function(dataSnapshot){

            // Then I need to loop over all elements to extract ids !
            var videoIdIndex = 0;
            var videoIds = new Array();

            dataSnapshot.forEach(
                function(childSnapshot) {
                    videoIds[videoIdIndex++] = childSnapshot.name();
                }
            );

        }
    );
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

