angular.module('datepickerApp.filters').filter('contactName', function () {
    return function (input) {
        // Filter code here!
        return input.firstName + ' ' + input.surname;
    };
});