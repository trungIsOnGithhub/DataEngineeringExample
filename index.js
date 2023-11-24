const express = require("express");
const uploadControllers = require("./controllers/uploadController.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("views"));

app.get("/", (req, res) => {
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

app.get("/select", (req, res) => {
	res.render("index2");
});

app.get("/option", (req, res) => {
	res.render("index3");
});

app.post("/upload", uploadControllers);

app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});