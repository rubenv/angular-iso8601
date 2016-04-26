angular.module("rt.iso8601", []).factory("iso8601", function () {
    var substring = "substring";
    var indexOf = "indexOf";
    var length = "length";

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

            if (!str || !str[length]) {
                return null;
            }

            if (str[length] >= 10) {
                var datePieces = str[substring](0, 10).split("-");
                year = toInt(datePieces[0]);
                month = toInt(datePieces[1]) - 1;
                day = toInt(datePieces[2]);
            }

            if (str[length] >= 11) {
                var timePieces = str[substring](11).split(":");
                while (timePieces[length] < 3) {
                    timePieces.push("");
                }

                hours = toInt(timePieces[0]);
                minutes = toInt(timePieces[1]);
                seconds = toInt(timePieces[2][substring](0, 2)) || 0;

                var tz = timePieces[2][substring](2) || "";
                if (tz[0] === ".") {
                    var start = Math.max(tz[indexOf]("Z"), tz[indexOf]("+"), tz[indexOf]("-"));
                    tz = start > -1 ? tz[substring](start) : "";
                }

                if (tz === "") {
                    // Supplied time is in local time
                    offset = 1000 * new Date().getTimezoneOffset() * 60;
                } else if (tz === "Z") {
                    // Do nothing
                } else {
                    if (tz[length] === 3) {
                        var tzOffset = toInt(tz[substring](1)) * 60;
                        offset = -tzOffset * 60 * 1000;
                    } else {
                        throw new Error("Unsupported timezone offset: " + tz);
                    }
                }
            }

            var utc = Date.UTC(year, month, day, hours, minutes, seconds, 0);
            var date = new Date(utc + offset);
            return date;
        }
    };
});
