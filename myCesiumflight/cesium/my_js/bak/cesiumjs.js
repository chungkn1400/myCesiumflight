// A demo of interactive 3D Tiles styling
// Styling language Documentation: https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling
// Building data asset openstreetmap
// to load with sandcastle interactive demo showcase
var terrainProvider = Cesium.createWorldTerrain(),alt=0;
var myheight=0,myheight2=0,askheight=1,timeheight=0;
function getterrain(lon,lat,lon2,lat2){
if (timer<timeheight+50){return 0;}
timeheight=timer;
askheight=0;
var positions = [
    Cesium.Cartographic.fromDegrees(lon, lat),
    Cesium.Cartographic.fromDegrees(lon2, lat2)
];
//var promise = Cesium.sampleTerrain(terrainProvider, 11, positions);
var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);
Cesium.when(promise, function(updatedPositions) {
    myheight=positions[0].height;
    myheight2=positions[1].height;
    askheight=1;
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
});
}
//try{if(localStorage){};}catch(e){localStorage=null;alert("localStorage is not supported");};
try{if(localStorage){};}catch(e){localStorage=null;};
var timestorage=0;
var prefix="myCesiumflight_";
if(document.location.href.indexOf("myCesiumflight1")>0){prefix="myCesiumflight1_";}
if(document.location.href.indexOf("myCesiumflight2")>0){prefix="myCesiumflight2_";}
if(document.location.href.indexOf("myCesiumflight3")>0){prefix="myCesiumflight3_";}
function removestorage(key){
if(localStorage){localStorage.removeItem(prefix+key);}
}
function loadstorage(key,namexx){
if(localStorage){var aux=localStorage.getItem(prefix+key);
	             if(aux){eval(namexx+"="+aux+";");}
}}
function loadstoragetext(key,namexx){
if(localStorage){var aux=localStorage.getItem(prefix+key);
	             if(aux){eval(namexx+"='"+formatname(aux)+"';");}
}}
function savestorage(key,xx){
    if(localStorage){
	   localStorage.setItem(prefix+key,xx);
}}
var viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider:  terrainProvider,//Cesium.createWorldTerrain(),
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true

});

viewer.scene.globe.depthTestAgainstTerrain = true;


var timekey=0;

var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    vk_shift : false,
    vk_m : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};

addcombo();
// HTML overlay for showing feature name
var nameOverlay = document.createElement("div");
viewer.container.appendChild(nameOverlay);
nameOverlay.className = "backdrop";
nameOverlay.style.display = "block";
nameOverlay.style.position = "absolute";
nameOverlay.style.bottom = "0";
nameOverlay.style.left = "0";
nameOverlay.style["pointer-events"] = "none";
nameOverlay.style.padding = "4px";
nameOverlay.style.backgroundColor = "black";

nameOverlay.textContent = "name";

var msgtext = document.createElement("div");
viewer.container.appendChild(msgtext);
msgtext.className = "backdrop";
msgtext.style.display = "block";
msgtext.style.position = "absolute";
msgtext.style.top = "50px";
msgtext.style.left = "5px";
msgtext.style["pointer-events"] = "none";
msgtext.style.padding = "4px";
msgtext.style.backgroundColor = "black";

msgtext.textContent = "";


var auxvar=-9999999,auxvar2=-9999999,auxvar3=-9999999,auxvar4=-9999999,auxvar5=-9999999;
function setauxvar(aux){
 var auxtext="";
 if(auxvar>-9999990){auxtext+=" aux="+String(auxvar);}  
 if(auxvar2>-9999990){auxtext+=" aux2="+String(auxvar2);}  
 if(auxvar3>-9999990){auxtext+=" aux3="+String(auxvar3);}  
 if(auxvar4>-9999990){auxtext+=" aux4="+String(auxvar4);}  
 if(auxvar5>-9999990){auxtext+=" aux5="+String(auxvar5);}  
nameOverlay.textContent="click here "+String(aux)+auxtext;}
setauxvar("ok");

