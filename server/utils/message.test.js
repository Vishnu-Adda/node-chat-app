var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'hey@example.com';
        var text = 'wassup';
        var response = generateMessage(from, text);

        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Billy';
        var latitude = 32;
        var longitude = 100;
        var url = 'https://www.google.com/maps?q=32,100';
        var response = generateLocationMessage(from, latitude, longitude);

        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({ from, url });
    });
});