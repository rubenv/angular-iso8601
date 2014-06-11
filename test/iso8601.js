describe('ISO8601', function () {
    var iso8601 = null;

    beforeEach(module('rt.iso8601'));

    beforeEach(inject(function ($injector) {
        iso8601 = $injector.get('iso8601');
    }));

    it('Has a parse method', function () {
        assert.isFunction(iso8601.parse);
    });
});
