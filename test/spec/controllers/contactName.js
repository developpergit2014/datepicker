/**
 * Created by developer on 10-6-15.
 */

describe('Filter: contactName', function() {
    // Tests here
    var contactNameFilter;

    beforeEach(function() {
        module('datepickerApp.filters');
        inject(function($filter) {
            contactNameFilter = $filter('contactName');
        });
    });

    it('should format the name properly', function() {
        var contact = {firstName:'Frank', surname:'de Boer'};
        console.log(contactNameFilter(contact));
        expect(contactNameFilter(contact)).toBe('Frank de Boer');
    });

});