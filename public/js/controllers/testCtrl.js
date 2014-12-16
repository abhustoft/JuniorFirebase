
angular.module('testCtrl', []).controller('TestController', function(saleFactory,
                                                                     salesService,
                                                                     storeSalesFactory,
                                                                     $firebase,
                                                                     firebaseService,
                                                                     $filter) {

    this.tagline = 'The sales!';
    this.storeChoice = '';
    this.fromDate = '';
    this.toDate = '';
    this.storeList = [];
    this.dbRef = {};

    /*
    this.getStoreSales = function () {
        this.dbsel = salesService.getStoreSales(this.storeChoice, this.fromDate, this.toDate);
    }
    */

    this.initFB = function () {
        salesService.initDB('Storo','2013');
        salesService.initDB('Sandvika','2013');
        salesService.initDB('Storo','2014');
        salesService.initDB('Sandvika','2014');
    };

    var dbRef = new Firebase('https://junioropen.firebaseio.com/StoroSales');

    var sync = $firebase(dbRef.orderByChild("date").startAt(20140101).endAt(20140106));

    // if ref points to a data collection
    this.list = sync.$asArray();

    this.checkPoint = function () {
        console.log('checking');
        sync = $firebase(dbRef.orderByChild("date").startAt(20140112).endAt(20140114));
        this.list = sync.$asArray();
    };

    /**
     * Dummy function used in Firebase so that the 'this' can be set in a query
     */
    var dummy = function (){
        alert('testCtrl: No access, dummy');
    };

    /**
     * Converts a number in format YYYYMMDD to a Date object
     * @param {integer} time
     * @return {Date}
     */
    var toDateFormat = function (time) {
        var str = time.toString();
        var mnt = moment(str, 'YYYYMMDD');
        var date = mnt.toDate();
        return date;
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

        //this.data = [];
        while(this.data.length > 0) {
            this.data.pop();
        }

        var dbRef = firebaseService.FBref(this.storeChoice + 'Sales');
        var selectionRef = dbRef.orderByChild("date").startAt(from).endAt(to);
        selectionRef.on("child_added", function(snapshot) {
                console.log('The key: ' + snapshot.key() + ' ' +
                snapshot.exportVal().sum + ' ' +
                snapshot.exportVal().date + ' ' +
                snapshot.exportVal().store);

                var str = snapshot.exportVal().date.toString();
                var mnt = moment(str, 'YYYYMMDD');
                var date = mnt.toDate();

                if(snapshot.exportVal().sum > 0) {
                    this.data.push({'x': date, 'value': snapshot.exportVal().sum});
                }
            },
            dummy,
            this);
        return selectionRef;
    }

    this.data = [];

    this.toolTip = function (x, y, series) {
        /*
        var date = toDateFormat(x).format('DD.MM');
        var value = Math.round(y).toString(10) + ',-';
        return date + ': ' + value;
        */
        return 'ff';
    };

    this.options = {
        axes: {
            x: {key: 'x', type: 'date'},
            y: {type: 'linear', min: 0}
        },
        series: [
            {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true}
        ],
        lineMode: 'linear',
        tension: 0.9,
        tooltip: {mode: 'scrubber', formatter: this.toolTip},
        drawLegend: true,
        drawDots: true,
        columnsHGap: 5
    };

});
