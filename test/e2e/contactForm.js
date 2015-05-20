describe('E2E: Contact form', function() {
// Tests here
    beforeEach(function() {
        browser.get('http://localhost:9000');
    });

    it('should disable the submit button when the form is invalid', function() {
        var addButton = element(by.css('button'));
        expect(addButton.isEnabled()).toBe(false);
    });

    it('should enable the submit button when the form is valid', function() {
        element(by.model('newContact.firstName')).sendKeys('Frits');
        element(by.model('newContact.surname')).sendKeys('Spits');
        element(by.model('newContact.email')).sendKeys('frits@spits.nl');
        var addButton = element(by.css('button'));
        expect(addButton.isEnabled()).toBe(true);
    });

    it('should add a contact to the list when submitting the form', function() {
        element(by.model('newContact.firstName')).sendKeys('Frits');
        element(by.model('newContact.surname')).sendKeys('Spits');
        element(by.model('newContact.email')).sendKeys('frits@spits.nl');
        var contacts = by.repeater('contact in contacts');
        var addButton = element(by.css('button'));
        addButton.click();
        expect(element.all(contacts).count()).toBe(3);
        var email = contacts.row(2).column('email');
        expect(element(email).getText()).toBe('frits@spits.nl');
    });
});