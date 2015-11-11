var app=angular.module('diageoApp',['ngRoute','ui.bootstrap',]);angular.module('diageoApp').config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){$routeProvider.when('/home/',{templateUrl:'index.html',controller:'Index'})
$locationProvider.html5Mode({enabled:true,requireBase:false});}]);var diageo=angular.module('diageoApp');diageo.controller('Index',['$scope',function($scope){console.log('sir');}]);angular.module("ngMap",[]),function(){"use strict";function camelCase(e){return e.replace(SPECIAL_CHARS_REGEXP,function(e,t,n,o){return o?n.toUpperCase():n}).replace(MOZ_HACK_REGEXP,"Moz$1")}function JSONize(e){try{return JSON.parse(e),e}catch(t){return e.replace(/([\$\w]+)\s*:/g,function(e,t){return'"'+t+'":'}).replace(/'([^']+)'/g,function(e,t){return'"'+t+'"'})}}var SPECIAL_CHARS_REGEXP=/([\:\-\_]+(.))/g,MOZ_HACK_REGEXP=/^moz([A-Z])/,Attr2Options=function($parse,$timeout,$log,NavigatorGeolocation,GeoCoder){var orgAttributes=function(e){e.length>0&&(e=e[0]);for(var t={},n=0;n<e.attributes.length;n++){var o=e.attributes[n];t[o.name]=o.value}return t},toOptionValue=function(input,options){var output,key=options.key,scope=options.scope;try{var num=Number(input);if(isNaN(num))throw"Not a number";output=num}catch(err){try{if(input.match(/^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/)&&(input="["+input+"]"),output=JSON.parse(JSONize(input)),output instanceof Array){var t1stEl=output[0];if(t1stEl.constructor==Object);else if(t1stEl.constructor==Array)output=output.map(function(e){return new google.maps.LatLng(e[0],e[1])});else if(!isNaN(parseFloat(t1stEl))&&isFinite(t1stEl))return new google.maps.LatLng(output[0],output[1])}else output===Object(output)&&(output=getOptions(output,options))}catch(err2){if(input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+input;output=eval(exp)}catch(e){output=input}else if(input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/))try{var matches=input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);output=google.maps[matches[1]][matches[2]]}catch(e){output=input}else if(input.match(/^[A-Z]+$/))try{var capitalizedKey=key.charAt(0).toUpperCase()+key.slice(1);key.match(/temperatureUnit|windSpeedUnit|labelColor/)?(capitalizedKey=capitalizedKey.replace(/s$/,""),output=google.maps.weather[capitalizedKey][input]):output=google.maps[capitalizedKey][input]}catch(e){output=input}else if(input.match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/))try{output=new Date(input)}catch(e){output=input}else output=input}}if("bounds"==options.key&&output instanceof Array&&(output=new google.maps.LatLngBounds(output[0],output[1])),"icons"==options.key&&output instanceof Array)for(var i=0;i<output.length;i++){var el=output[i];el.icon.path.match(/^[A-Z_]+$/)&&(el.icon.path=google.maps.SymbolPath[el.icon.path])}if("icon"==options.key&&output instanceof Object){(""+output.path).match(/^[A-Z_]+$/)&&(output.path=google.maps.SymbolPath[output.path]);for(var key in output){var arr=output[key];"anchor"==key||"origin"==key?output[key]=new google.maps.Point(arr[0],arr[1]):("size"==key||"scaledSize"==key)&&(output[key]=new google.maps.Size(arr[0],arr[1]))}}return output},getAttrsToObserve=function(e){var t=[];e["ng-repeat"]||e.ngRepeat;for(var n in e){var o=e[n];o&&o.match(/\{\{.*\}\}/)&&t.push(camelCase(n))}return t},filter=function(e){var t={};for(var n in e)n.match(/^\$/)||n.match(/^ng[A-Z]/)||(t[n]=e[n]);return t},getOptions=function(e,t){var n={};for(var o in e)if(e[o]){if(o.match(/^on[A-Z]/))continue;if(o.match(/ControlOptions$/))continue;n[o]="string"!=typeof e[o]?e[o]:toOptionValue(e[o],{scope:t,key:o})}return n},getEvents=function(e,t){var n={},o=function(e){return"_"+e.toLowerCase()},i=function(t){var n=t.match(/([^\(]+)\(([^\)]*)\)/),o=n[1],i=n[2].replace(/event[ ,]*/,""),r=$parse("["+i+"]");return function(t){function n(e,t){return e[t]}var i=r(e),a=o.split(".").reduce(n,e);a&&a.apply(this,[t].concat(i)),$timeout(function(){e.$apply()})}};for(var r in t)if(t[r]){if(!r.match(/^on[A-Z]/))continue;var a=r.replace(/^on/,"");a=a.charAt(0).toLowerCase()+a.slice(1),a=a.replace(/([A-Z])/g,o);var s=t[r];n[a]=new i(s)}return n},getControlOptions=function(e){var t={};if("object"!=typeof e)return!1;for(var n in e)if(e[n]){if(!n.match(/(.*)ControlOptions$/))continue;var o=e[n],i=o.replace(/'/g,'"');i=i.replace(/([^"]+)|("[^"]+")/g,function(e,t,n){return t?t.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):n});try{var r=JSON.parse(i);for(var a in r)if(r[a]){var s=r[a];if("string"==typeof s?s=s.toUpperCase():"mapTypeIds"===a&&(s=s.map(function(e){return e.match(/^[A-Z]+$/)?google.maps.MapTypeId[e.toUpperCase()]:e})),"style"===a){var c=n.charAt(0).toUpperCase()+n.slice(1),u=c.replace(/Options$/,"")+"Style";r[a]=google.maps[u][s]}else r[a]="position"===a?google.maps.ControlPosition[s]:s}t[n]=r}catch(l){}}return t};return{camelCase:camelCase,filter:filter,getOptions:getOptions,getEvents:getEvents,getControlOptions:getControlOptions,toOptionValue:toOptionValue,getAttrsToObserve:getAttrsToObserve,orgAttributes:orgAttributes}};Attr2Options.$inject=["$parse","$timeout","$log","NavigatorGeolocation","GeoCoder"],angular.module("ngMap").service("Attr2Options",Attr2Options)}(),function(){"use strict";var e=function(e){return{geocode:function(t){var n=e.defer(),o=new google.maps.Geocoder;return o.geocode(t,function(e,t){t==google.maps.GeocoderStatus.OK?n.resolve(e):n.reject("Geocoder failed due to: "+t)}),n.promise}}};e.$inject=["$q"],angular.module("ngMap").service("GeoCoder",e)}(),function(){"use strict";var e=function(e){return{getCurrentPosition:function(t){var n=e.defer();return navigator.geolocation?(void 0===t?t={timeout:5e3}:void 0===t.timeout&&(t.timeout=5e3),navigator.geolocation.getCurrentPosition(function(e){n.resolve(e)},function(e){n.reject(e)},t)):n.reject("Browser Geolocation service failed."),n.promise},watchPosition:function(){return"TODO"},clearWatch:function(){return"TODO"}}};e.$inject=["$q"],angular.module("ngMap").service("NavigatorGeolocation",e)}(),function(){"use strict";var e=function(e){var t=function(t,n){n=n||t.getCenter();var o=e.defer(),i=new google.maps.StreetViewService;return i.getPanoramaByLocation(n||t.getCenter,100,function(e,t){t===google.maps.StreetViewStatus.OK?o.resolve(e.location.pano):o.resolve(!1)}),o.promise},n=function(e,t){var n=new google.maps.StreetViewPanorama(e.getDiv(),{enableCloseButton:!0});n.setPano(t)};return{getPanorama:t,setPanorama:n}};e.$inject=["$q"],angular.module("ngMap").service("StreetView",e)}(),function(){"use strict";angular.module("ngMap").directive("bicyclingLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.BicyclingLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("bicyclingLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("bicyclingLayers",l)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("cloudLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.weather.CloudLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("cloudLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("cloudLayers",l)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("customControl",["Attr2Options","$compile",function(e,t){var n=e;return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=(n.orgAttributes(o),n.filter(i)),s=n.getOptions(a,e),c=n.getEvents(e,a),u=o[0].parentElement.removeChild(o[0]);t(u.innerHTML.trim())(e);for(var l in c)google.maps.event.addDomListener(u,l,c[l]);r.addObject("customControls",u),e.$on("mapInitialized",function(e,t){var n=s.position;t.controls[google.maps.ControlPosition[n]].push(u)})}}}])}(),function(){"use strict";var e,t,n=function(e){e=e||{},this.el=document.createElement("div"),this.el.style.display="inline-block",this.visible=!0;for(var t in e)this[t]=e[t]},o=function(){n.prototype=new google.maps.OverlayView,n.prototype.setContent=function(e){this.el.innerHTML=this.content=e,this.el.style.position="absolute"},n.prototype.setPosition=function(e){if(e&&(this.position=e),this.getProjection()&&"function"==typeof this.position.lng){var t=this.getProjection().fromLatLngToDivPixel(this.position),n=Math.round(t.x-this.el.offsetWidth/2),o=Math.round(t.y-this.el.offsetHeight-10);this.el.style.left=n+"px",this.el.style.top=o+"px"}},n.prototype.setZIndex=function(e){e&&(this.zIndex=e),this.el.style.zIndex=this.zIndex},n.prototype.setVisible=function(e){this.el.style.display=e?"inline-block":"none",this.visible=e},n.prototype.addClass=function(e){var t=this.el.className.trim().split(" ");-1==t.indexOf(e)&&t.push(e),this.el.className=t.join(" ")},n.prototype.removeClass=function(e){var t=this.el.className.split(" "),n=t.indexOf(e);n>-1&&t.splice(n,1),this.el.className=t.join(" ")},n.prototype.onAdd=function(){this.getPanes().overlayMouseTarget.appendChild(this.el)},n.prototype.draw=function(){this.setPosition(),this.setZIndex(this.zIndex),this.setVisible(this.visible)},n.prototype.onRemove=function(){this.el.parentNode.removeChild(this.el),this.el=null}},i=function(i,r){return e=i,t=r,o(),{restrict:"E",require:"^map",link:function(o,i,r,a){var s=(e.orgAttributes(i),e.filter(r)),c=e.getOptions(s,o),u=e.getEvents(o,s),l=i[0].parentElement.removeChild(i[0]),p=new n(c);t(function(){p.setContent(l.innerHTML);var e=l.firstElementChild.className;p.addClass("custom-marker"),p.addClass(e),c.position instanceof google.maps.LatLng||a.getGeoLocation(c.position).then(function(e){p.setPosition(e)})});for(var g in u)google.maps.event.addDomListener(p.el,g,u[g]);a.addObject("customMarkers",p),i.bind("$destroy",function(){a.deleteObject("customMarkers",p)})}}};i.$inject=["Attr2Options","$timeout"],angular.module("ngMap").directive("customMarker",i)}(),function(){"use strict";var e=function(e,t){e.panel&&(e.panel=document.getElementById(e.panel)||document.querySelector(e.panel));var n=new google.maps.DirectionsRenderer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n},t=function(t,n,o){var i=t,r=new google.maps.DirectionsService,a=function(e,t){var i=t;i.travelMode=i.travelMode||"DRIVING";var a=["origin","destination","travelMode","transitOptions","unitSystem","durationInTraffic","waypoints","optimizeWaypoints","provideRouteAlternatives","avoidHighways","avoidTolls","region"];for(var s in i)-1===a.indexOf(s)&&delete i[s];i.waypoints&&("[]"==i.waypoints||""==i.waypoints)&&delete i.waypoints;var c=function(t){r.route(t,function(t,o){o==google.maps.DirectionsStatus.OK&&n(function(){e.setDirections(t)})})};i.origin&&i.destination&&("current-location"==i.origin?o.getCurrentPosition().then(function(e){i.origin=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),c(i)}):"current-location"==i.destination?o.getCurrentPosition().then(function(e){i.destination=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),c(i)}):c(i))},s=function(t,o,r,s){var c=i.orgAttributes(o),u=i.filter(r),l=i.getOptions(u),p=i.getEvents(t,u),g=i.getAttrsToObserve(c),d=e(l,p);s.addObject("directionsRenderers",d),g.forEach(function(e){!function(e){r.$observe(e,function(t){if("panel"==e)n(function(){var e=document.getElementById(t)||document.querySelector(t);e&&d.setPanel(e)});else if(l[e]!==t){var o=i.toOptionValue(t,{key:e});l[e]=o,a(d,l)}})}(e)}),t.$on("mapInitialized",function(){a(d,l)}),t.$on("$destroy",function(){s.deleteObject("directionsRenderers",d)})};return{restrict:"E",require:"^map",link:s}};t.$inject=["Attr2Options","$timeout","NavigatorGeolocation"],angular.module("ngMap").directive("directions",t)}(),function(){"use strict";angular.module("ngMap").directive("drawingManager",["Attr2Options",function(e){var t=e;return{restrict:"E",require:"^map",link:function(e,n,o,i){var r=(t.orgAttributes(n),t.filter(o)),a=t.getOptions(r),s=t.getControlOptions(r),c=t.getEvents(e,r),u=new google.maps.drawing.DrawingManager({drawingMode:a.drawingmode,drawingControl:a.drawingcontrol,drawingControlOptions:s.drawingControlOptions,circleOptions:a.circleoptions,markerOptions:a.markeroptions,polygonOptions:a.polygonoptions,polylineOptions:a.polylineoptions,rectangleOptions:a.rectangleoptions}),c=t.getEvents(e,r);for(var l in c)google.maps.event.addListener(u,l,c[l]);i.addObject("mapDrawingManager",u)}}}])}(),function(){"use strict";angular.module("ngMap").directive("dynamicMapsEngineLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.visualization.DynamicMapsEngineLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.filter(i),s=t.getOptions(a),c=t.getEvents(e,a,c),u=n(s,c);r.addObject("mapsEngineLayers",u)}}}])}(),function(){"use strict";angular.module("ngMap").directive("fusionTablesLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.FusionTablesLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.filter(i),s=t.getOptions(a),c=t.getEvents(e,a,c),u=n(s,c);r.addObject("fusionTablesLayers",u)}}}])}(),function(){"use strict";angular.module("ngMap").directive("heatmapLayer",["Attr2Options","$window",function(e,t){var n=e;return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=n.filter(i),s=n.getOptions(a);if(s.data=t[i.data]||e[i.data],!(s.data instanceof Array))throw"invalid heatmap data";s.data=new google.maps.MVCArray(s.data);{var c=new google.maps.visualization.HeatmapLayer(s);n.getEvents(e,a)}r.addObject("heatmapLayers",c)}}}])}(),function(){"use strict";var e=function(e,t,n,o){var i=e,r=function(e,o,i){var r;!e.position||e.position instanceof google.maps.LatLng||delete e.position,r=new google.maps.InfoWindow(e),Object.keys(o).length>0;for(var a in o)a&&google.maps.event.addListener(r,a,o[a]);var s=i.html().trim();if(1!=angular.element(s).length)throw"info-window working as a template must have a container";return r.__template=s.replace(/\s?ng-non-bindable[='"]+/,""),r.__compile=function(e,n){n&&(e["this"]=n);var o=t(r.__template)(e);r.setContent(o[0]),e.$apply()},r.__open=function(e,t,o){n(function(){r.__compile(t,o),o&&o.getPosition?r.open(e,o):o&&o instanceof google.maps.LatLng?(r.open(e),r.setPosition(o)):r.open(e)})},r},a=function(e,t,n,a){t.css("display","none");var s,c=i.orgAttributes(t),u=i.filter(n),l=i.getOptions(u,e),p=i.getEvents(e,u);!l.position||l.position instanceof google.maps.LatLng||(s=l.position);var g=r(l,p,t);s&&a.getGeoLocation(s).then(function(t){g.setPosition(t),g.__open(a.map,e,t);var i=n.geoCallback;i&&o(i)(e)}),a.addObject("infoWindows",g),a.observeAttrSetObj(c,n,g),e.$on("mapInitialized",function(t,n){if(g.visible&&g.__open(n,e),g.visibleOnMarker){var o=g.visibleOnMarker;g.__open(n,e,n.markers[o])}}),e.showInfoWindow=function(t,n,o){var i=a.map.infoWindows[n],r=o?o:this.getPosition?this:null;i.__open(a.map,e,r),a.singleInfoWindow&&(a.lastInfoWindow&&e.hideInfoWindow(t,a.lastInfoWindow),a.lastInfoWindow=n)},e.hideInfoWindow=e.hideInfoWindow||function(e,t){var n=a.map.infoWindows[t];n.close()}};return{restrict:"E",require:"^map",link:a}};e.$inject=["Attr2Options","$compile","$timeout","$parse"],angular.module("ngMap").directive("infoWindow",e)}(),function(){"use strict";angular.module("ngMap").directive("kmlLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.KmlLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("kmlLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("kmlLayers",l)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("mapData",["Attr2Options",function(e){var t=e;return{restrict:"E",require:"^map",link:function(e,n,o){var i=t.filter(o),r=t.getOptions(i),a=t.getEvents(e,i,a);e.$on("mapInitialized",function(t,n){for(var o in r)if(o){var i=r[o];"function"==typeof e[i]?n.data[o](e[i]):n.data[o](i)}for(var s in a)a[s]&&n.data.addListener(s,a[s])})}}}])}(),function(){"use strict";var e,t,n,o,i=function(n,i,r){var a=r.mapLazyLoadParams||r.mapLazyLoad;if(window.lazyLoadCallback=function(){e(function(){i.html(o),t(i.contents())(n)},100)},void 0===window.google||void 0===window.google.maps){var s=document.createElement("script");s.src=a+(a.indexOf("?")>-1?"&":"?")+"callback=lazyLoadCallback",document.body.appendChild(s)}else i.html(o),t(i.contents())(n)},r=function(e,t){return!t.mapLazyLoad&&void 0,o=e.html(),n=t.mapLazyLoad,document.querySelector('script[src="'+n+(n.indexOf("?")>-1?"&":"?")+'callback=lazyLoadCallback"]')?!1:(e.html(""),{pre:i})},a=function(n,o){return t=n,e=o,{compile:r}};a.$inject=["$compile","$timeout"],angular.module("ngMap").directive("mapLazyLoad",a)}(),function(){"use strict";angular.module("ngMap").directive("mapType",["Attr2Options","$window",function(e,t){return{restrict:"E",require:"^map",link:function(e,n,o,i){var r,a=o.name;if(!a)throw"invalid map-type name";if(o.object){var s=e[o.object]?e:t;r=s[o.object],"function"==typeof r&&(r=new r)}if(!r)throw"invalid map-type object";e.$on("mapInitialized",function(e,t){t.mapTypes.set(a,r)}),i.addObject("mapTypes",r)}}}])}(),function(){"use strict";function e(e,t){var n;return e.currentStyle?n=e.currentStyle[t]:window.getComputedStyle&&(n=document.defaultView.getComputedStyle(e,null).getPropertyValue(t)),n}var t=function(t,n,o){var i=t,r=function(t,r,a,s){var c=i.orgAttributes(r);t.google=google;var u=document.createElement("div");u.style.width="100%",u.style.height="100%",r.prepend(u),"false"!==a.defaultStyle&&("block"!=e(r[0],"display")&&r.css("display","block"),e(r[0],"height").match(/^(0|auto)/)&&r.css("height","300px")),r[0].addEventListener("dragstart",function(e){return e.preventDefault(),!1});var l=function(e,i){var r=new google.maps.Map(u,{});r.markers={},r.shapes={},n(function(){google.maps.event.trigger(r,"resize")}),e.zoom=e.zoom||15;var l=e.center;l?l instanceof google.maps.LatLng||(delete e.center,s.getGeoLocation(l,g.geoLocationOptions).then(function(e){r.setCenter(e);var n=a.geoCallback;n&&o(n)(t)},function(){r.setCenter(g.geoFallbackCenter)})):e.center=new google.maps.LatLng(0,0),r.setOptions(e),s.singleInfoWindow=e.singleInfoWindow;for(var p in i)p&&google.maps.event.addListener(r,p,i[p]);s.observeAttrSetObj(c,a,r),s.map=r,s.addObjects(s._objects),t.map=r,t.map.scope=t,google.maps.event.addListenerOnce(r,"idle",function(){t.$emit("mapInitialized",r),a.zoomToIncludeMarkers&&(s.zoomToIncludeMarkers(),"auto"==a.zoomToIncludeMarkers&&t.$on("objectChanged",function(e,t){"markers"==t[0]&&s.zoomToIncludeMarkers()}))})},p=i.filter(a),g=i.getOptions(p,t),d=i.getControlOptions(p),f=angular.extend(g,d),m=i.getEvents(t,p);a.initEvent?t.$on(a.initEvent,function(){!s.map&&l(f,m)}):l(f,m)};return{restrict:"AE",controller:"MapController",link:r}};angular.module("ngMap").directive("map",["Attr2Options","$timeout","$parse",t])}(),function(){"use strict";var e=function(e,t,n,o,i){var r=i,a=this,s=function(e,t,n){e.$observe(t,function(e){if(e){var o=r.camelCase("set-"+t),i=r.toOptionValue(e,{key:t});n[o]&&(t.match(/center|position/)&&"string"==typeof i?a.getGeoLocation(i).then(function(e){n[o](e)}):n[o](i))}})};this.map=null,this._objects=[],this.addObject=function(t,n){if(this.map){this.map[t]=this.map[t]||{};var o=Object.keys(this.map[t]).length;this.map[t][n.id||o]=n,"infoWindows"!=t&&n.setMap&&n.setMap&&n.setMap(this.map),n.centered&&n.position&&this.map.setCenter(n.position),e.$emit("objectChanged",[t,this.map[t]])}else n.groupName=t,this._objects.push(n)},this.deleteObject=function(t,n){if(n.map){var o=n.map[t];for(var i in o)o[i]===n&&delete o[i];n.map&&n.setMap&&n.setMap(null),e.$emit("objectChanged",[t,this.map[t]])}},this.addObjects=function(e){for(var t=0;t<e.length;t++){var n=e[t];n instanceof google.maps.Marker?this.addObject("markers",n):n instanceof google.maps.Circle||n instanceof google.maps.Polygon||n instanceof google.maps.Polyline||n instanceof google.maps.Rectangle||n instanceof google.maps.GroundOverlay?this.addObject("shapes",n):this.addObject(n.groupName,n)}},this.getGeoLocation=function(e,i){var r=t.defer();return!e||e.match(/^current/i)?n.getCurrentPosition(i).then(function(e){var t=e.coords.latitude,n=e.coords.longitude,o=new google.maps.LatLng(t,n);r.resolve(o)},function(e){r.reject(e)}):o.geocode({address:e}).then(function(e){r.resolve(e[0].geometry.location)},function(e){r.reject(e)}),r.promise},this.observeAttrSetObj=function(e,t,n){var o=r.getAttrsToObserve(e);Object.keys(o).length;for(var i=0;i<o.length;i++)s(t,o[i],n)},this.zoomToIncludeMarkers=function(){var e=new google.maps.LatLngBounds;for(var t in this.map.markers)e.extend(this.map.markers[t].getPosition());this.map.fitBounds(e)}};e.$inject=["$scope","$q","NavigatorGeolocation","GeoCoder","Attr2Options"],angular.module("ngMap").controller("MapController",e)}(),function(){"use strict";angular.module("ngMap").directive("mapsEngineLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.visualization.MapsEngineLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.filter(i),s=t.getOptions(a),c=t.getEvents(e,a,c),u=n(s,c);r.addObject("mapsEngineLayers",u)}}}])}(),function(){"use strict";var e=function(e,t){var n;e.position instanceof google.maps.LatLng||(e.position=new google.maps.LatLng(0,0)),n=new google.maps.Marker(e),Object.keys(t).length>0;for(var o in t)o&&google.maps.event.addListener(n,o,t[o]);return n},t=function(t,n){var o=t,i=function(t,i,r,a){var s,c=o.orgAttributes(i),u=o.filter(r),l=o.getOptions(u,t),p=o.getEvents(t,u);l.position instanceof google.maps.LatLng||(s=l.position);var g=e(l,p);a.addObject("markers",g),s&&a.getGeoLocation(s).then(function(e){g.setPosition(e),l.centered&&g.map.setCenter(e);var o=r.geoCallback;o&&n(o)(t)}),a.observeAttrSetObj(c,r,g),i.bind("$destroy",function(){a.deleteObject("markers",g)})};return{restrict:"E",require:"^map",link:i}};t.$inject=["Attr2Options","$parse"],angular.module("ngMap").directive("marker",t)}(),function(){"use strict";angular.module("ngMap").directive("overlayMapType",["Attr2Options","$window",function(e,t){return{restrict:"E",require:"^map",link:function(e,n,o,i){var r,a=o.initMethod||"insertAt";if(o.object){var s=e[o.object]?e:t;r=s[o.object],"function"==typeof r&&(r=new r)}if(!r)throw"invalid map-type object";e.$on("mapInitialized",function(e,t){if("insertAt"==a){var n=parseInt(o.index,10);t.overlayMapTypes.insertAt(n,r)}else"push"==a&&t.overlayMapTypes.push(r)}),i.addObject("overlayMapTypes",r)}}}])}(),function(){"use strict";var e=function(e,t){var n=e,o=function(e,o,i,r){if("false"===i.placesAutoComplete)return!1;var a=n.filter(i),s=n.getOptions(a),c=n.getEvents(e,a),u=new google.maps.places.Autocomplete(o[0],s);for(var l in c)google.maps.event.addListener(u,l,c[l]);var p=function(){t(function(){r&&r.$setViewValue(o.val())},100)};google.maps.event.addListener(u,"place_changed",p),o[0].addEventListener("change",p),i.$observe("types",function(e){if(e){var t=n.toOptionValue(e,{key:"types"});u.setTypes(t)}})};return{restrict:"A",require:"?ngModel",link:o}};e.$inject=["Attr2Options","$timeout"],angular.module("ngMap").directive("placesAutoComplete",e)}(),function(){"use strict";var e=function(e,t){var n,o=e.name;switch(delete e.name,o){case"circle":e.center instanceof google.maps.LatLng||(e.center=new google.maps.LatLng(0,0)),n=new google.maps.Circle(e);break;case"polygon":n=new google.maps.Polygon(e);break;case"polyline":n=new google.maps.Polyline(e);break;case"rectangle":n=new google.maps.Rectangle(e);break;case"groundOverlay":case"image":var i=e.url,r={opacity:e.opacity,clickable:e.clickable,id:e.id};n=new google.maps.GroundOverlay(i,e.bounds,r)}for(var a in t)t[a]&&google.maps.event.addListener(n,a,t[a]);return n},t=function(t,n){var o=t,i=function(t,i,r,a){var s,c,u=o.orgAttributes(i),l=o.filter(r),p=o.getOptions(l),g=o.getEvents(t,l);c=p.name,p.center instanceof google.maps.LatLng||(s=p.center);var d=e(p,g);a.addObject("shapes",d),s&&"circle"==c&&a.getGeoLocation(s).then(function(e){d.setCenter(e),d.centered&&d.map.setCenter(e);var o=r.geoCallback;o&&n(o)(t)}),a.observeAttrSetObj(u,r,d),i.bind("$destroy",function(){a.deleteObject("shapes",d)})};return{restrict:"E",require:"^map",link:i}};t.$inject=["Attr2Options","$parse"],angular.module("ngMap").directive("shape",t)}(),function(){"use strict";var e=function(e){var t=e,n=function(e,t,n){var o,i;t.container&&(i=document.getElementById(t.container),i=i||document.querySelector(t.container)),i?o=new google.maps.StreetViewPanorama(i,t):(o=e.getStreetView(),o.setOptions(t));for(var r in n)r&&google.maps.event.addListener(o,r,n[r]);return o},o=function(e,o,i){var r=(t.orgAttributes(o),t.filter(i)),a=t.getOptions(r),s=t.getControlOptions(r),c=angular.extend(a,s),u=t.getEvents(e,r);e.$on("mapInitialized",function(e,t){var o=n(t,c,u);t.setStreetView(o),!o.getPosition()&&o.setPosition(t.getCenter()),google.maps.event.addListener(o,"position_changed",function(){o.getPosition()!==t.getCenter()&&t.setCenter(o.getPosition())});var i=google.maps.event.addListener(t,"center_changed",function(){o.setPosition(t.getCenter()),google.maps.event.removeListener(i)})})};return{restrict:"E",require:"^map",link:o}};e.$inject=["Attr2Options"],angular.module("ngMap").directive("streetViewPanorama",e)}(),function(){"use strict";angular.module("ngMap").directive("trafficLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.TrafficLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("trafficLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("trafficLayers",l)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("transitLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.TransitLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("transitLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("transitLayers",l)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("weatherLayer",["Attr2Options",function(e){var t=e,n=function(e,t){var n=new google.maps.weather.WeatherLayer(e);for(var o in t)google.maps.event.addListener(n,o,t[o]);return n};return{restrict:"E",require:"^map",link:function(e,o,i,r){var a=t.orgAttributes(o),s=t.filter(i),c=t.getOptions(s),u=t.getEvents(e,s),l=n(c,u);r.addObject("weatherLayers",l),r.observeAttrSetObj(a,i,l),o.bind("$destroy",function(){r.deleteObject("weatherLayers",l)})}}}])}();