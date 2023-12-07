const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const authenticate = require('./middlewares/authenticate.js');
const role = require('./middlewares/role.js');
const uploadControllers = require("./controllers/uploadController.js");
const selectControllers = require("./controllers/selectController.js");
const optionControllers = require("./controllers/optionController.js");
const printerControllers = require("./controllers/printerController.js");
const rolesMap = require('./models/User.js').rolesMap;
const getRoleByUsername = require('./models/User.js').getRoleByUsername;
const printers = require('./models/Location.js').printers;

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
		res.render("400");
		return;
	}

	req.session.cas_id = req.body.username;

	rolesMap[req.session.cas_id] = getRoleByUsername(req.body.username);

	res.redirect("/");
})

app.get("/",  authenticate, role, (req, res) => {
	console.log(JSON.stringify(req.session));
	
	if (res.locals && req.locals.role === "officer") {
		res.render("spso", {
			username: "Trung Nguyen",
			printers: printers
		});
		return;
	}

	res.render("index",
		{
			styleClass: "",
			fileUploadMessage: "",
			canRedirectNextPage: false,
			username: "Trung Nguyen"
		}
	);
});

app.get("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy();
		req.session = undefined;
	}
	res.render("sso");
});

app.get("/home", role, (req, res) => {
	res.render("home",
		{
			username: req.session.username
		}
	);
});

app.get("/success", authenticate,  role, (req, res) => {
	res.render("success",
		{
			username: req.session.username
		}
	);
});

app.get("/success", authenticate,  role, (req, res) => {
	res.render("success",
		{
			username: req.session.username
		}
	);
});

app.get("/history", authenticate,  role, (req, res) => {
	res.render("history",
		{
			username: req.session.username
		}
	);
});

app.get("/select", authenticate, role, selectControllers);

app.get("/option", authenticate, role, optionControllers);

app.post("/upload",  authenticate, role, uploadControllers);

app.get("/printer/", authenticate, role, printerControllers.get);

app.post("/printer/", authenticate, role,  printerControllers.add);

app.delete("/printer/:stt", authenticate, role, printerControllers.remove);

app.put("/printer/:stt", authenticate, role, printerControllers.edit);

app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});