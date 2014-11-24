'use strict';
/*Data*/
        //bdd offre = (id,titre,description,logo,date_ajout,date_fin,positionX,positionY,promo,unite)
        //offre_cat
        //cat = alimentaire, beaute, bijoux, mode, hightech, sport, livre, deco, jeux
var data = [{
        id : '0',
        titre : 'Maintenant tous au jogging',
        description : 'Offre Flash : -15% sur tout le magasin.',
        logo : 'img/logos/entr2.png',
        background : 'img/logos/bg_big.png',
        date_ajout : '2014-01-02',
        time : '00003006',
        time_h : '30:06',
        timer: 'img/icons/temps_restant_green_maxi.png',
        color : 'red',
        cat : ['Sport','Beauté & bien-être'],
        position : '200m',
        distance : 200,
        promo : '-15',
        unite : '%',
        star : false
    },
    {
        id : '1',
        titre : 'Mangez pas cher',
        description : 'A partir de 10 visites supérieur à 10€, 20% sont offerts sur la 11 ème visite.',
        logo : 'img/logos/entr3.png',
        background : 'img/logos/bg_big3.png',
        date_ajout : '2014-01-01',
        time: '00030500',
        time_h : '3j05h',
        timer: 'img/icons/temps_restant_green_mini.png',
        cat: ['Alimentaire'],
        position : '3.4km',
        distance : 3400,
        promo : '-20',
        unite : '%',
        star : false
    },
    {
        id : '2',
        titre : 'Promotion : Bouquet',
        description : 'Offre flash le Samedi entre 17h-18h -10% sur tout le magasin.',
        logo : 'img/logos/entr4.png',
        background : 'img/logos/bg_big5.png',
        date_ajout : '2014-01-04',
        time: '00020500',
        time_h : '2j05h',
        timer: 'img/icons/temps_restant_green_mini.png',
        cat: ['Meuble & déco'],
        position : '250m',
        distance : 250,
        promo : '-10',
        unite : '%',
        star : false
    },
    {
        id : '3',
        titre : 'Mangez moi vite!',
        description : 'Offre de bienvenue -10% pour la première visite sans conditions sur le montant de l’achat. ',
        logo : 'img/logos/entr5.png',
        background : 'img/logos/bg_big1.png',
        date_ajout : '2014-01-05',
        time: '00080500',
        time_h : '8j05h',
        timer: 'img/icons/temps_restant_green_mini.png',
        cat: ['Alimentaire'],
        position : '300m',
        distance : 300,
        promo : '-10',
        unite : '%',
        star : false
    },
    {
        id : '4',
        titre : 'Toujours moins cher',
        description : 'Spéciale entrée scolaire promotion de -20% sur tout le magasin',
        logo : 'img/logos/entr6.png',
        background : 'img/logos/bg_big2.png',
        date_ajout : '2014-01-06',
        time: '00020000',
        time_h : '2j00h',
        timer: 'img/icons/temps_restant_green_mini.png',
        cat: ['Hifi, photo, vidéo'],
        position : '150m',
        distance : 150,
        promo : '-20',
        unite : '%',
        star : false
    },
    {
        id : '5',
        titre : 'Promotion : CoiffMe',
        description : 'A la 4ième visite une réduction de 5 € sur tout le magasin.',
        logo : 'img/logos/entr1.png',
        background : 'img/logos/bg_big4.png',
        date_ajout : '2014-01-03',
        time: '00070000',
        time_h : '7j00h',
        timer: 'img/icons/temps_restant_green_mini.png',
        cat: ['Mode','Beauté & bien-être'],
        position : '1.5km',
        distance : 1500,
        promo : '5',
        unite : '€',
        star : false
    },
];

var filtreAfficher =[
    {state:'w',title:'Alimentaire'},
    {state:'w',title:'Beauté & bien-être'},
    {state:'w',title:'Bijoux & montres'},
    {state:'w',title:'Mode'},
    {state:'w',title:'Hifi, photo, vidéo'},
    {state:'w',title:'Sport'},
    {state:'w',title:'Livres, musiques'},
    {state:'w',title:'Meuble & déco'},
    {state:'w',title:'Jeux & jouets'}
];

