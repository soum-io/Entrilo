const express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const config = require('./config');
const utils = require('./utils');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'thequickbrownfoxjumpsoversomething', resave: true, saveUninitialized: false }));

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
        app.locals.db.collection("companies").findOne({"username":username}, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != utils.hashPassword(password)) { return cb(null, false); }
            return cb(null, {_id:user._id,company_name: user.company_name,username:user.username});
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, {_id:user._id,company_name: user.company_name,username:user.username});
});

passport.deserializeUser(function(user, cb) {
    app.locals.db.collection("companies").findOne({"_id":ObjectID(user._id)}, function (err, user) {
        if (err) { return cb(err); }
        cb(null, utils.parseOutPassword(user));
    });
});

app.get('/api/account',
    function(req, res) {
        res.send(utils.parseOutPassword(req.user));
    });

app.get('/api/login',
    function(req, res){
        res.send('login');
    });

app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
        res.status(200).send(req.user);
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
            var location = req.body.location;
            var latitude = req.body.latitude;
            var data = {};
            if(utils.validVenueName(name)){
                data['employee.$.name'] = name;
            }
            if(utils.validLocation(location)){
                data['employee.$.location'] = location;
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
                console.log(req.user._id);
                if (company) {
                    res.send(utils.parseOutPassword(company.value));
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
            var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$pull:{employee:{_id:ObjectID(employee_id)}}},{returnOriginal:false});
            if(company){
                res.send(utils.parseOutPassword(company.value));
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
            var location = req.body.location;
            if(utils.validName(name) && !isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude)) && utils.validAirlineClass(airline_class) && utils.validLocation(location)){
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$push:{employee:{name:name,airline_class:airline_class,longitude:longitude,location:location,latitude:latitude,_id:ObjectID()}}},{returnOriginal:false});
                if(company){
                    res.send(utils.parseOutPassword(company.value));
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
                res.send(utils.parseOutPassword(company.value));
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
            var location = req.body.location;
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
            if(utils.validLocation(location)){
                data['venue.$.location'] = location;
            }
            if(data != {}) {
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id: ObjectID(req.user._id),'venue._id':ObjectID(req.params.id)}, {
                    $set: data,
                }, {returnOriginal: false});
                if (company) {
                    res.send(utils.parseOutPassword(company.value));
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
            var location = req.body.location;
            if(utils.validVenueName(name) && !isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude)) && utils.validLocation(location)){
                const db = req.app.locals.db;
                var company = await db.collection("companies").findOneAndUpdate({_id:ObjectID(req.user._id)},{$push:{venue:{name:name,longitude:longitude,latitude:latitude,location:location,_id:ObjectID()}}},{returnOriginal:false});
                if(company){
                    res.send(utils.parseOutPassword(company.value));
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
                var user = await db.collection("companies").insertOne({"company_name":company_name,"employee":[],"venue":[],"username":username,"password":utils.hashPassword(password)});
                if(user){
                    user = user.ops[0];
                    res.send(utils.parseOutPassword(user));
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

app.get('/api/search', async (req, res) => {
    try {
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var peopleInputs = req.body.peopleInputs;
        var venueInputs = req.body.peopleInputs;

        var dest_set = Set();
        var src_dict = {};
        for(var i = 0; i < venueInputs.length; i++) {
            var dest_response = amadeus.referenceData.amadeus.referenceData.locations.airports.get({
                longitude : venueInputs[i].longitude,
                latitude  : venueInputs[i].latitude
            });
            dest_set.add(dest_response.data[0]['iataCode']);
        }

        for(var i = 0; i < peopleInputs.length; i++) {
            var src_response = amadeus.referenceData.amadeus.referenceData.locations.airports.get({
                longitude : peopleInputs[i].longitude,
                latitude  : peopleInputs[i].latitude
            });
            var airportCode = src_response.data[0]['iataCode'];
            if(airportCode in src_dict) {
                src_dict[airportCode] = src_dict[airportCode] + 1;
            }
            else {
                src_dict[airportCode] = 1;
            }
        }
        var endpoint_url = 'https://us-central1-hackathon-232619.cloudfunctions.net/pythonCall?';
        endpoint_url+=('departure_locations=' + src_dict);
        endpoint_url+=('meeting_options=' + dest_set);
        endpoint_url+=('departure_date' + startDate);

        //TODO: change this hardcoded url to 'endpoint_url' once python script is complete
        https.get('https://us-central1-hackathon-232619.cloudfunctions.net/pythonCall?message=HelloWorld', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log(JSON.parse(data));
            });
        }).on("error", (err) => {
            console.log("Error");
        });
        //TODO: parse and return requested info

    }catch (e) {
        console.log(e);
        res.end();
    }
});
