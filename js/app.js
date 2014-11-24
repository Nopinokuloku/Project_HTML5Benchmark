'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/picSet', {templateUrl: 'partials/pictureSetting.html', controller: 'PicSetController'});
  $routeProvider.when('/gal', {templateUrl: 'partials/gallery.html', controller: 'GalController'});
  $routeProvider.when('/pic', {templateUrl: 'partials/picture.html', controller: 'PicController'});
  $routeProvider.when('/vid', {templateUrl: 'partials/video.html', controller: 'VidController'});
  $routeProvider.when('/db', {templateUrl: 'partials/database.html', controller: 'DBController'});
  $routeProvider.when('/gps', {templateUrl: 'partials/gps.html', controller: 'GPSController'});
  $routeProvider.when('/anim', {templateUrl: 'partials/animation.html', controller: 'AnimController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
