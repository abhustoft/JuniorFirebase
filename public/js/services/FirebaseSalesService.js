angular.module('sampleApp').service('salesService', function () {

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

        var dbRef = new Firebase('https://junioropen.firebaseio.com/');
        var days = {};
        var dateStr = ' ';
        var date = 0;

        for (var m = 1; m < 13; m++) {
            for (var i = 1; i < 32; i++) {
                dateStr = year + padDigits(m,2) + padDigits(i,2);
                dbRef =  new Firebase('https://junioropen.firebaseio.com/' + store + 'Sales');
                date = parseInt(dateStr,10);
                days = JSON.parse('{"sum": ' + i + ', "temp": 23,"store": "' + store + '","date":' + date + '}');
                dbRef.push(days);
            }
        }
    };


    /**
     * Dummy function used in Firebase so that the 'this' can be set in a query
     */
    var dummy = function (){
        alert('cancelled');
    };

    /**
     *
     * @param {sting} store The store name
     * @param {date} fromDate The first date to fetch sales for - as provided by the browsers date input form
     * @param {date} toDate The last date to fetch sales for - as provided by the browsers date input form
     */
    this.getStoreSales = function (store, fromDate, toDate) {

        var intfrom = parseInt(moment(fromDate).format("YYYYMMDD"),10);
        var intto = parseInt(moment(toDate).format("YYYYMMDD"),10)

        var dbRef = new Firebase('https://junioropen.firebaseio.com/' + store + 'Sales');

        var selectionRef = dbRef.orderByChild("date").startAt(intfrom).endAt(intto);
        selectionRef.on("child_added", function(snapshot) {
                console.log('The key: ' + snapshot.key() + ' ' +
                snapshot.exportVal().sum + ' ' +
                snapshot.exportVal().date + ' ' +
                snapshot.exportVal().store);
            },
            dummy,
            this);
        return selectionRef;
    }
});