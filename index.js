const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const authenticate = require('./middlewares/authenticate.js');
const uploadControllers = require("./controllers/uploadController.js");
const selectControllers = require("./controllers/selectController.js");

const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;
const dirname = "views";

const app = express();

app.set("view engine", "ejs");

app.use(express.static(dirname));

app.use(express.static("storage"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: {
		maxAge: oneDay,
		sameSite: 'lax',
		secure: false,
		httpOnly: false
	},
    resave: false
}));

app.use(cookieParser());

app.post('/cas', (req, res) => {
	if (!req.body || !req.body.password
		|| !req.body.username) {
		res.json({status: 400, msg: 'Bad Request'});
		return;
	}

	req.session.cas_id = req.body.username;

	res.redirect("/" + (req.query.service? req.query.service: ""));
})

app.get("/",  authenticate, (req, res) => {
	console.log(JSON.stringify(req.session));

	res.render("index",
		{
			styleClass: "",
			fileUploadMessage: "",
			canRedirectNextPage: false
		}
	);
});

app.get("/home", (req, res) => {
	res.render("index1");
});

app.get("/select", authenticate, selectControllers);

app.get("/option", authenticate, (req, res) => {
	res.render("index3");
});

app.post("/upload",  authenticate, uploadControllers);

app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});