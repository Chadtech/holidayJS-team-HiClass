/**
 * Created by User on 12/13/14.
 */
var animDuration = 1.5;

TweenLite.to($("#img1"), animDuration, {width:400, height:400, delay:animDuration*0});
TweenLite.to($("#img2"), animDuration, {width:400, height:400, delay:animDuration*1});
TweenLite.to($("#img3"), animDuration, {width:400, height:400, delay:animDuration*2, onComplete:playAudio});

TweenLite.to($("#img4"), 0, {autoAlpha:0});
TweenLite.to($("#img4"), 1, {autoAlpha:5, delay:animDuration*3});

function playAudio(){
    document.getElementById('audiotag1').play();
}
