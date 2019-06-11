var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var dotenv = require('dotenv');

dotenv.config();

var authCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${process.env.JWKSURI}`,
	}),
	audience: `${process.env.AUDIENCE}`,
	issuer: `${process.env.ISSUER}`,
	algorithms: ['RS256'],
});

module.exports = authCheck;
