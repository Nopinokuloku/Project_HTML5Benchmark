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
  .service('model',function(){
    return{
      insert:function(config){
          $.ajax({
              url:"php/model.php",
              type:'POST',
              data:({
                  code:'insert',
                  data : ({num: config.num,str: config.str})
              }),
              success:function(e){
                 console.log(e);
              },error:function(e){
                  console.log('Error : AJAX');
              }
          });
      },
      update:function(config){
         $.ajax({
              url:"php/model.php",
              type:'POST',
              data:({
                  code:'update',
                  data : ({id: config.id,num: config.num,str: config.str})
              }),
              success:function(e){
                 console.log(e);
              },error:function(e){
                  console.log('Error : AJAX');
              }
          });
       },
      delete:function(config){
         $.ajax({
            url:"php/model.php",
            type:'POST',
            data:({
                code:'delete',
                data : ({id: config.id})
            }),
            success:function(e){
               console.log(e);
            },error:function(e){
                console.log('Error : AJAX');
            }
        });
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
      }
    };
  })
;