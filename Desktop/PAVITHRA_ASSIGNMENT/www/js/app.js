var app = angular.module('myApp',['ui.router','track','genre','starApp','myApp.data']);
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('track',{
         url: '/track',
         templateUrl: 'src/track.html',
         controller: 'trackController'

	})
	.state('genre',{
         url: '/genre',
         templateUrl: 'src/genre.html',
         controller: 'genreController'

	})
	$urlRouterProvider.otherwise('/track');
});