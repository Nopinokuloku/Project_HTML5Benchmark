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
  /*.service('model',['$http', function($http){
    var url = "data/dataset.csv";
    var dataSet= $http.get(url).then(function(response){
       return CSVToArray(response.data,',');
    });

    var index = getAttributes();
    function getAttributes(){
      var item={i_idDataset:'',i_number:'',i_string:''};
      return dataSet.then(function(data){
        for(var i=0;i<data[0].length;i++){
          switch(data[0][i]){
            case 'id_dataset':
              item.i_idDataset = i;
            break;
            case 'number':
              item.i_number = i;
            break;
            case 'string':
              item.i_string = i;
            break;
          }
        }
        return item;
      });
    }



    return{
      test:function(){
        return index;
      },
      getByID:function(callback){},
      getNumber:function(callback){},
      getString:function(callback){},
      addData:function(config,callback){
        var csvData =[];
        csvData.push();
        csvData.push(config.number);
        csvData.push(config.string);
        var fso = new ActiveXObject('Scripting.FileSystemObject');
        var oStream = fso.OpenTextFile(url, 8, true, 0);
        oStream.WriteLine(csvData.join(','));
        oStream.Close();
      },
      delData:function(callback){},
    };
  }])*/;