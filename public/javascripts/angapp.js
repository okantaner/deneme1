
angular.module('angulardeneme', [])
  .controller('mainCtrl', function ($scope, People) {
    $scope.people = People.get();
    
    $scope.newPerson = {};
    
    $scope.save = function (person) {
        People.save(person);
    }
    
    $scope.add = function (newPerson) {
        People.add(newPerson);
        $scope.newPerson = {};
    }
    
    $scope.remove = function (person) {
        People.remove(person);
    }
})
  .factory('People', function ($http) {
    var people = [];
    
    return {
        get: function () {
            if (people.length == 0) {
                $http.get('people.json')
            .success(function (response) {
                    for (var i = 0, ii = response.length; i < ii; i++) {
                        people.push(response[i]);
                    }
                })
            .error(function (err) {
                });
            };
            return people;
        },
        add: function (person) {
            people.push(person);
        },
           remove: function (person) {
            $http({
                method  : 'DELETE',
                url     : '/angposted',
                data    : person, 
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            })
          .success(function (data) {
                if (data.errors) {
                } else {
                    if (typeof data.redirect == 'string') { window.location = data.redirect }
                    people.splice(people.indexOf(person), 1)
                }
            });
        },
        save: function (person) {
            $http({
                method  : 'POST',
                url     : '/angposted',
                data    : person, 
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            })
          .success(function (data) {
                if (data.errors) {
                } else {
                    if (typeof data.redirect == 'string') { window.location = data.redirect }
                }
            });
        }
    }
})