function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
	case 0x25:
	    return 'lookleft';
	case 0x27:
	    return 'lookright';
	case 0x28:
        return 'lookdown';
	case 0x26:
	    return 'lookup';		
    case 0x20:
        return 'moveForward';
    case 0x10:
        return 'vk_shift';
    case 'N'.charCodeAt(0):
        return 'moveForward';
    case 'B'.charCodeAt(0):
        return 'moveBackward';
    case 'W'.charCodeAt(0):
        return 'moveForward';
    case 'S'.charCodeAt(0):
        return 'moveBackward';
    case 'Q'.charCodeAt(0):
        return 'moveUp';
    case 'E'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    case 'M'.charCodeAt(0):
        return 'vk_m';
    default:
        return undefined;
    }
}

document.addEventListener('keydown', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}, false);

document.addEventListener('keyup', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}, false);


// Set the initial camera view to look at Manhattan
var initialPosition = Cesium.Cartesian3.fromDegrees(
  -74.01881302800248,
  40.69114333714821,
  753
);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
  21.27879878293835,
  -21.34390550872461,
  0.0716951918898415
);
viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});

// Load the NYC buildings tileset.
//var tileset = new Cesium.Cesium3DTileset({
//  url: Cesium.IonResource.fromAssetId(75343),
//});
var tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(96188),
  })
);
viewer.scene.primitives.add(tileset);

// Color buildings based on their height.
function subcolor() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
       conditions: [
        //["('${height}'!==''?Number(${height}):0)>90", "rgb(99, 9, 8)"],
        ["Number(${height})>140", "rgb(99, 99, 8)"],
        ["Number(${height})>80", "rgb(9, 99, 98)"],
        ["${building}==='commercial'", "rgb(97, 99, 188)"],
        ["${building}==='public'", "rgb(190, 190, 188)"],
        ["true", "rgb(97, 189, 188)"],
      ],
    },
  });
}
subcolor();
function subheight(dh) {
  tileset.style = new Cesium.Cesium3DTileStyle({
    //show: "Number(${height}) > "+String(dh),
    show: "('${height}'!==''?Number(${height}):0)>"+String(dh),
    color: {
       conditions: [
        //["('${height}'!==''?Number(${height}):0)>90", "rgb(99, 9, 8)"],
        ["${building}==='commercial'", "rgb(97, 99, 188)"],
        ["${building}==='public'", "rgb(190, 190, 188)"],
        ["${building}==='hospital'", "rgb(190, 90, 88)"],
        ["Number(${height})>140", "rgb(99, 99, 8)"],
        ["Number(${height})>80", "rgb(9, 99, 98)"],
        ["true", "rgb(97, 189, 188)"],
      ],
    },

  });
}
subheight(9);
/*function colorByHeight() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${Height} >= 300", "rgba(45, 0, 75, 0.5)"],
        ["${Height} >= 200", "rgb(102, 71, 151)"],
        ["${Height} >= 100", "rgb(170, 162, 204)"],
        ["${Height} >= 50", "rgb(224, 226, 238)"],
        ["${Height} >= 25", "rgb(252, 230, 200)"],
        ["${Height} >= 10", "rgb(248, 176, 87)"],
        ["${Height} >= 5", "rgb(198, 106, 11)"],
        ["true", "rgb(127, 59, 8)"],
      ],
    },
  });
}

// Color buildings by their latitude coordinate.
function colorByLatitude() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      latitudeRadians: "radians(${Latitude})",
    },
    color: {
      conditions: [
        ["${latitudeRadians} >= 0.7125", "color('purple')"],
        ["${latitudeRadians} >= 0.712", "color('red')"],
        ["${latitudeRadians} >= 0.7115", "color('orange')"],
        ["${latitudeRadians} >= 0.711", "color('yellow')"],
        ["${latitudeRadians} >= 0.7105", "color('lime')"],
        ["${latitudeRadians} >= 0.710", "color('cyan')"],
        ["true", "color('blue')"],
      ],
    },
  });
}

// Color buildings by distance from a landmark.
function colorByDistance() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      distance:
        "distance(vec2(radians(${Longitude}), radians(${Latitude})), vec2(-1.291777521, 0.7105706624))",
    },
    color: {
      conditions: [
        ["${distance} > 0.0012", "color('gray')"],
        [
          "${distance} > 0.0008",
          "mix(color('yellow'), color('red'), (${distance} - 0.008) / 0.0004)",
        ],
        [
          "${distance} > 0.0004",
          "mix(color('green'), color('yellow'), (${distance} - 0.0004) / 0.0004)",
        ],
        ["${distance} < 0.00001", "color('white')"],
        [
          "true",
          "mix(color('blue'), color('green'), ${distance} / 0.0004)",
        ],
      ],
    },
  });
}

// Color buildings with a '3' in their BIN property.
function colorByStringRegex() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    color:
      "(regExp('3').test(String(${BIN}))) ? color('cyan', 0.9) : color('purple', 0.1)",
  });
}

// Show only buildings greater than 200 meters in height.
function hideByHeight() {
  tileset.style = new Cesium.Cesium3DTileStyle({
    show: "${Height} > 200",
  });
}

Sandcastle.addToolbarMenu([
  {
    text: "Color By Height",
    onselect: function () {
      colorByHeight();
    },
  },
  {
    text: "Color By Latitude",
    onselect: function () {
      colorByLatitude();
    },
  },
  {
    text: "Color By Distance",
    onselect: function () {
      colorByDistance();
    },
  },
  {
    text: "Color By Name Regex",
    onselect: function () {
      colorByStringRegex();
    },
  },
  {
    text: "Hide By Height",
    onselect: function () {
      hideByHeight();
    },
  },
]);

colorByHeight();
*/
var myentity;

