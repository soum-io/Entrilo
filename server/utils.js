var crypto = require('crypto');


module.exports.parseOutPassword = function(company){

    if(company != undefined && company['password'] != null){
        delete company['password'];
    }
    return company;
}

module.exports.validUsername = function (username) {
    return true;//TODO
};

module.exports.validAirlineClass = function(airline_class){
    if(airline_class == "0" || airline_class == "1" || airline_class == "2") {
        return true;
    }
    return false;
};

module.exports.validVenueName = function(venue){
    return true;//TODO
};

module.exports.validLocation = function(location){
    return true;//TODO
};

module.exports.validName = function(name){
    return true;//TODO
};

module.exports.validCompanyName = function (company_name) {
    return true;//TODO
};

module.exports.validPassword = function (password) {
    return true;//TODO
};

module.exports.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex');
};