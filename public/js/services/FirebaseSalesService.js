angular.module('sampleApp').service('salesService', function (firebaseService) {

    /**
     * Months and days need to be two digits in date string
     * @param {integer} number The number to pad
     * @param {integer} digits The radix
     * @returns {string} The padded string value of the number
     */
    var padDigits = function (number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    };

    this.initDB = function (store, year) {

        var dbRef = firebaseService.FBref();
        var days = {};
        var dateStr = ' ';
        var date = 0;

        for (var m = 1; m < 13; m++) {
            for (var i = 1; i < 32; i++) {
                dateStr = year + padDigits(m,2) + padDigits(i,2);
                dbRef =  firebaseService.FBref(store + 'Sales');
                date = parseInt(dateStr,10);
                days = JSON.parse('{"sum": ' + i + ', "temp": 23,"store": "' + store + '","date":' + date + '}');
                dbRef.push(days);
            }
        }
    };
});