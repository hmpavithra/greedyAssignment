(function(){
"use strict";
angular.module('myApp.data',[])
	   .service('dataservice',dataservice);

	   dataservice.$inject = ['$http','$q'];

function dataservice($http,$q){
 function get(address) {
                var q = $q.defer();                            
                $http.get(address).then(function (response) {
                    q.resolve(response.data);                 
                }, function (error) {
                    
                    q.reject('Unable to process your request. Please try again later.');
                });
                return q.promise;           
        }

        function post(address, data) {       	
                var q = $q.defer();           
                $http.post(address, data).then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    console.log(error);
                    q.reject('Unable to process your request. Please try again later.');
                 
                });
                return q.promise;
        }


	return{
		get: get,
		post: post
	};
}

})();
