const jwt = require('jsonwebtoken');
var generrateJWT = function(data, privatekey, expiresIn){
    return new Promise((resolve, reject) => {
        jwt.sign(data, privatekey, {expiresIn}, function(err, token){
            if(err){
                return reject(err);
            }
            resolve(token)
        })
    })
}
var verifyJWT = function(token, privatekey){
    return new Promise((resolve, reject) => {
        jwt.verify(token, privatekey, function(err, decode){
            if(err){
                return reject(err);
            }
            resolve(decode)
        })
    })
}
module.exports = {
    generrateJWT,
    verifyJWT
}