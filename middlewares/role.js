const rolesMap = require('../models/User.js').rolesMap;

function role(req, res, next) {
	if (!req.session || !req.session.cas_id) {
		res.render("400");
		return;
	}

    if (!rolesMap[req.session.cas_id]) {
        res.render("400");
    }

    req.locals = { role: rolesMap[req.session.cas_id] };

    next();
}

module.exports = role;