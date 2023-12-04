let userData = require('../models/User').userData;

async function select(req, res) {
    // console.log(JSON.stringify(req.session));
    // console.log());

    if (!userData[req.session.cas_id] || !userData[req.session.cas_id].length ||
        !userData[req.session.cas_id].slice(-1)[0].filecontent ) {
		res.json({status: 400, msg: 'Bad Request'});
		return;
    }

    const userUploadRecord = userData[req.session.cas_id].slice(-1)[0].filecontent[0];

    console.log(JSON.stringify(userUploadRecord));

    const viewData = {
        validUser: true,
        newName: userUploadRecord.newFilename,
        originalName: userUploadRecord.originalFilename
    };

    res.render("select", viewData);
}

module.exports = select;