
var Nerd  = require('./models/nerd');
var Store = require('./models/store');
var Sale  = require('./models/sale');

module.exports = function(app, express) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    var router = express.Router();

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    // on routes that end in /nerds
    // ----------------------------------------------------
    router.route('/nerds')

        // create a nerd (accessed at POST http://localhost:8080/api/nerds)
        .post(function(req, res) {

            var nerd = new Nerd(); 		// create a new instance of the Nerd model
            nerd.name = req.body.name;  // set the nerds name (comes from the request)
            nerd.street = req.body.street;

            // save the nerd and check for errors
            nerd.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Nerd created!' });
            });

        })

        // get all the nerds (accessed at GET http://localhost:8080/api/nerds)
        .get(function(req, res) {

            Store.find(function(err, nerds) {
                if (err)
                    console.log('Get nerds error: ' + err);

                console.log('Got nerds: ' + nerds);
            });

            Nerd.find(function(err, nerds) {
                if (err)
                    res.send(err);

                res.json(nerds);
            });
        });

    // on routes that end in /stores
    // ----------------------------------------------------
    router.route('/stores')

        // create a store (accessed at POST http://localhost:8080/api/stores)
        .post(function(req, res) {

            var store = new Store();
            store.name = req.body.name;
            store.manager = req.body.manager;

            // save the store and check for errors
            store.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Store created!' });
            });

        })

        // get all the stores (accessed at GET http://localhost:8080/api/stores)
        .get(function(req, res) {

            Store.find(function(err, stores) {
                if (err)
                    console.log('Get stores error: ' + err);

                console.log('Got stores: ' + stores);
            });

            Store.find(function(err, stores) {
                if (err)
                    res.send(err);

                res.json(stores);
            });
        });

    // on routes that end in /sales
    // ----------------------------------------------------
    router.route('/sales')

        // create a sale (accessed at POST http://localhost:8080/api/sales)
        .post(function(req, res) {

            var sale = new Sale();
            sale.amount = req.body.amount;
            sale.date = req.body.date;

            // save the sale and check for errors
            sale.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'sale created!' });
            });

        })

        // get all the sales (accessed at GET http://localhost:8080/api/sales)
        .get(function(req, res) {

            Sale.find(function(err, sales) {
                if (err)
                    console.log('Get sales error: ' + err);

                console.log('Got sales: ' + sales);
            });

            Sale.find(function(err, sales) {
                if (err)
                    res.send(err);

                res.json(sales);
            });
        });

    // on routes that end in /nerds/:nerd_id
// ----------------------------------------------------
    router.route('/nerds/:nerd_id')

        // get the nerd with that id (accessed at GET http://localhost:8080/api/nerds/:nerd_id)
        .get(function(req, res) {
            Nerd.findById(req.params.nerd_id, function(err, nerd) {
                if (err)
                    res.send(err);
                res.json(nerd);
            });
        })

        // update the nerd with this id (accessed at PUT http://localhost:8080/api/nerds/:nerd_id)
        .put(function(req, res) {

            // use our nerd model to find the nerd we want
            Nerd.findById(req.params.nerd_id, function(err, nerd) {

                if (err)
                    res.send(err);

                nerd.name = req.body.name; 	// update the nerds info

                // save the nerd
                nerd.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Nerd updated!' });
                });

            });
        })

        // delete the nerd with this id (accessed at DELETE http://localhost:8080/api/nerds/:nerd_id)
        .delete(function(req, res) {
            Nerd.remove({
                _id: req.params.nerd_id
            }, function(err, nerd) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });


    app.use('/api', router);
};