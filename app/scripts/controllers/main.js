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
            telephone: '06123456',
            email: 'frank@muscles.com'
        },
        {
            firstName: 'Eddy',
            surname: 'Valentino',
            telephone: '06345678',
            email: 'eddy@valfam.co.uk'
        }
    ];

    $scope.newContact = {};

    $scope.saveContact = function() {

        if ($scope.editMode == 'false'){
//            alert("nieuwe contact toevoegen");
            $scope.contacts.push(angular.copy($scope.newContact));
            $scope.newContact = {};
        }
        else if ($scope.editMode == 'true'){
//            alert($scope.newContact.firstName);
            $scope.contacts[$scope.rowToEdit].firstName = $scope.newContact.firstName;
            $scope.contacts[$scope.rowToEdit].surname = $scope.newContact.surname;
            $scope.contacts[$scope.rowToEdit].telephone = $scope.newContact.telephone;
            $scope.contacts[$scope.rowToEdit].email = $scope.newContact.email;
            $scope.newContact = {};
        };
      $scope.editMode = 'false';
    };

     $scope.editEntry = function(index){
        $scope.editMode = 'true';
        $scope.rowToEdit = index;
        $scope.newContact = {   firstName: $scope.contacts[index].firstName,
                                surname: $scope.contacts[index].surname,
                                telephone: $scope.contacts[index].telephone,
                                email: $scope.contacts[index].email};
     };

    $scope.verwijderUitLijst = function(index){
        <!--  alert(index); -->
        $scope.contacts.splice(index, 1);
    };

  });
