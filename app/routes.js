 // app/routes.js

// grab the nerd model we just created
var User = require('./models/user');
var Need = require('./models/need');
var Comment = require('./models/comment');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/users', function(req, res) {
            // use mongoose to get all users in the database
            User.find(function(err, users) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all nerds in JSON format
            });
        });

        // route to handle creating user goes here (app.post)
        app.post('/api/users', function(req, res) {
            var user = new User();
            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User created!' });
            });
        });

        app.get('/api/needs', function(req, res) {
            // use mongoose to get all needs in the database
            Need.find(function(err, needs) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(needs); // return all nerds in JSON format
            });
        });

        app.get('/api/users/:user_id/needs', function(req, res) {

            // use mongoose to get all needs for specific user in the database
            Need.find({
                user: req.params.user_id
            }, function(err, user) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(needs); // return all nerds in JSON format
            });
        });

        // route to handle creating need goes here (app.post)
        app.post('/api/users/:user_id/needs', function(req, res) {
            var need = new Need();
            need.user = req.params.user_id
            need.text = req.body.text;

            need.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Need created!' });
            });
        });

        /*app.get('/api/users/needs/comments', function(req, res) {
            // use mongoose to get all nerds in the database
            User.find(function(err, users) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/users/needs/comments', function(req, res) {
            var comment = new Comment();
            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User created!' });
            });
        });*/
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
