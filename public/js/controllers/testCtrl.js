
angular.module('testCtrl', []).controller('TestController', function(saleFactory,
                                                                     salesService,
                                                                     storeSalesFactory,
                                                                     $firebase,
                                                                     firebaseService,
                                                                     $filter) {
    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate;
    this.data = [];

    var dbRef = new Firebase('https://junioropen.firebaseio.com/StoroSales');
    var sync = $firebase(dbRef.orderByChild("date").startAt(20140101).endAt(20140106));

    // if ref points to a data collection
    this.list = sync.$asArray();

    this.checkPoint = function () {
        console.log('checking');
        //sync = $firebase(dbRef.orderByChild("date").startAt(20140112).endAt(20140114));
        //this.list = sync.$asArray();
    };

    /**
     * Dummy function used in Firebase so that the 'this' can be set in a query
     */
    var dummy = function (){
        alert('testCtrl: Ikke logget på?');
    };

    /**
     *
     * @param {sting} store The store name
     * @param {date} fromDate The first date to fetch sales for - as provided by the browsers date input form
     * @param {date} toDate The last date to fetch sales for - as provided by the browsers date input form
     */
    this.getStoreSales = function () {

        var from = parseInt(moment(this.fromDate).format("YYYYMMDD"),10);
        var to = parseInt(moment(this.toDate).format("YYYYMMDD"),10);

        // Clean out old data
        while(this.data.length > 0) {
            this.data.pop();
        }

        var currentSaledoy = 0;
        var datapoint = 1;

        if (this.storeChoice === 'Storo') {
            this.options = {
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

        if (this.storeChoice === '') {
            this.options = {
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

        if (this.storeChoice === 'Sandvika') {
            this.options = {
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

        if (this.storeChoice === 'Drøbak') {
            this.options = {

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

        var dbRef = firebaseService.FBref('Sales');

        this.data.push({'x': 0, 'Storo': 0, 'Sandvika': 0, 'Drobak': 0});

        var selectionRef = dbRef.orderByChild("date").startAt(from).endAt(to);
        selectionRef.on("child_added", function(snapshot) {
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

            var thisSaledoy = moment(date).dayOfYear();

            // Got a new date?
            if (currentSaledoy != thisSaledoy) {
                currentSaledoy = thisSaledoy;

                // If previous package has 0 for all sales: dont push, reuse package
                if (this.data[datapoint - 1].Storo === 0 &&
                    this.data[datapoint - 1].Sandvika === 0 &&
                    this.data[datapoint - 1].Drobak === 0) {
                   ;
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

        },
        dummy,
        this);
        return selectionRef;
    };

    var yLabels = function (y) {
        return 'NOK ' + Math.round(y).toString(10);
    };

    var xLabels = function (x) {
        return moment(x).format('DD.MM');
    };

    var toolTip = function (x, y, series) {
        var date = moment(x).format('D. MMM');
        var value = Math.round(y).toString(10) + ',-';
        return date + ': ' + value;
    };

    this.options = {
        axes: {
            x: {key: 'x', type: 'date', labelFunction: xLabels},
            y: {type: 'linear', min: 0, labelFunction: yLabels}
        },
        series: [
            {y: 'Storo', color: 'steelblue', thickness: '4px', type: 'area', striped: true},
            {y: 'Sandvika',color: 'salmon', thickness: '4px', type: 'area', striped: true},
            {y: 'Drobak',color: 'tan', thickness: '2px', type: 'column', striped: false}
        ],
        lineMode: 'linear',
        tension: 0.9,
        tooltip: {mode: 'scrubber', formatter: toolTip},
        drawLegend: true,
        drawDots: true,
        columnsHGap: 5
    };

});
