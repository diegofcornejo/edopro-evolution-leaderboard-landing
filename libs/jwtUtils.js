// jwtUtils.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ISSUER = process.env.JWT_ISSUER;

function verifyJwt(req) {

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error('Forbidden');
  }
	
	// Verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER });
    return decoded;
  } catch (error) {
    throw new Error('Invalid token: ' + error.message);
  }
}

function generateJwt(payload) {
	const options = {
		// expiresIn: '1h',
		issuer: JWT_ISSUER,
	};
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = {verifyJwt, generateJwt};