var filtreTrier=[
    {state:'b',title:'Expiration'},
    {state:'w',title:'Les plus proches'},
    {state:'w',title:'Derniers ajoutés'}
];
/********************************************************************/

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
        {id:'4',name:'ICO'}
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


/* Controllers */
angular.module('myApp.controllers', ['ui.map', 'ui.event'])
    .controller('HomeController',['$scope', function($scope){
        $scope.HomeOptions=[
        {title:'Pictures',url:'#/picSet'},
        {title:'Videos',url:'#/vid'},
        {title:'Database',url:'#/db'},
        {title:'GPS',url:'#/gps'},
        {title:'Animation',url:'#/anim'}];
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
        if(format=='ICO'||format=='GIF'){
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
                        }while(opt.format=='GIF'||opt.format=='ICO');
                        $scope.gallery.push({url:'img/pictures/'+opt.dim+'.'+opt.format,name:opt.dim+'.'+opt.format});
                    }
                break;
                case 2:
                    for(var i=0;i<count;i++){
                        opt.dim = picSet.dimensions[Math.floor((Math.random()*(picSet.dimensions.length-1))+1)].name;
                        opt.format = picSet.formats[Math.floor((Math.random()*(picSet.formats.length-1))+1)].name;
                        if(opt.format=='ICO'||opt.format=='GIF'){
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
            desktop: false
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
        $scope.run = function(){
            var nbRequest = $('#inNbReq').val();
            var nbSteps = 4;
            var time = 500;
            var progressBar = 0;
            var i;
            $('#progress').css('display','block');
            $('#btnDone').attr('disabled','disabled');
            
            //Adding data
            i=0;
            while(i<nbRequest){
                $.when(model.insert({num:randomGen('num'),str:randomGen('str')})).done(
                    function(){
                        setTimeout(function(){
                            $('#task').html('Adding Data...');
                            progressBar++;
                            $('.currentProgress').css('width',progressBar*100/(nbSteps*nbRequest)+"%");
                        },progressBar*time);
                        i++;
                    });
            }
                
            model.getAll(function(data){
                //Getting data
                i=0;
                while(i<nbRequest){
                    $.when(model.getDataById({id:data[i]['id_dataset']},
                        function(e){
                            //console.log(e);
                        })).done(
                    function(){
                        setTimeout(function(){
                            $('#task').html('Getting Data...');
                            progressBar++;
                            $('.currentProgress').css('width',progressBar*100/(nbSteps*nbRequest)+"%");
                        },progressBar*time);
                        i++;
                    });
                }

                //Updating data
                i=0;
                while(i<nbRequest){
                    $.when(model.update({id:data[i]['id_dataset'],num:randomGen('num'),str:randomGen('str')})).done(
                        function(){
                            setTimeout(function(){
                                $('#task').html('Updating Data...');
                                progressBar++;
                                $('.currentProgress').css('width',progressBar*100/(nbSteps*nbRequest)+"%");
                            },progressBar*time);
                            i++;
                        });
                }
                
                //Deleting data
                i=0;
                while(i<nbRequest){
                    $.when(model.delete({id:data[i]['id_dataset']})).done(
                        function(){
                            setTimeout(function(){
                                $('#task').html('Deleting Data...');
                                progressBar++;
                                $('.currentProgress').css('width',progressBar*100/(nbSteps*nbRequest)+"%");
                            },progressBar*time);
                            i++;
                        });
                }
                setTimeout(function(){
                    $('#task').html('Done !');
                    $('#btnDone').removeAttr('disabled');
                },progressBar*time);
            });            
        }

        $scope.done=function(){
            $('#progress').css('display','none');
        }
    })
    .controller('GPSController',['$scope', function($scope){
        $scope.title="Geolocation";
        }])
    .controller('AnimController',['$scope', function($scope){
        $scope.title="Animation";
        }]);