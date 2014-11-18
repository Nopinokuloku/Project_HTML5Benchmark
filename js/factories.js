angular.module('myApp.factories',[])
	.factory('model', ['$http', function($http){
	  var url   = "data/dataset.csv";
	  return $http.get(url).then(function(response){
	  	var data = CSVToArray(response.data,',');
	  	var index = getIndex(data);
	  	var idMax = function(){
	  		var max = 0;
	  		for(var i=1; i<data.length; i++){
	  			var current = data[i][index.idDataset];
	  			if(current > max){
	  				max = current;
	  			}
	  		}
	  		return max;
	  	};
	     return {
	     	getDataByID:function(id,callback){
	     		for(var i=1; i<data.length; i++){
	     			if( data[i][index.idDataset] == id){
	     				return new DataTemplate(data[i][index.idDataset],data[i][index.number],data[i][index.string]);
	     			}
	     		}
	     	},
			getDataByNumber:function(num,callback){
				var items=[];
				for(var i=1; i<data.length; i++){
	     			if( data[i][index.number] == num){
	     				 items.push(new DataTemplate(data[i][index.idDataset],data[i][index.number],data[i][index.string]));
	     			}
	     		}
	     		return items;
			},
			getDataByString:function(str,callback){
				var items=[];
				for(var i=1; i<data.length; i++){
	     			if( data[i][index.string] == str){
	     				 items.push(new DataTemplate(data[i][index.idDataset],data[i][index.number],data[i][index.string]));
	     			}
	     		}
	     		return items;
			},
			addData:function(config,callback){
				var csvData =[];
				if(config){
					csvData.push(idMax()+1);
					csvData.push(config.number);
					csvData.push(config.string);
					var fso = new ActiveXObject('Scripting.FileSystemObject');
					var oStream = fso.OpenTextFile(url, 8, false, 0);
					oStream.WriteLine(csvData.join(','));
					oStream.Close();
				}
				
				console.log(idMax());
			},
			updateData:function(config,callback){
				var fso = new ActiveXObject('Scripting.FileSystemObject');
				var oStream = fso.OpenTextFile(url, 2, true, 0);
				for(var i=0; i<config.data.length;i++){
					oStream.WriteLine(data[i].join(','));
				}
				oStream.Close();
			},
			delData:function(callback){
				
			}
	     };
	  });
	}]);

	function getIndex(data){
		var item=new DataTemplate();
	    for(var i=0;i<data[0].length;i++){
			switch(data[0][i]){
				case 'id_dataset':
				  item.idDataset = i;
				break;
				case 'number':
				  item.number = i;
				break;
				case 'string':
				  item.string = i;
				break;
			}
		}
	    return item;
	}

	function DataTemplate(id,num,str){
		this.id_dataset = (id||'');
		this.number = (num||'');
		this.string = (str||'');
	}