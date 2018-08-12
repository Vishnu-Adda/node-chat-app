var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'hey@example.com';
        var text = 'wassup';
        var response = generateMessage(from, text);
        
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({from, text});
    });
});