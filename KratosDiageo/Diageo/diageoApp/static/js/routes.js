angular
.module('diageoApp')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

 $routeProvider
 
    .when('/home', {
      templateUrl: 'index.html',
      controller: 'Index'
    })

    .otherwise({
        redirectTo: '/home'
    });

  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });


}]);