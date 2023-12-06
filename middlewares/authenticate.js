const User = require('../models/User.js');

const usernamelist = ["Long Nguyen", "Trung Nguyen", "Tuan Nguyen"];

function authenticate(req, res, next) {
	if (!req.session || !req.session.cas_id) {
		res.render("sso");
		return;
	}

	req.session.username = usernamelist[Math.floor(Math.random()*(usernamelist.length-1)) + 1]

    next();
}

module.exports = authenticate;