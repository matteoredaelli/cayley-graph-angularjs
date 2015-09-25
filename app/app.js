var app = angular.module('myApp', []);

app.config(['$httpProvider', function($httpProvider) {
        //$httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('planetController', function($scope, $http, $location) {
    $scope.query = $location.search().v;
    $scope.searchV = function(query) {
      var url = "http://cayley.mydomain.com/api/v1/query/gremlin";
      var payload = "g.V('" + query + "').In(null,'predicate').All()";
      $scope.query = query;
      $http.post(url, payload, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
      })
      	.then(function(response) {$scope.input_nodes = response;});
      var payload = "g.V('" + query + "').Out(null,'predicate').All()";
      $http.post(url, payload, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
      })
      	.then(function(response) {$scope.output_nodes = response;})
     };
     $scope.searchV($scope.query);
});
