'use strict';
/*Data*/
var picSet = {
    dimensions:[
        {id:'0',name:'Random'},
        {id:'1',name:'800x600'},
        {id:'2',name:'1024x768'},
        {id:'3',name:'1280x600'},
        {id:'4',name:'1920x1080'},
        {id:'5',name:'3840x2160'}
    ],
    formats:[
        {id:'0',name:'Random'},
        {id:'1',name:'JPG'},
        {id:'2',name:'PNG'},
        {id:'3',name:'GIF'},
        {id:'4',name:'ICO'},
        {id:'5',name:'SVG'}
    ]
};
var vidSet ={
    dimensions:[
        {id:'0',name:'Random'},
        {id:'1',name:'240p'},
        {id:'2',name:'480p'},
        {id:'3',name:'720p'}      
    ],
    formats:[
        {id:'0',name:'Random'},
        {id:'1',name:'flv'},
        {id:'2',name:'avi'},
        {id:'3',name:'mp4'} 
    ]
};

var aniSet = {
    animations:[
    {id:'0',name:'Bubble'},
    {id:'1',name:'3D'}
    ]
};


/* Controllers */
angular.module('myApp.controllers', ['ui.map', 'ui.event'])
    .controller('HomeController',['$scope', function($scope){
        $scope.HomeOptions=[
        {title:'Pictures',url:'#/picSet'},
        {title:'Videos',url:'#/vid'},
        {title:'Database',url:'#/db'},
        {title:'GPS',url:'#/gps'},
        {title:'Animation',url:'#/animSet'}];
    }])
    .controller('PicSetController',['$scope', '$location', 'picSetService' , function($scope, $location, picSetService){
        //Initializing
        $scope.title="Pictures Setting";
        $scope.dimensions = [];
        $scope.formats = [];
        $scope.dimensions = picSet.dimensions;
        $scope.formats = picSet.formats;
        $scope.selectDim=$scope.dimensions[0].id;
        $scope.selectForm=$scope.formats[0].id;

        //Listener
        /*
         * @brief onClick Run, checking the form in order to charge gallery view
         */
        $scope.run = function(){
            var nbGen = parseInt($('#inNbGen').val());
            var dimID = $('#selectDim').val();
            var formatID = $('#selectForm').val();
            //Check that every input is correctly filled
            if(isNaN(nbGen)){
                alert("Please fill all fields.");
            }else{
                picSetService.setNbElement(nbGen);
                picSetService.setDimension(picSet.dimensions[dimID].name);
                picSetService.setFormat(picSet.formats[formatID].name);
                $location.path('gal');
            }
        }
        }])
    .controller('GalController',['$scope', '$location', 'picSelectService' ,'picSetService', function($scope, $location, picSelectService, picSetService){
        //Initializing
        $scope.title = "Gallery";
        $scope.gallery = [];
        var nbElements = picSetService.getNbElement();
        var dimension = picSetService.getDimension();
        var format = picSetService.getFormat();

        //Setting gallery
        if(format=='ICO'||format=='GIF'||format=='SVG'){
            setGallery(nbElements,{dim:format,format:format});
        }else{
            if(dimension=="Random"){
                if(format=="Random"){
                    setGallery(nbElements,{dim:dimension,format:format,rand:2});
                }else{
                    setGallery(nbElements,{dim:dimension,format:format,rand:0});
                }
            }else if(format=='Random'){
                setGallery(nbElements,{dim:dimension,format:format,rand:1});
            }else{
                setGallery(nbElements,{dim:dimension,format:format});
            }
        }

        //Listeners
        /*
         * @brief load the picture clicked
         */
        $scope.loadPicture=function(id){
            picSelectService.setPicture($scope.gallery[id].name);
            $location.path('pic');
        }

        /*
         * @param opt={dim,format,rand}
         * @param Rand
         *  0 : dimension Random
         *  1 : format Random
         *  2 : full Random
         *  default : no Random
         */
        function setGallery(count,opt){
            switch(opt.rand){
                case 0:
                    for(var i=0;i<count;i++){
                        opt.dim = picSet.dimensions[Math.floor((Math.random()*(picSet.dimensions.length-1))+1)].name;
                        $scope.gallery.push({url:'img/pictures/'+opt.dim+'.'+opt.format,name:opt.dim+'.'+opt.format});
                    }
                break;
                case 1:
                    for(var i=0;i<count;i++){
                        do{
                            opt.format = picSet.formats[Math.floor((Math.random()*(picSet.formats.length-1))+1)].name;
                        }while(opt.format=='GIF'||opt.format=='ICO'||opt.format=='SVG');
                        $scope.gallery.push({url:'img/pictures/'+opt.dim+'.'+opt.format,name:opt.dim+'.'+opt.format});
                    }
                break;
                case 2:
                    for(var i=0;i<count;i++){
                        opt.dim = picSet.dimensions[Math.floor((Math.random()*(picSet.dimensions.length-1))+1)].name;
                        opt.format = picSet.formats[Math.floor((Math.random()*(picSet.formats.length-1))+1)].name;
                        if(opt.format=='ICO'||opt.format=='GIF'||opt.format=='SVG'){
                            $scope.gallery.push({url:'img/pictures/'+opt.format+'.'+opt.format,name:opt.format+'.'+opt.format});
                        }else{
                            $scope.gallery.push({url:'img/pictures/'+opt.dim+'.'+opt.format,name:opt.dim+'.'+opt.format});
                        }
                    }
                break;
                default:
                    for(var i=0;i<count;i++){
                        $scope.gallery.push({url:'img/pictures/'+opt.dim+'.'+opt.format,name:opt.dim+'.'+opt.format});
                    }
                break;
            }
        }
        }])
    .controller('PicController',['$scope', 'picSelectService', function($scope, picSelectService){
        //Initializing
        $scope.title="Picture";
        var url ='img/pictures/'+picSelectService.getPicture();

        var gesturableImg = new ImgTouchCanvas({
            canvas: document.getElementById('picCanvas'),
            path: url,
            desktop: true
        });
        }])
    .controller('VidController',['$scope', function($scope){
        $scope.title="Video";
        $scope.dimensions=[];
        $scope.formats=[];

        $scope.dimensions = vidSet.dimensions;
        $scope.formats = vidSet.formats;

        $scope.selectForm=$scope.formats[0].id;

        /*var video = document.getElementById('video');
        video.addEventListener('click',function(){
          video.play();
        },false);*/
        
        //listener
        /*
         * @brief loading the video according to the format selected
         */
        $scope.loadVideo=function(){
            var id=$('#selectForm').val();
            switch(id){
                case 1:
                case 2:
                case 3:
                    $('videoSrc').attr('src',"img/videos/movie."+$scope.formats[id].name);
                    $('videoSrc').attr('type',"video/"+$scope.formats[id].name);
                break;
                default:
                    $('.videoSrc').attr('src',"img/videos/movie."+$scope.formats[1].name);
                    $('.videoSrc').attr('type',"video/"+$scope.formats[1].name);
                break;
            }
        };
        }])
    .controller('DBController',function($scope, model){
        $scope.title="Database";
        $scope.step = 0;
        
        $scope.page=1;
        //$scope.dataToDisplay=[];
        refreshPage();    
        
        function refreshPage(){
            $scope.page=1;
            model.getAll(function(obj){
                $scope.pageMax = Math.ceil(obj.length/10);
                if(obj.length>0){
                    $("#btnSelect").removeAttr('disabled');
                    $("#btnUpdate").removeAttr('disabled');
                    $("#btnDelete").removeAttr('disabled');
                    $("#btnPrevious").attr('disabled','disabled');
                    $("#btnNext").removeAttr('disabled');
                }else{
                    $("#btnSelect").attr('disabled','disabled');
                    $("#btnUpdate").attr('disabled','disabled');
                    $("#btnDelete").attr('disabled','disabled');
                }
                loadData();
            });
        }

        /*
         * @brief display the progress bar properly
         * @param config = {progress, loop, state, mode}
         */
        function proceed(config){
            $('.currentProgress').css('width',config.progress*100/config.loop+"%");
            if(parseInt($('.currentProgress').css('width').split('px')[0])+2>parseInt($('.progressBar').css('width').split('px')[0])){
                if(config.mode){
                    $scope.step++;
                    if($scope.step==4){
                        $('#task').html('Done !');
                        $('#btnDone').removeAttr('disabled');
                    }else{
                        $('#task').html(config.state);
                        $('#btnDone').attr('disabled','disabled');
                    }
                }else{
                    $('#task').html('Done !');
                    $('#btnDone').removeAttr('disabled');
                }
            }else{
                $('#task').html(config.state);
                $('#btnDone').attr('disabled','disabled');
            }
        }

        /*
         * @brief Acting on the database
         * - Displaying the result at the end
         */
        function loop(code,config){
            var progressBar = 0;
            var i=0;
            $('#progress').css('display','block');
            $('.currentProgress').css('width',"0%");
            switch(code){
                case 'insert':
                    var state = 'Adding Data...';
                    $('#task').html(state);
                    for(i=0;i<config.loop;i++){
                        model.insert({num:randomGen('num'),str:randomGen('str')},function(e){
                            if(e){
                                progressBar++;
                                proceed({progress:progressBar,loop:config.loop,state:state,mode:config.mode});
                            }
                        });
                    }

                break;
                case 'update':
                    var state = 'Updating Data...';
                    $('#task').html(state);
                    for(var i=0; i<config.loop; i++){
                        model.update({id:config.obj[i]['id_dataset'],num:randomGen('num'),str:randomGen('str')},function(e){
                            if(e){
                                progressBar++;
                                proceed({progress:progressBar,loop:config.loop,state:state,mode:config.mode});
                            }
                        });
                    }
                break;
                case 'select':
                    var state = 'Getting Data...';
                    $('#task').html(state);
                    for(var i=0; i<config.loop; i++){
                        model.getDataById({id:config.obj[i]['id_dataset']},function(e){
                            if(e){
                                progressBar++;
                                proceed({progress:progressBar,loop:config.loop,state:state,mode:config.mode});
                            }
                        });
                    }
                break;
                case 'delete':
                    var state = 'Deleting Data...';
                    $('#task').html(state);
                    for(var i=0; i<config.loop; i++){
                        model.delete({id:config.obj[i]['id_dataset']},function(e){
                            if(e){
                                progressBar++;
                                proceed({progress:progressBar,loop:config.loop,state:state,mode:config.mode});
                            }
                        });
                    }
                break;
            }
        }
        
        //Listeners
        function loadData(){
            model.getDataLimited({from:$scope.page},function(obj){
                if(obj){
                    $scope.dataToDisplay = obj;
                    console.log($scope.dataToDisplay);
                    if($scope.page>=$scope.pageMax){
                        $("#btnPrevious").removeAttr('disabled');;
                        $("#btnNext").attr('disabled','disabled');
                    }else if($scope.page <= 1){
                        $("#btnPrevious").attr('disabled','disabled');
                        $("#btnNext").removeAttr('disabled');
                    }else{
                        $("#btnPrevious").removeAttr('disabled');
                        $("#btnNext").removeAttr('disabled');
                    }
                }
            });
        }

        $scope.pagination=function(action){
            switch(action){
                case 'next':
                    $scope.page++;
                    loadData();
                break;
                case 'previous':
                    $scope.page--;
                    loadData();
                break;
            }
        }

        /*
         * mode : optional 0:default; 1:run
         */
        $scope.insert=function(mode){
            var nbRequest = parseInt($('#inNbReq').val());
            if(isNaN(nbRequest)){
                alert('Please fill the fields');
            }else{
                loop('insert',{loop:nbRequest,mode:mode});
            }
        }

        $scope.select=function(mode){
            var nbRequest = parseInt($('#inNbReq').val());
            if(isNaN(nbRequest)){
                alert('Please fill the fields');
            }else{
                model.getAll(function(obj){
                    if(obj.length<nbRequest && !mode){
                        if(confirm("Warning : There is only "+obj.length+" elements to treat in the database.\n Continue ?")){
                           loop('select',{loop:obj.length,obj:obj});
                        }
                    }else{
                        if(mode){
                            setTimeout(function(){
                                if(obj.length<nbRequest || $scope.step!=1){
                                    $scope.select(1);
                                }else{
                                    loop('select',{loop:nbRequest,obj:obj,mode:mode});
                                }
                            },500);
                        }else{
                            loop('select',{loop:nbRequest,obj:obj});
                        }
                    }
                });
            }
        }

        $scope.update=function(mode){
            var nbRequest = parseInt($('#inNbReq').val());
            if(isNaN(nbRequest)){
                alert('Please fill the fields');
            }else{
                model.getAll(function(obj){
                    if(obj.length<nbRequest && !mode){
                        if(confirm("Warning : There is only "+obj.length+" elements to treat in the database.\n Continue ?")){
                           loop('update',{loop:obj.length,obj:obj});
                        }
                    }else{
                        if(mode){
                            setTimeout(function(){
                                if($scope.step!=2){
                                    $scope.update(1);
                                }else{
                                    loop('update',{loop:nbRequest,obj:obj,mode:mode});
                                }
                            },500);
                        }else{
                            loop('update',{loop:nbRequest,obj:obj});
                        }
                    }
                });
            }
        }

        $scope.delete=function(mode){
            var nbRequest = parseInt($('#inNbReq').val());
            if(isNaN(nbRequest)){
                alert('Please fill the fields');
            }else{
                model.getAll(function(obj){
                    if(obj.length<nbRequest && !mode){
                        if(confirm("Warning : There is only "+obj.length+" elements to treat in the database.\n Continue ?")){
                           loop('delete',{loop:obj.length,obj:obj});
                        }
                    }else{
                        if(mode){
                            setTimeout(function(){
                                if($scope.step!=3){
                                    $scope.delete(1);
                                }else{
                                    loop('delete',{loop:nbRequest,obj:obj,mode:mode});
                                }
                            },500);
                        }else{
                            loop('delete',{loop:nbRequest,obj:obj});
                        }
                    }
                });
            }
        }

        $scope.run = function(){
            $scope.step = 0;
            var nbRequest = parseInt($('#inNbReq').val());
            if(isNaN(nbRequest)){
                alert('Please fill the fields');
            }else{
                $scope.insert(1);
                $scope.select(1);
                $scope.update(1);
                $scope.delete(1);
            }
        }

        $scope.done=function(){
            $('#progress').css('display','none');
            refreshPage();
        }
    })
    .controller('GPSController',['$scope', function($scope){
        $scope.title="Geolocation";
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          error('Geolocation is not supported by this browser.');
        }

        function success(position){
            var s = document.querySelector('#status');
            s.innerHTML = "found you!";
            var mapcanvas = document.createElement('div');
            mapcanvas.id = 'mapGmap';

            document.querySelector('article').appendChild(mapcanvas);

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
            };
            var gMap = new google.maps.Map(document.getElementById("mapGmap"), myOptions);

            var marker = new google.maps.Marker({
              position: latlng, 
              map: gMap, 
              title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
            });

            var lMap = L.map('mapLeaflet').setView([position.coords.latitude, position.coords.longitude], 13);
            L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(lMap);
        }

        function error(msg) {
          var s = document.querySelector('#status');
          s.innerHTML = typeof msg == 'string' ? msg : "failed";
        }

        }])
    .controller('AnimSetController',['$scope', '$location', 'animSetService', function($scope, $location, animSetService){
        $scope.title="Animation Setting";
        $scope.animations = aniSet.animations;
        $scope.selectAnim = $scope.animations[0].id;

        /*
         * Listeners
         */
        $scope.run = function(){
            var animID = $('#selectAnim').val();
            animSetService.setAnimation($scope.animations[animID].name);
            if($scope.animations[animID].name=='Bubble'){
                var nbElements = parseInt($('#selectNbElements').val());
                var size = parseInt($('#selectSize').val());
                var opacity = $('#selectOpacity').val();
                if(isNaN(nbElements) || isNaN(size) || isNaN(opacity)){
                    alert("Please fill all fields.");
                }else{
                    animSetService.setNbElement(nbElements);
                    animSetService.setSize(size);
                    animSetService.setOpacity(opacity);
                }
            }
            $location.path('anim');
        }

        }])
    .controller('AnimController',['$scope', 'animSetService', function($scope, animSetService){
        $scope.title="Animation";
        $scope.animation=animSetService.getAnimation();
        
        switch($scope.animation){
            case '3D':
                $scope.faces=[
                    {style:'transform: translateZ(150px); background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'},
                    {style:'transform: translateZ(-150px); background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'},
                    {style:'transform:translateX(150px) rotateY(90deg);background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'},
                    {style:'transform:translateX(-150px) rotateY(-90deg);background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'},
                    {style:'transform:translateY(150px) rotateX(90deg);background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'},
                    {style:'transform:translateY(-150px) rotateX(-90deg);background-color:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')'}
                ];
            break;
            case 'Bubble':
                bubble({dom:'screen',nb:animSetService.getNbElement(),size:animSetService.getSize(), opacity:animSetService.getOpacity()});
            break;
        }
    }]);