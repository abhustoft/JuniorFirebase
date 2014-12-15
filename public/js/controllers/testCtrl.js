
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

        this.data = [
            {x: 20120103, value: 200000},
            {x: 20120104, value: 300000},
            {x: 20120105, value: 400000}
        ];
    };

    /**
     * Dummy function used in Firebase so that the 'this' can be set in a query
     */
    var dummy = function (){
        alert('testCtrl: No access, dummy');
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
        var index = 0;

        var dbRef = firebaseService.FBref(this.storeChoice + 'Sales');
        var selectionRef = dbRef.orderByChild("date").startAt(from).endAt(to);
        selectionRef.on("child_added", function(snapshot) {
                console.log('The key: ' + snapshot.key() + ' ' +
                snapshot.exportVal().sum + ' ' +
                snapshot.exportVal().date + ' ' +
                snapshot.exportVal().store);

                this.data[index].x = snapshot.exportVal().date;
                this.data[index++].value = snapshot.exportVal().sum;
            },
            dummy,
            this);
        return selectionRef;
    }



    this.data = [
        {x: 20120103, value: 100000},
        {x: 20120104, value: 200000},
        {x: 20120105, value: 50000}
    ];


    this.options = {
        axes: {
            x: {key: 'x', labelFunction: function(value) {return value;}, type: 'linear'},
            y: {type: 'linear'},
            y2: {type: 'linear'}
        },
        series: [
            {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'},
            {y: 'otherValue', axis: 'y2', color: 'lightsteelblue', visible: false, drawDots: true, dotSize: 2}
        ],
        lineMode: 'linear',
        tension: 0.7,
        tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
        drawLegend: true,
        drawDots: true,
        columnsHGap: 5
    };

});
