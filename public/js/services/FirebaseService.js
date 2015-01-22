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


    var graphOptions = function (store) {
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

        self.options = graphOptions(this.storeChoice);
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
});