const User = require('../models/User.js');

function authenticate(req, res, next) {
	if (!req.session || !req.session.cas_id) {
		res.render("sso");
		return;
	}

    next();
}

module.exports = authenticate;