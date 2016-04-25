myCesiumflight a program by NGUYEN.Chung freeware(2016)

standalone version (nothing to install) : myCesiumflight_chung.html 

webgl must be enabled

to develop :

download cesium (cesium.js) from here => http://cesiumjs.org/downloads.html  and unzip the file in D:/cesium/

download node (node.js) from here => https://nodejs.org/en/  and install it (default options are ok)

copy then /cesium/ folder of mycesiumflight/cesium/ unzipped folder from mycesiumflight.zip download 
into the D:/cesium/ folder

in it you can find  node_install.cmd
                    cesium_exe.cmd
                    Apps/Sandcastle/myApps/ (my files)


run node_install.cmd to install nodes server files in D:/cesium/  => creates D:/cesium/node_modules/ folder

then run cesium_exe.cmd any time you want to launch a cesium.js local:8080 server for your testings (you can let it on)

launch myApps/_myCesiumflight.html  (it contains some firts lines to link auto as local:8080 html apps when in local mode) 

and it should run !