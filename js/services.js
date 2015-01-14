'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .service('picSetService',function(){
  	var nbElement = 0;
    var dimension ="";
    var format = "";
  	return{
  		getNbElement: function(){
  			return nbElement;
  		},
      getDimension: function(){
        return dimension;
      },
      getFormat: function(){
        return format;
      },
  		setNbElement: function(nb){
  			nbElement = nb;
  		},
      setDimension: function(dim){
        dimension = dim;
      },
      setFormat: function(f){
        format = f;
      }
  	};
  })
  .service('picSelectService',function(){
    var picture ="";
    return{
      getPicture: function(){
        return picture;
      },
      setPicture: function(pic){
        picture=pic;
      }
    };
  })
  .service('animSetService',function(){
    var animation ="";
    return {
      getAnimation: function(){
        return animation;
      },
      setAnimation: function(anim){
        animation=anim;
      }
    };
  })
  .service('model',function(){
    return{
      insert:function(config,callback){
          $.ajax({
              url:"php/model.php",
              type:'POST',
              data:({
                  code:'insert',
                  data : ({num: config.num,str: config.str})
              }),
              success:function(e){
                 console.log(e);
                 return true;
              },error:function(e){
                  console.log('Error : AJAX');
                  return false;
              }
          }).then(function(resp){callback(resp);});
      },
      update:function(config,callback){
         $.ajax({
              url:"php/model.php",
              type:'POST',
              data:({
                  code:'update',
                  data : ({id: config.id,num: config.num,str: config.str})
              }),
              success:function(e){
                 console.log(e);
                 return true;
              },error:function(e){
                  console.log('Error : AJAX');
                  return false;
              }
          }).then(function(resp){callback(resp);});
       },
      delete:function(config,callback){
         $.ajax({
            url:"php/model.php",
            type:'POST',
            data:({
                code:'delete',
                data : ({id: config.id})
            }),
            success:function(e){
               console.log(e);
               return true;
            },error:function(e){
                console.log('Error : AJAX');
                return false;
            }
        }).then(function(resp){callback(resp);});
      },
      getAll:function(callback){
        var JSONObject;
        $.ajax({
            url:"php/model.php",
            type:'POST',
            data:({code:'getAllData'}),
            success:function(e){
                JSONObject = JSON.parse(e);
                console.log("Select request done successfully");
            },error:function(e){
              console.log('Error : AJAX');
            }
        }).then(function(){callback(JSONObject);});
        //return JSONObject;
      },
      getDataById:function(config,callback){
        var JSONObject;
        $.ajax({
            url:"php/model.php",
            type:'POST',
            data:({
                code:'getDataByID',
                data : ({id: config.id})
            }),
            success:function(e){
              JSONObject = JSON.parse(e);
              console.log("Select request done successfully");
            },error:function(e){
                console.log('Error : AJAX');
            }
        }).then(function(){callback(JSONObject);});
        //return JSONObject;
      },
      getDataLimited:function(config,callback){
        var JSONObject;
        $.ajax({
            url:"php/model.php",
            type:'POST',
            data:({
                code:'getDataLimited',
                data : ({from:config.from,size:10})
            }),
            success:function(e){
              JSONObject = JSON.parse(e);
              console.log("Select request done successfully");
            },error:function(e){
                console.log('Error : AJAX');
            }
        }).then(function(){callback(JSONObject);});
      }
    };
  })
;