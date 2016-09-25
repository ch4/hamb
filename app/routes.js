 // app/routes.js

// grab models
var User = require('./models/user');
var Need = require('./models/need');
var Comment = require('./models/comment');
var twilio = require('twilio');
var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // Get all Users
        app.get('/api/users', function(req, res) {
            User.find(function(err, users) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all nerds in JSON format
            });
        });

        // Get a User
        app.get('/api/users/:user_id', function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(user); // return all nerds in JSON format
            });
        });


        // Create User
        app.post('/api/users', function(req, res) {
            var user = new User();
            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User created!' });
            });
        });

        // All Needs
        app.get('/api/needs', function(req, res) {
            Need.find(function(err, needs) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(needs); // return all nerds in JSON format
            });
        });

        // User's Needs
        app.get('/api/users/:user_id/needs', function(req, res) {
            Need.find({
                user: req.params.user_id
            }, function(err, needs) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(needs); // return all nerds in JSON format
            });
        });

        // Create Needs
        app.post('/api/users/:user_id/needs', function(req, res) {
            var need = new Need();
            need.user = req.params.user_id;
            need.text = req.body.text;

            need.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Need created!' });
            });
        });

        // Comments for Need
        app.get('/api/needs/:need_id/comments', function(req, res) {
            Comment.find({
                need: req.params.need_id
            }, function(err, comments) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(comments); // return all nerds in JSON format
            });
        });

        // Create Comment
        app.post('/api/needs/:need_id/comments', function(req, res) {
            var comment = new Comment();
            comment.need = req.params.need_id;
            comment.user = req.body.user;
            comment.text = req.body.text;

            comment.save(function(err) {
                if (err)
                    res.send(err);

                // Send SMS to Need's User's phone
                Need.findById(req.params.need_id, function(err, doc){
                    User.findById(doc.user, function(err, doc){
                        client.sendMessage({
                            to: doc.phone,
                            from: process.env.TWILIO_PHONE,
                            body: 'New Comment: ' + comment.text
                        });

                        res.json({ message: 'Comment added!' });
                    });
                });
            });


        });
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
