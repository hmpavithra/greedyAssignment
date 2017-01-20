(function(){
"use strict";
angular.module('genre',[])
	   .controller('genreController',genreController);

function genreController($scope,$state,dataservice,$rootScope){

$scope.getGenreList = function(resp){
	$scope.genreslist = resp.results;
}

$scope.doNothingErr = function(err){

}

dataservice.get($rootScope.label.url_get_genres_list).then($scope.getGenreList, $scope.doNothingErr);

$scope.addgen = false;
$scope.editgen = false;

$scope.addGenre = function(){
$scope.genrename = "";
$scope.addgen = true;
}


$scope.editGenre = function(gen){
	$scope.editgen = true;

$scope.genrename = gen.name;
$scope.genid = gen.id;
}


$scope.addGenreList = function(resp){

$scope.addgen = false;
$scope.editgen = false;
dataservice.get($rootScope.label.url_get_genres_list).then($scope.getGenreList, $scope.doNothingErr);
}

$scope.doNothingErr = function(err){

}

$scope.submitGenre = function(){
  
	if($scope.addgen){
		var req = {"name": $scope.genrename};
		dataservice.post($rootScope.label.url_get_genres_list,req).then($scope.addGenreList, $scope.doNothingErr);

	}else{
				var reqedit = {"id":$scope.genid,"name": $scope.genrename};
		dataservice.post($rootScope.label.url_get_genres_list+$scope.genid,reqedit).then($scope.addGenreList, $scope.doNothingErr);

	}

	}


}

})();
