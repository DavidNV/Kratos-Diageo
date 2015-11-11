var diageo = angular.module('diageoApp');

diageo.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

diageo.controller('Index', ['$scope', function($scope){
	console.log('sir');
}]);