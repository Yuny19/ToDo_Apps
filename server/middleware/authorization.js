const jwt = require('jsonwebtoken');

function authorization(req, res, next) {
        if (req.user.role == 'employee') {
            next();
        } else{
            return res.status(403).json({
                message: 'not authorized'
            })
        }
}

module.exports = authorization;