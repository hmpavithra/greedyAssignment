(function(){
"use strict";
angular.module('genre',[])
	   .controller('genreController',genreController);

function genreController($scope,$state,dataservice){

$scope.getGenreList = function(resp){
	$scope.genreslist = resp.results;
}

$scope.doNothingErr = function(err){

}

dataservice.get('http://104.197.128.152:8000/v1/genres').then($scope.getGenreList, $scope.doNothingErr);

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
dataservice.get('http://104.197.128.152:8000/v1/genres').then($scope.getGenreList, $scope.doNothingErr);
}

$scope.doNothingErr = function(err){

}

$scope.submitGenre = function(){

	if($scope.addgen){
    var req = {"name": $scope.genrename};

		dataservice.post('http://104.197.128.152:8000/v1/genres',req).then($scope.addGenreList, $scope.doNothingErr);

	}else{
				req['id'] = $scope.genid;
		dataservice.post('http://104.197.128.152:8000/v1/genres'+$scope.genid,req).then($scope.addGenreList, $scope.doNothingErr);

	}

	}


}

})();
