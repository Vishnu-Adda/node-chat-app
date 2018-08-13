const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var test = 123;
        var response = isRealString(test);
        
        expect(response).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var test = '   ';
        var response = isRealString(test);

        expect(response).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var test = '   Hello 123';
        var response = isRealString(test);

        expect(response).toBe(true);
    });
});