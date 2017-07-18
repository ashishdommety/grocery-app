var myApp = angular.module("myApp",[]);

myApp.controller("theController",["$scope", "$http", function($scope, $http){
  $scope.message = "Enter your grocery list:";
  // the empty list to start out with
  $scope.list=[];
// adds an item in the list along with it's specified properties
  $scope.addItem = function(){

    $http({
      method: 'GET',
      url: 'https://pixabay.com/api/?key=5207088-f6eeef2e4b8e5be697c01704f&q='+$scope.newItem.item+'&image_type=photo&pretty=true'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // console.log(response.data.hits[0].webformatURL);
        var pic = "Not Found";
        if(typeof(response.data.hits) !== 'undefined'){
          if(response.data.hits.length > 0){
            console.log(response.data.hits);
            pic = response.data.hits[0].webformatURL;

          }
        }

        $scope.list.push({
          name:$scope.newItem.item,
          quantity:$scope.newItem.quantity,
          image: pic
        });
        // then we reset the input values to empty
        $scope.newItem.item = "";
        $scope.newItem.quantity = "";
      }, function errorCallback(response) {
        $scope.list.push({
        });
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      })
};

//removes an item in the list
  $scope.removeItem = function(item){
    var removedItem = $scope.list.indexOf(item);
    $scope.list.splice(removedItem,1);
  };
}]);
