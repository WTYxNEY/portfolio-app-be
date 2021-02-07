const jwt = require('jsonwebtoken');

const secret = 'wty';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData.id;
        } else { 
            // google auth
            decodedData = jwt.decode(token);

            req.userId = decodedData.sub; //sub is id for google
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth