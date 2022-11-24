var jwt = require('jsonwebtoken');

function generateToken(user) {
    let details = {
        userId: user.id,
        name: user.name,
        username: user.username
    }
    
    return jwt.sign(details, 'ABCDEF$123', {
        expiresIn: 60 * 60 * 24 
      })
}

function userDetails(user) {
    if(!user) return;
    return {
        userId: user.id,
        name: user.name,
        username: user.username
    }
}

module.exports.generateToken = generateToken
module.exports.userDetails = userDetails