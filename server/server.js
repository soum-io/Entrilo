const express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const config = require('./config');
const utils = require('./utils');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'thequickbrownfoxjumpsoversomething', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var MongoClient = require('mongodb').MongoClient;

var ObjectID = new require('mongodb').ObjectID;

MongoClient.connect(config.url, {useNewUrlParser:true},function(err, client) {
    if (err) throw err;
    app.locals.db = client.db(config.db);
    app.listen(port, () => console.log(`Listening on port ${port}`));
    console.log("Database connected");
});

passport.use(new Strategy(
    function(username, password, cb) {
        app.locals.db.collection("companies").findOne({"company_name":username}, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != utils.hashPassword(password)) { return cb(null, false); }
            return cb(null, {_id:user._id,company_name: user.company_name});
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, {_id:user._id,company_name: user.company_name});
});

passport.deserializeUser(function(user, cb) {
    app.locals.db.collection("companies").findOne({"_id":ObjectID(user._id)}, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.get('/',
    function(req, res) {
        res.send(req.user);
    });

app.get('/api/login',
    function(req, res){
        res.send('login');
    });

app.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/api/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/api/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });

app.put('/api/employee/:id',
    async function(req,res){
        try{
            var name = req.body.name;
            var airline_class = req.body.airline_class;
            var longitude = req.body.longitude;
            var latitude = req.body.latitude;
            var data = {};
            if(utils.validVenueName(name)){
                data['employee.$.name'] = name;
            }
            if(!isNaN(parseFloat(longitude))){
                data['employee.$.longitude'] = longitude;
            }
            if(!isNaN(parseFloat(latitude))) {
                data['employee.$.latitude'] = latitude;
            }
            if(utils.validAirlineClass(airline_class)){
                data['employee.$.airline_class'] = airline_class;
            }
            if(data != {}) {
                const db = req.app.locals.db;
                console.log(data);
                var company = await db.collection("companies").findOneAndUpdate({_id: ObjectID(req.user._id),'employee._id':ObjectID(req.params.id)}, {
                    $set: data,
                }, {returnOriginal: false});
                if (company) {
                    res.send(company.value);
                } else {
                    res.send({"message": "Could not update employee"});
                }
            }else{
                res.send({"message":"Invalid data"});
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.delete('/api/employee/:id',
    async function(req,res){
        try{
            var employee_id = req.params.id;
            const db = req.app.locals.db;
            var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$pull:{employees:{_id:ObjectID(employee_id)}}},{returnOriginal:false});
            if(company){
                res.send(company.value);
            }else{
                res.send({"message":"Could not delete employee"});
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.post('/api/employee',
    async function(req,res){
        try{
            var name = req.body.name;
            var airline_class = req.body.airline_class;
            var longitude = req.body.longitude;
            var latitude = req.body.latitude;
            if(utils.validName(name) && !isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude)) && utils.validAirlineClass(airline_class)){
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$push:{employees:{name:name,airline_class:airline_class,longitude:longitude,latitude:latitude,_id:ObjectID()}}},{returnOriginal:false});
                if(company){
                    res.send(company.value);
                }else{
                    res.send({"message":"Could not create employee"});
                }
            }else{
                res.send("error")//TODO throw better error
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.delete('/api/venue/:id',
    async function(req,res){
        try{
            var employee_id = req.params.id;
            const db = req.app.locals.db;
            var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$pull:{venue:{_id:ObjectID(employee_id)}}},{returnOriginal:false});
            if(company){
                res.send(company.value);
            }else{
                res.send({"message":"Could not delete venue"});
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.put('/api/venue/:id',
    async function(req,res){
        try{
            var name = req.body.name;
            var longitude = req.body.longitude;
            var latitude = req.body.latitude;
            var data = {};
            if(utils.validVenueName(name)){
                data['venue.$.name'] = name;
            }
            if(!isNaN(parseFloat(longitude))){
                data['venue.$.longitude'] = longitude;
            }
            if(!isNaN(parseFloat(latitude))) {
                data['venue.$.latitude'] = latitude;
            }
            if(data != {}) {
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id: ObjectID(req.user._id),'venue._id':ObjectID(req.params.id)}, {
                    $set: data,
                }, {returnOriginal: false});
                if (company) {
                    res.send(company.value);
                } else {
                    res.send({"message": "Could not update venue"});
                }
            }else{
                res.send({"message":"Invalid data"});
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.post('/api/venue',
    async function(req,res){
        try{
            var name = req.body.name;
            var longitude = req.body.longitude;
            var latitude = req.body.latitude;
            if(utils.validVenueName(name) && !isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude))){
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$push:{venue:{name:name,longitude:longitude,latitude:latitude,_id:ObjectID()}}},{returnOriginal:false});
                if(company){
                    res.send(company.value);
                }else{
                    res.send({"message":"Could not create venue"});
                }
            }else{
                res.send("error")//TODO throw better error
            }
        }catch (e) {
            console.log(e);
            res.end();
        }
    });

app.post('/api/signup', async (req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var company_name = req.body.company_name;
        if(utils.validCompanyName(company_name) && utils.validPassword(password) && utils.validUsername(username)) {
            const db = req.app.locals.db;
            const company = await db.collection("companies").findOne({$or:[{"company_name":company_name},{"username":username}]});
            if (company) {
                //Company or username already exists
                res.send({"message":"Company Name or Username already exists"});
            } else {
                //Sign up the company
                var user = await db.collection("companies").insertOne({"company_name":company_name,"username":username,"password":utils.hashPassword(password)});
                if(user){
                    user = user.ops[0];
                    res.send(user);
                }else{
                    //Could not create user
                    res.send("error")//TODO throw better error
                }
            }
        }else{
            res.end();
        }
    }catch (e) {
        console.log(e);
        res.end();
    }
});
