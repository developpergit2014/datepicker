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

    $scope.editMode = 'false';
    $scope.rowToEdit = '0';
//        alert($scope.editMode);

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

        if ($scope.editMode == 'false'){
//            alert("nieuwe contact toevoegen");
            $scope.contacts.push(angular.copy($scope.newContact));
        }
        else if ($scope.editMode == 'true'){
//                alert($scope.newContact.firstName);
                $scope.contacts[$scope.rowToEdit].firstName = $scope.newContact.firstName;
                $scope.contacts[$scope.rowToEdit].surname = $scope.newContact.surname;
                $scope.contacts[$scope.rowToEdit].email = $scope.newContact.email;
        };
      $scope.editMode = 'false';
    };

     $scope.editEntry = function(index){
        $scope.editMode = 'true';
        $scope.rowToEdit = index;
        $scope.newContact = {firstName: $scope.contacts[index].firstName, surname: $scope.contacts[index].surname, email: $scope.contacts[index].email};
     };

    $scope.verwijderUitLijst = function(index){
        <!--  alert(index); -->
        $scope.contacts.splice(index, 1);
    };

  });