function createModel(url, height) {
  viewer.entities.removeAll();

  var position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  var heading = Cesium.Math.toRadians(135);
  var pitch = 0;
  var roll = 0;
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  myentity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
//myentity=entity;  
//viewer.trackedEntity = entity;
}

     createModel(
        //"https://github.com/chungkn1400/myCesiumflight/blob/master/myCesiumflight/cesium/Apps/Sandcastle/myApps/models/Cesium_Air.glb",
        //"https://github.com/chungkn1400/myCesiumflight/blob/gh-pages/myCesiumflight/cesium/Apps/Sandcastle/myApps/models/Cesium_Air.glb",
        //"https://chungkn1400.github.io/myCesiumflight/myCesiumflight/cesium/Apps/Sandcastle/myApps/models/Cesium_Air.glb",
        "../SampleData/models/CesiumAir/Cesium_Air.glb",
        5000.0
      );


var camera = viewer.scene.camera;
var o1=0.0,o2=0.0,o3=0.0,x=0.0,y=0.0,z=0.0,trun=1,timer=0,timer0=0,dtimer=0,timer2=0;
var oo1=0,oo2=0,oo3=0,o30=0.0,hmin=9,altz=0,altz0=0;
var ellipsoid = viewer.scene.globe.ellipsoid;
var cameralatlon = ellipsoid.cartesianToCartographic(camera.position);
var timecamera=0,tmap=0,timemap=0;

