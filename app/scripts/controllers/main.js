'use strict';

/**
 * @ngdoc function
 * @name datepickerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the datepickerApp
 */
angular.module('datepickerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.name = 'My two worlds';

    $scope.contacts = [
        {
            firstName: 'Frank',
            surname: 'Muscles',
            email: 'frank@muscles.com'
        },
        {
            firstName: 'Eddy',
            surname: 'Valentino',
            email: 'eddy@valfam.co.uk'
        }
    ];

    $scope.newContact = {};

    $scope.saveContact = function() {
        $scope.contacts.push(angular.copy($scope.newContact));
//        $scope.contacts.push($scope.newContact);
    };

    $scope.verwijderUitLijst = function(index){
        <!--  alert(index); -->
        $scope.contacts.splice(index, 1);
    };

  });
