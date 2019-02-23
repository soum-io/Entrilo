var crypto = require('crypto');


module.exports.validUsername = function (username) {
    return true;//TODO
};

module.exports.validAirlineClass = function(airline_class){
    return true;//TODO
};

module.exports.validVenueName = function(venue){
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