function subrun(){
if (timer>timekey+500){
  timekey=timer;
  if(trun){trun=0;}else{trun=1;}
}}
var tmap=0,timemap=0,myz=0,myzsave=0;
function submap(){
if (timer>timekey+500){
  timekey=timer;
  if(tmap==1){
     tmap=0;
     timemap=timer+1000;oo3=1;
   }else{
     tmap=1;timemap=1;myzsave=myz;o3=0;o30=0;oo3=1;
   }
}}
function cameralookRight(do1){o1+=do1*2;oo1=1;}
function cameralookUp(do2){o2-=do2*1.3;oo2=1;}
function myloop(){
    var lookFactor = 0.35;
    if (flags.lookright) {
         cameralookRight(lookFactor);o30=30;}
    if (flags.lookleft) {
        cameralookRight(-lookFactor);o30=-30;}
    if (flags.lookup) {
         cameralookUp(lookFactor);}
    if (flags.lookdown) {
        cameralookUp(-lookFactor);}
    if (flags.vk_shift) {
         subrun();} 
    if (flags.vk_m) {
         submap();} 
    
    
    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
    cameralatlon = ellipsoid.cartesianToCartographic(camera.position);
    var cameraHeight = cameralatlon.height;
    var moveRate = 1.5 + (cameraHeight / 100.0)*3000.0/(3000.0+cameraHeight);
    altz=cameraHeight;
    if (tmap||(timer<timemap)){moveRate=0;}
    
    //if (trun) {
        camera.moveForward(moveRate);
    //}
    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
		camera.moveRight(moveRate*o3/35);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
		camera.moveLeft(moveRate*o3/35);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
o30+=(0.0-o30)*0.05;
o3+=(o30-o3)*0.05;
if (o3<-0.51 || o3>0.51){oo3=1;}
if (timer>(timecamera+300)){oo3=1;}
var z10=10;
if (Math.abs(myheight-myheight2)<0.15){z10=2;}
auxvar2=myheight-myheight2;
if (oo1||oo2||oo3) {
oo1=0;oo2=0;oo3=0;
timecamera=timer;  
if(o2>180){o2=0;o1+=180;o3+=180;}
if(o2<-180){o2=0;o1+=180;o3-=180;}
if(o1>360){o1-=360;}
if(o1<-360){o1+=360;}

alt=cameralatlon.height-myheight2;
if(alt<(z10+1)){
   oo3=1;	
   if (o2<0.01){o2=0.01;};}
auxvar=alt;
auxvar2=myheight-myheight2;

initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
  o1,o2*(1-tmap)-80*tmap,o3
); 
myz=Math.max(cameralatlon.height,(myheight+z10)+tmap*22000);
if(tmap==0){if(myz>20000){myz=myzsave;o2=0;}}
var position = Cesium.Cartesian3.fromDegrees(
  cameralatlon.longitude*180/Math.PI,
  cameralatlon.latitude*180/Math.PI,
  myz 
  //cameralatlon.height 
);
x=  cameralatlon.longitude*180/Math.PI;
y=  cameralatlon.latitude*180/Math.PI;
z=  myz; 

if ((tmap==1)||(timer<timemap)){
viewer.scene.camera.setView({
  destination: position, 
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
}else{
viewer.scene.camera.setView({
  //destination: position, 
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
}

}

if((altz<altz0-900) || (altz>altz0+900)){
   //initialPosition=camera.position;
   oo2=1;
   if(altz>altz0+8000){o2=-80;}
   altz0=altz;
}
var klon=Math.cos(o2*Math.PI/180);
var ooo1=90-o1;
var ooo2=o2;
var k60=70;
var kdx=(360/40000000)*k60;if(tmap){kdx*=0.22;}
if (trun==0){kdx=-kdx*100;}
var dx=kdx*Math.cos(ooo1*Math.PI/180);  
var dy=kdx*Math.sin(ooo1*Math.PI/180)/klon;
var dz=Math.sin(ooo2*Math.PI/180)*k60*0.7*(1-tmap);
var k03=0.07*Math.sin(ooo1*Math.PI/180);
if (dx<0){k03*=0.5*Math.cos(ooo1*Math.PI/180);}
var myposition = Cesium.Cartesian3.fromDegrees(
  cameralatlon.longitude*180/Math.PI+dx+dy*k03,
  cameralatlon.latitude*180/Math.PI+dy-dx*k03,
  Math.max(cameralatlon.height+dz,myheight+z10)-tmap*640 
);
if (cameralatlon.height+dz<myheight+z10+1){o3=0;o30=0;}
var myorientation = Cesium.HeadingPitchRoll.fromDegrees(
  -90+o1,o2*(1-tmap),o3*(1-tmap)
); 
var posrot= Cesium.Transforms.headingPitchRollQuaternion(myposition,myorientation);
myentity.position=myposition;
myentity.orientation=posrot;
if (askheight==1){getterrain(  cameralatlon.longitude*180/Math.PI+dx+dy*k03,
                               cameralatlon.latitude*180/Math.PI+dy-dx*k03,
                               cameralatlon.longitude*180/Math.PI,
                               cameralatlon.latitude*180/Math.PI);}
            
if (timer>timestorage+10000){
	timestorage=timer;
	savestorage("x",x);
	savestorage("y",y);
	savestorage("z",z);
	savestorage("o1",o1);
	savestorage("o2",o2);
	savestorage("o3",o3);
}
msgtext.textContent = mydir();

}

o1= 29.27879878293835;
o2=-14.34390550872461;
o3=0.0;
 x=-74.01881302800248;
 y=40.69114333714821;
 z=753;

loadstorage("x","x");
loadstorage("y","y");
loadstorage("z","z");
loadstorage("o1","o1");
loadstorage("o2","o2");
loadstorage("o3","o3");
myz=z;

initialPosition = Cesium.Cartesian3.fromDegrees(
  x,y,z
);
initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
  o1,o2,o3
);

viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
var pos=initialPosition;
cameralatlon = ellipsoid.cartesianToCartographic(pos);
var pos2 = Cesium.Cartesian3.fromDegrees(
  cameralatlon.longitude*180/Math.PI,
  cameralatlon.latitude*180/Math.PI,
  cameralatlon.height 
);

myentity.position=pos;
var hpr = new Cesium.HeadingPitchRoll(o1,o2,o3);
var posrot = new Cesium.ConstantProperty(Cesium.Transforms.headingPitchRollQuaternion(pos, hpr));
  
function addcombo(){
Sandcastle.addToolbarMenu([
  {text: "initial",onselect: function(){subcombo(0);},},
  {text: "deauville marina",onselect: function(){subcombo(1);},},
  {text: "deauville plage",onselect: function(){subcombo(2);},},
  {text: "trouville",onselect: function(){subcombo(3);},},
  {text: "nancy",onselect: function(){subcombo(4);},},
  {text: "crickvenica",onselect: function(){subcombo(5);},},
  {text: "paris tolbiac",onselect: function(){subcombo(6);},},
  {text: "paris defense",onselect: function(){subcombo(7);},},
  {text: "ivry lycee",onselect: function(){subcombo(8);},},
  {text: "orsay",onselect: function(){subcombo(9);},},
  {text: "le barcares",onselect: function(){subcombo(10);},},
  {text: "jerusalem",onselect: function(){subcombo(11);},},
  {text: "marseille",onselect: function(){subcombo(12);},},
  {text: "nice",onselect: function(){subcombo(13);},},
  {text: "arcachon",onselect: function(){subcombo(14);},},
  {text: "grenoble",onselect: function(){subcombo(15);},},
  {text: "san francisco",onselect: function(){subcombo(16);},},
  {text: "new york",onselect: function(){subcombo(17);},},
  {text: "atlanta",onselect: function(){subcombo(18);},},
  {text: "rio",onselect: function(){subcombo(19);},},
  {text: "hong kong",onselect: function(){subcombo(20);},},
  {text: "athenes",onselect: function(){subcombo(21);},},
  {text: "perth",onselect: function(){subcombo(22);},},
  {text: "le caire",onselect: function(){subcombo(23);},},
  {text: "washington",onselect: function(){subcombo(24);},},
  {text: "tajmahal",onselect: function(){subcombo(25);},},
]);
}

var tinitcombo=1;
function subcombo(i){
if(tinitcombo==1){tinitcombo=0;}else{
var combotext="";
var lng=-74.01881302800248;
var lat=40.69114333714821;
o1= 0;//29.27879878293835;
o2=-14.34390550872461;
o3=0.0;
//if (combotext==="initial"){lat=48.826125  ;lng=2.357055   ;o1=120;}
//if (combotext==="flyto"){lat=flytolat  ;lng=flytolng   ;o1=10;}
if (i===1 || combotext==="deauville marinas"){lat=49.36198047661674   ;lng=0.07262960190958628   ;o1=120;}
if (i===2 || combotext==="deauville plage"){lat=49.35600551121942   ;lng=0.06075459446313726   ;o1=110;}
if (i===3 || combotext==="trouville plage"){lat=49.36663106706898   ;lng=0.07818353983048315   ;o1=130;}
if (i===4 || combotext==="nancy"){lat=48.69306979368741   ;lng=6.182922715725031   ;o1=70;}
if (i===5 || combotext==="crickvenica"){lat=45.1734569955986   ;lng=14.689314428610118   ;o1=-110;}
if (i===6 || combotext==="paris tolbiac"){lat=48.826125291730506   ;lng=2.3570559500472212   ;o1=0;}
if (i===7 || combotext==="paris defense"){lat=48.891977155490395   ;lng=2.237673523003608   ;o1=160;}
if (i===8 || combotext==="ivry romain roland"){lat=48.80346335679542   ;lng=2.3934673532940915   ;o1=-50;}
if (i===9 || combotext==="orsay"){lat=48.706787   ;lng=2.180894999999964   ;o1=-30;}
if (i===10 || combotext==="le barcares"){lat=42.78764305091493   ;lng=3.0338932951133533   ;o1=175;} 
if (i===11 || combotext==="jerusalem"){lat=31.776636707589287   ;lng=35.2337121963501   ;o1=36.3920;}
if (i===12 || combotext==="marseille"){lat=43.2803905;lng=5.405139   ;o1=36.3920;}
if (i===13 || combotext==="nice"){lat=43.7031905;lng=7.252817  ;o1=36.3920;}
if (i===14 || combotext==="arcachon"){lat=44.6514284;lng=-1.171656  ;o1=36.3920;}
if (i===15 || combotext==="grenoble"){lat=45.1841656;lng=5.7155425 ;o1=36.3920;}
if (i===16 || combotext==="san francisco"){lat=37.7577;lng=-122.4376 ;o1=36.3920;}
if (i===17 || combotext==="new york"){lat=40.7033121;lng=-73.97968 ;o1=36.3920;}
if (i===18 || combotext==="atlanta"){lat=33.7677129;lng=-84.42060 ;o1=36.3920;}
if (i===19 || combotext==="rio"){lat=-22.8650853;lng=-43.13109 ;o1=36.3920;}
if (i===20 || combotext==="hong kong"){lat=22.3700556;lng=114.153758 ;o1=36.3920;}
if (i===21 || combotext==="athenes"){lat=37.9908372;lng=23.7383394 ;o1=36.3920;}
if (i===22 || combotext==="perth"){lat=-31.9546529;lng=115.852662 ;o1=36.3920;}
if (i===23 || combotext==="le caire"){lat=30.04441959;lng=31.23571160;o1=36.3920;}
if (i===24 || combotext==="washington"){lat=38.8850399;lng=-77.08054296;o1=36.3920;}
if (i===25 || combotext==="tajmahal"){lat=27.17015;lng=78.002155;o1=36.3920;}
//document.getElementById('combo').blur();
var x=lng,y=lat,z=753;
if(o1==0){o1= 29.27879878293835;}else{o1=-o1+90;}
initialPosition = Cesium.Cartesian3.fromDegrees(
  x,y,z
);
initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
  o1,o2,o3
);
viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
}
/*viewer.scene.camera.setView({
  //destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
viewer.scene.camera.setView({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});*/
//alert("ok");
subfocus();
}

function subfocus(){ 
viewer.canvas.focus();
nameOverlay.focus();
}

function mydir(){
  if(o1>180){o1-=360;}
  if(o1<-180){o1+=360;}
  if(o1>(90+45+22)){return " E ";}
  if(o1>(90+45-22)){return " N.E ";}
  if(o1>(90-22)){return " N ";}
  if(o1>(45-22)){return " W.N ";}
  if(o1>(-22)){return " W ";}
  if(o1>(-45-22)){return " S.W ";}
  if(o1>(-90-22)){return " S ";}
  if(o1>(-90-45-22)){return " E.S ";}
  return " E ";
}

viewer.clock.onTick.addEventListener(function(clock) {
myloop();
timer0=timer;
timer=(new Date().getTime());
//timer=viewer.clock.currentTime.secondsOfDay*1000;
dtimer+=((timer-timer0)-dtimer)*0.03;
if(dtimer>5000){dtimer=500;}
//setauxvar(mydir()+String(dtimer));
setauxvar(mydir()+" shift=>plane M=>map ");
if(timer>(timer2+1500)){
  timer2=timer; 
  subfocus();
  if((dtimer>400)&&(hmin<120)){hmin=hmin+10;subheight(hmin);}
  if((dtimer<200)&&(hmin>-1)){hmin=hmin-10;subheight(hmin);}
}  
});  

var button = document.createElement("input");
viewer.container.appendChild(button);
button.className = "button";
button.type = "button";
button.style.position = "absolute";
button.style.top = "80px";
button.style.left = "5px";
button.style.backgroundColor = "gray";
button.style.width = "80px";
button.value = "click";
button.addEventListener("click", subbutton);

var tshadow=false;
loadstorage("tshadow","tshadow");
viewer.shadows=tshadow;
if(tshadow){
   button.value = "shadows";
}else{  
   button.value = "noshadow";  
}	 
function subbutton(){//alert("button");
  subfocus();
  if(tshadow){
	tshadow=false;
    viewer.shadows=tshadow;
    button.value = "noshadow";  
  }else{  
	tshadow=true;
    viewer.shadows=tshadow;
    button.value = "shadows";  
  }	 
savestorage("tshadow",tshadow);
}
