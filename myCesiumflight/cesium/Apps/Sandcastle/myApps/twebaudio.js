var twebaudio=1;
try{
var audioctx = new (window.AudioContext || window.webkitAudioContext)();
var songlength;
function loadsound(source,url){
source.request = new XMLHttpRequest();
source.request.open('GET', url, true);
source.request.responseType = 'arraybuffer';
source.request.onload = function() {
var audioData = source.request.response;
audioctx.decodeAudioData(audioData, function(buffer) {
//myBuffer = buffer;
songlength = buffer.duration;
source.buffer = buffer;
source.playbackRate.value = 1.0;
//source.connect(audioctx.destination);
source.loopStart=0.5;
source.loopEnd=songlength-0.5;
source.gainNode = audioctx.createGain();
source.connect(source.gainNode);
source.gainNode.connect(audioctx.destination);
source.gainNode.gain.value = 1.0;
if(source.onload){source.onload();}
},
function(e){alert("Error with decoding audio data" + e.err);});
}
source.request.send();
}
function loadsound64(source,data){
var audioData = Base64Binary.decodeArrayBuffer(data.split(",")[1]);
audioctx.decodeAudioData(audioData, function(buffer) {
//myBuffer = buffer;
songlength = buffer.duration;
source.buffer = buffer;
source.playbackRate.value = 1.0;
//source.connect(audioctx.destination);
source.loopStart=0.5;
source.loopEnd=songlength-0.5;
source.gainNode = audioctx.createGain();
source.connect(source.gainNode);
source.gainNode.connect(audioctx.destination);
source.gainNode.gain.value = 1.0;
if(source.onload){source.onload();}
audioData=null;
},
function(e){alert("Error with decoding audio data" + e.err);});
}
function setvol(source,vol){
  if(source.gainNode){source.gainNode.gain.value = vol;}
}
function setspeed(source,speed){
  if(source.playbackRate){source.playbackRate.value=speed;}
}
function playloop(source){source.loop=true;source.start(0);}
function playsound(source) {if(!source.gainNode){return;}
  var sourcex = audioctx.createBufferSource(); // creates a sound source
  sourcex.buffer = source.buffer;  // tell the source which sound to play
  sourcex.loop=false;
  if(source.playbackRate){
     if(sourcex.playbackRate){sourcex.playbackRate.value=source.playbackRate.value;}
  }	 
  sourcex.connect(source.gainNode);       // connect the source to the audioctx's destination (the speakers)
  sourcex.start(0);                           // play the source now                                           // note: on older systems, may have to use deprecated noteOn(time);
}
//var wav="mp3",browser="";
//if(navigator.userAgent.toLowerCase().indexOf("firefox") > -1){wav="ogg";browser="firefox";};
//if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1){wav="wav";};
//alert(navigator.userAgent+" "+wav);
var audiosrc="";
var myaudio = audioctx.createBufferSource();
myaudio.volume=0;
loadsound64(myaudio,avion2mp3);
myaudio.onload=function(){
 setTimeout("playloop(myaudio);",300);
 setTimeout("setvol(myaudio,0.3);",300);
 setTimeout("setspeed(myaudio,1.0);",300);
 }
/*var myaudiojet = audioctx.createBufferSource();
myaudiojet.volume=0;
loadsound64(myaudiojet,jet4mp3);
myaudiojet.onload=function(){
 setTimeout("playloop(myaudiojet);",320);
 setTimeout("setvol(myaudiojet,0.003);",320);
 setTimeout("setspeed(myaudiojet,1.0);",320);
 }*/
var myaudiopneu = audioctx.createBufferSource();
//audiosrc=folder+"pneu."+wav;
myaudiopneu.volume=0;
loadsound64(myaudiopneu,pneump3);
myaudiopneu.onload=function(){
 setTimeout("playsound(myaudiopneu);",500);
 setTimeout("setvol(myaudiopneu,0.4);",500);
 setTimeout("setspeed(myaudiopneu,1.0);",500);
 }
var tpneu=0,tsoundpneu=0;
function soundpneu(){
 if(tframe>tsoundpneu+1000){
   tsoundpneu=tframe;
   playsound(myaudiopneu);
   }
}
function closewebaudio(){
  myaudio.buffer=null;
  myaudiojet.buffer=null;
  myaudiopneu.buffer=null;
}
}catch(e){twebaudio=0;};
//if(twebaudio==1){alert(tpneu);soundpneu();}

