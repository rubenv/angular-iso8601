angular.module('rt.iso8601', []).factory('iso8601', function () {
    function toInt(val) {
        return parseInt(val, 10);
    }

    return {
        parse: function parse(str) {
            var year;
            var month;
            var day;
            var hours;
            var minutes;
            var seconds;
            var offset = 0;

            // Default time to midnight.
            hours = minutes = seconds = 0;

            if (!str || str.length === 0) {
                return null;
            }

            if (str.length >= 10) {
                var datePieces = str.substring(0, 10).split('-');
                year = toInt(datePieces[0]);
                month = toInt(datePieces[1]) - 1;
                day = toInt(datePieces[2]);
            }

            if (str.length >= 11) {
                var timePieces = str.substring(11).split(':');
                hours = toInt(timePieces[0]);
                minutes = toInt(timePieces[1]);
                seconds = toInt(timePieces[2].substring(0, 2));

                var tz = timePieces[2].substring(2);
                if (tz !== '') {
                    if (tz[0] === '.') {
                        var start = Math.max(tz.indexOf('Z'), tz.indexOf('+'), tz.indexOf('-'));
                        tz = start > -1 ? tz.substring(start) : '';
                    }

                    if (tz === '') {
                        // Do nothing
                    } else if (tz === 'Z') {
                        // Supplied time is in UTC, convert to local time
                        offset = -1000 * new Date().getTimezoneOffset() * 60;
                    } else {
                        throw new Error('Other timezones not supported yet: ' + tz);
                    }
                }
            }

            var date = new Date(year, month, day, hours, minutes, seconds, 0);
            if (offset !== 0) {
                date.setTime(date.getTime() + offset);
            }
            return date;
        }
    };
});
