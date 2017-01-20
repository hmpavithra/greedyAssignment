(function(){
"use strict";
angular.module('starApp',[])
	   .directive('starRating',starRating);

	   function starRating(){
	   		return {

	   			restrict: 'A',
	   			template: '<ul class="rating">'+'<li ng-repeat="star in stars" ng-class="star">'+'\u2605'+'</li>'+'</ul>',
	   			scope: {
	   			maxValue: '=',
	   			ratingValue: '='
	   			},
	   			link: function(scope,elem,attr){
                   scope.stars = [];
                   for(var i=0;i<scope.maxValue;i++){
						scope.stars.push({
							filled: i < scope.ratingValue
						});

                   }

	   			}
	   		}

	   }
})();