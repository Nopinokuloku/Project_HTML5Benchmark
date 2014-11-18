function getMap(){
	    /*
         * Mapping
         * WARNING : DEMO MODEL
         */
        coord=new google.maps.LatLng(48.867, 2.333);

        mapOptions = {
            //center: new google.maps.LatLng($scope.lat, $scope.lng),
            center: coord,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var mapId = document.getElementById("map-canvas");
        //mapId.style.height=window.innerHeight+'px';
        //body height
        mapId.style.height= '568px';
        var map = new google.maps.Map(mapId,mapOptions);

        var myIcon = {
            url :'img/icons/my_position2.png',
            size: new google.maps.Size(54, 66),
        };

        var myPosition = new google.maps.Marker({
            position: coord,
            map: map,
            title:"You are here!",
            icon: myIcon,
        });

        var contentTest = "<div class='icon' id='p3'>\
            <div>Usup</div></div>";
        var markers = [];
        for(var i=0; i<10; i++){
            lat=48.866472+i/1000;
            lon=2.334215+i/1000;
            markers.push(
                new MarkerWithLabel({
                    position: new google.maps.LatLng(lat,lon),
                    map: map,
                    labelContent: contentTest,
                    /*labelClass:"labels",*/
                    labelStyle: {opacity: 1},
                    icon: {}
                })
            );
        }

        var mcOptions = {gridSize: 25, maxZoom: 15, styles: [{url: 'img/icons/starActive.png', textColor: 'black', height:35, width:35}]};
        var mc = new MarkerClusterer(map,markers, mcOptions);
        /*Update*/
        var item = "<div class='icon' ng-id='icon{{index}}'>\
                        <div id='icon_title{{index}}'>{{title}}</div>\
                    </div>";

        //called when zoom + geolocation of items are too close
        //get items too close
        //items.length = nbElement clustered
        var groupe = "<div class='label' id='gp{{index}}'>\
                            <div id='gpNb{{index}}'>{{nbElement}}</div>\
                            <img id='flech{{index}} src='img/icons/close.png' onClick=\"showElement('{{index}}')\"/>\
                        </div>";
            //showElement(index, items)
            //labelclass parent overflow : hidden
        /*End-Update*/


        /*'img/icons/my_position.png'*/
/*<img src='img/icons/close.png'/>*/
        var content = "<div class='labels' id='p1'>\
					        <div id='groupElem1' value='3'>3</div>\
					        <img id='flech1' src='img/icons/close.png' onClick=\"showElement('1')\"/>\
				        </div>";
        var p1 = new MarkerWithLabel({
            position: new google.maps.LatLng(48.866472,2.334215),
            map: map,
            labelContent: content,
            /*labelClass:"labels",*/
            labelStyle: {opacity: 0.75},
            icon: {}
        });

        //google.maps.event.addListener(p1, 'click', animateShow('p1'));

        var content2 = "<div id='p2'>\
            <div id='p2item1' class='icon'>Fleur</div>\
            <div id='p2item2' class='icon'>H&M</div>\
            <div id='p2item3' class='icon'>C&A</div>\
            <img src='img/icons/open.png'/></div>";
        var p2 = new MarkerWithLabel({
            position: new google.maps.LatLng(48.864332,2.330166),
            map: map,
            labelContent: content2,
            labelClass:"labels2",
            labelStyle: {opacity: 0.75},
            icon: {}
        });

        var content3 = "<div id='p3'>Apple</div>";
        var p3 = new MarkerWithLabel({
            position: new google.maps.LatLng(48.872272,2.333127),
            map: map,
            labelContent: content3,
            labelClass:"icon",
            labelStyle: {opacity: 0.75},
            icon: {}
        });

        var content4 = "<div class='icon' id='p3'>\
            <div>Usup</div></div>";
        var p4 = new MarkerWithLabel({
            position: new google.maps.LatLng(48.868307,2.330140),
            map: map,
            labelContent: content4,
            /*labelClass:"icon",*/
            labelStyle: {opacity: 0.75},
            icon: {}
        });
}


/*
 * @brief Animation des marqueurs sur Google Maps
 */
function showElement(key){
	var init=40;
	var value = document.getElementById('groupElem'+key).getAttribute('value');
	var marker = document.getElementById('p'+key);
	var height = parseInt(window.getComputedStyle(marker).getPropertyValue('height'));

    //var limit = init*items.length + 20;
	if(height > init){
		//close
		animateClose(marker,height, init);
	}else{
		//open
		animateOpen(marker,height,120);
        //animateOpen(marker,height,limit);
	}	
	/*40px*nbElem*/
//	marker.style.height = 120+'px';
}


/*function initialize() {
	var mapOptions = {
	  	center: new google.maps.LatLng(-34.397, 150.644),
	  	zoom: 8,
	  	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapId = document.getElementById("map-canvas");
	mapId.style.height=window.innerHeight+'px';
	var map = new google.maps.Map(mapId,mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);*/