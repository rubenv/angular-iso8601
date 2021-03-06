describe("ISO8601", function () {
    var iso8601 = null;

    beforeEach(module("rt.iso8601"));

    beforeEach(inject(function ($injector) {
        iso8601 = $injector.get("iso8601");
    }));

    it("Has a parse method", function () {
        assert.isFunction(iso8601.parse);
    });

    it("Parses dates", function () {
        assert.equal(iso8601.parse("2014-06-10").toDateString(), "Tue Jun 10 2014");
    });

    it("Parses date / time", function () {
        assert.equal(iso8601.parse("2014-06-10T13:52:43").toDateString(), "Tue Jun 10 2014");
        assert.equal(iso8601.parse("2014-06-10T13:52:43").toTimeString().substring(0, 8), "13:52:43");
    });

    it("Parses incomplete time", function () {
        assert.equal(iso8601.parse("2014-06-10T13:52").toDateString(), "Tue Jun 10 2014");
        assert.equal(iso8601.parse("2014-06-10T13:52").toTimeString().substring(0, 8), "13:52:00");
    });

    it ("Parses fractions", function () {
        assert.equal(iso8601.parse("2014-06-10T13:52:43.184421103").toTimeString().substring(0, 8), "13:52:43");
    });

    it ("Converts to local time if needed", function () {
        var hour = 13 + -1 * (new Date().getTimezoneOffset() / 60);
        assert.equal(iso8601.parse("2014-06-10T13:52:43Z").toTimeString().substring(0, 8), hour + ":52:43");
    });

    it ("Converts to local time if needed (with fraction)", function () {
        var hour = 13 + -1 * (new Date().getTimezoneOffset() / 60);
        assert.equal(iso8601.parse("2014-06-10T13:52:43.184421103Z").toTimeString().substring(0, 8), hour + ":52:43");
    });

    it("Parses time offsets", function () {
        assert.equal(iso8601.parse("2016-01-21T11:30:00+01:00").toUTCString(), "Thu, 21 Jan 2016 10:30:00 GMT");
        assert.equal(iso8601.parse("2016-01-21T12:30:00+02:00").toUTCString(), "Thu, 21 Jan 2016 10:30:00 GMT");
        assert.equal(iso8601.parse("2016-01-21T10:30:00+00:00").toUTCString(), "Thu, 21 Jan 2016 10:30:00 GMT");
    });
});
