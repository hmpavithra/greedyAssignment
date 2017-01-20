(function(){
"use strict";
angular.module('track',[])
	   .controller('trackController',trackController);

function trackController($scope,$http,$state,dataservice){

	$scope.getTrackList = function(resp){
$scope.ratings = resp.results;
 
}

$scope.doNothingErr = function(err){
	alert("err");
}

$scope.max="10";
$scope.addTrack = false;
$scope.editTrack = false;



dataservice.get(label.url_get_track_list).then($scope.getTrackList, $scope.doNothingErr);


$scope.getGenre = function(){
	 $('.nav-pills li').removeClass('active');
            $(this).addClass('active');       
	$state.go('genre');
}

$scope.addTrackList = function(){
	$scope.addTrack=true;
	function getGenreListAdd(resp){
		angular.forEach(resp.results, function(val){
			val['isEnabled'] = false;
		});
		$scope.gList = resp.results;
	}
	dataservice.get('http://104.197.128.152:8000/v1/genres').then(getGenreListAdd, $scope.doNothingErr);
}

 $scope.editTrackList = function(trackList){
 	console.log("Edit"+JSON.stringify(trackList.genres));
	$scope.editTrack = true;
	$scope.id = trackList.id;
	$scope.title = trackList.title;
	$scope.rating = trackList.rating;
	

	function getGenreListAdd(resp){
		$scope.gList = resp.results;
		angular.forEach(resp.results, function(val){
			val['isEnabled'] = false;
			angular.forEach(trackList.genres, function(value){
				if(val.id === value.id) {
					val['isEnabled'] = true;
				}
			});
		});
		$scope.checked = trackList.id;
	}

	dataservice.get('http://104.197.128.152:8000/v1/genres').then(getGenreListAdd, $scope.doNothingErr);
}


$scope.addTrackListSucc = function(resp){
$scope.addTrack=false;
$scope.editTrack=false;

dataservice.get('http://104.197.128.152:8000/v1/tracks').then($scope.getTrackList, $scope.doNothingErr);


}

	$scope.submitTrack = function(selected){

				$scope.details = [];
			angular.forEach(selected, function (value, key) {
				
			if(selected[key].isEnabled) {
			$scope.details.push(selected[key].id);
			}
		});
		var req = {"title":$scope.title,"rating":$scope.rating,"genres":$scope.details};
		if($scope.addTrack){
	
		
		dataservice.post('http://104.197.128.152:8000/v1/tracks',req).then($scope.addTrackListSucc, $scope.doNothingErr);

		}else{
			req['id'] = $scope.id;
		dataservice.post('http://104.197.128.152:8000/v1/tracks/'+$scope.id, req).then($scope.addTrackListSucc, $scope.doNothingErr);

		}
	
	}


}

})();

