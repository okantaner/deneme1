angular.module('angulardeneme', [])
  .controller('mainCtrl', function ($scope, $http) {
    $scope.people = [];
    
    $http.get('people.json').success(function (response) {
        $scope.people = response;

    });
    
    $scope.save = function (person) {
        
        $http({
            method  : 'POST',
            url     : '/angposted',
            data    : person, 
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
          .success(function (data) {
            if (data.errors) {
                $scope.errorName = data.errors.name;
                $scope.errorUserName = data.errors.username;
                $scope.errorEmail = data.errors.email;
            } else {
                $scope.message = data.message;
                if (typeof data.redirect == 'string') { window.location = data.redirect }
            }
        });

    }

    $scope.delete = function () {
        $http({
            method  : 'POST',
            url     : '/angdelete',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
          .success(function (data) {
            if (data.errors) {
                $scope.errorName = data.errors.name;
                $scope.errorUserName = data.errors.username;
                $scope.errorEmail = data.errors.email;
            } else {
                $scope.message = data.message;
                if (typeof data.redirect == 'string') { window.location = data.redirect }
            }
        });
    }
});


