angular.module('sampleApp').service('firebaseService', function (FireDB) {

    var datapoint = 1;  // Used in addSale - index of graph data
    var currentSaleDOY = 0;

    this.FBref =  function (path) {
        if (path) {
            return new Firebase(FireDB + path);
        } else {
            return new Firebase(FireDB);
        }
    };

    /**
     * Format the labels on the y-axis
     * @param y The y-value - a sales sum
     * @returns {string} Label value
     */
    var yLabels = function (y) {
        return 'NOK ' + Math.round(y).toString(10);
    };

    /**
     * Format the labels on the x-axis
     * @param x The x-value - a date
     * @returns {Date} Formatted label
     */
    var xLabels = function (x) {
        return moment(x).format('DD.MM');
    };

    /**
     * Format the tool tip on hover
     * @param x
     * @param y
     * @param series
     * @returns {string}
     */
    var toolTip = function (x, y, series) {
        var date = moment(x).format('ddd D. MMM');
        var value = Math.round(y).toString(10) + ',-';
        return date + ': ' + value;
    };

    this.graphOptions = function (store) {
        var options = {};

        if (store === 'Storo') {
            options = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {type: 'linear', min: 0}
                },
                series: [
                    {y: 'Storo', color: 'steelblue', thickness: '4px', type: 'area', striped: true}
                ],
                lineMode: 'linear',
                tension: 0.9,
                tooltip: {mode: 'scrubber', formatter: toolTip},
                drawLegend: true,
                drawDots: true,
                columnsHGap: 5
            };
        }

        if (store === 'Sandvika') {
            options = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {type: 'linear', min: 0}
                },
                series: [
                    {y: 'Sandvika', color: 'salmon', thickness: '4px', type: 'area', striped: true, axis:"y"}
                ],
                lineMode: 'cardinal',
                tension: 0.7,
                tooltip: {mode: 'scrubber', formatter: toolTip},
                drawLegend: true,
                drawDots: true,
                columnsHGap: 5
            };
        }

        if (store === 'Drøbak') {
            options = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {type: 'linear', min: 0}
                },

                series: [
                    {y: 'Drobak', color: 'tan', thickness: '4px', type: 'line', axis: "y"}
                ],

                lineMode: 'cardinal',
                tension: 0.7,
                tooltip: {mode: 'scrubber', formatter: toolTip},
                drawLegend: true,
                drawDots: true,
                columnsHGap: 5
            };
        }

        if (store === '') {
            options = {
                axes: {
                    x: {key: 'x', type: 'date', labelFunction: xLabels},
                    y: {type: 'linear', min: 0, labelFunction: yLabels}
                },
                series: [
                    {y: 'Storo',   color: 'steelblue', thickness: '4px', type: 'area',   striped: true,  axis:"y"},
                    {y: 'Sandvika',color: 'salmon',    thickness: '4px', type: 'area',   striped: true,  axis:"y"},
                    {y: 'Drobak',  color: 'tan',       thickness: '2px', type: 'column', striped: false, axis:"y"}
                ],
                lineMode: 'line',
                tension: 0.7,
                tooltip: {mode: 'scrubber', formatter: toolTip},
                drawLegend: true,
                drawDots: true,
                columnsHGap: 5
            };
        }

        return options;
    };


    /**
     * Read sales data from Firebase, load graph data
     */
    this.getStoreSales = function (self) {

        var from = parseInt(moment(self.fromDate).format("YYYYMMDD"), 10);
        var to = parseInt(moment(self.toDate).format("YYYYMMDD"), 10);
        var dbRef = this.FBref('Sales');
        var selectionRef;

        // Clean out old data
        while (self.data.length > 0) {
            self.data.pop();
        }
        datapoint = 1;
        self.data.push({'x': 0, 'Storo': 0, 'Sandvika': 0, 'Drobak': 0});

        selectionRef = dbRef.orderByChild("date").startAt(from).endAt(to);
        selectionRef.on("child_added", addSale, dummy, self);
    };

    /**
     * Add a day sale to graph data
     * @param snapshot Datapoint read from Firebase
     */
    var addSale = function(snapshot) {

        console.log('The key: ' + snapshot.key() + ' ' +
        snapshot.exportVal().sum + ' ' +
        snapshot.exportVal().date + ' ' +
        snapshot.exportVal().store);

        var daySale = {'x': 0, 'Storo': 0, 'Sandvika': 0, 'Drobak': 0};
        var store = snapshot.exportVal().store;
        var sum = snapshot.exportVal().sum;

        var str = snapshot.exportVal().date.toString();
        var mnt = moment(str, 'YYYYMMDD');
        var date = moment(mnt).toDate();

        var thisSaleDOY = moment(date).dayOfYear();

        // Got a new date?
        if (currentSaleDOY != thisSaleDOY) {

            currentSaleDOY = thisSaleDOY;

            // If previous package has 0 for all sales: dont push, reuse package
            if (this.data[datapoint - 1].Storo === 0 &&
                this.data[datapoint - 1].Sandvika === 0 &&
                this.data[datapoint - 1].Drobak === 0) {
                console.log('resue package');
            } else {
                // Push new "package" into this.data and fill in date
                this.data.push(daySale);
                datapoint = this.data.length;
            }
            this.data[datapoint-1].x = date;
        }

        if (store === 'Storo') {
            this.data[datapoint-1].Storo = sum;
        }
        if (store === 'Sandvika') {
            this.data[datapoint-1].Sandvika = sum;
        }
        if (store === 'Drøbak') {
            this.data[datapoint-1].Drobak = sum;
        }
    };

    /**
     * Dummy function used in Firebase so that the 'this' can be set in a query
     */
    var dummy = function (){
        alert('testCtrl: Ikke logget på?');
    };

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