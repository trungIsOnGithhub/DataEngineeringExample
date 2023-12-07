let userData = require('../models/User').userData;
let printer = require('../models/Location');
const locationPrinterName = require('../models/Location').name;

function get(req, res) {
    if (!req.locals || req.locals.role !== "officer") {
        res.render("400");
        return;
    }
    res.json({printers: printer.printers}); 
}

function add(req, res) {
    if (!req.locals || req.locals.role !== "officer") {
        res.render("400");
        return;
    }

    if ( !req.body || !req.body.mmi) {
         res.render("400");
         return;
    }

    printer.addPrinter(req.body);

    res.json({msg: "OK"});
}

function remove(req, res) {
    if (!req.locals || req.locals.role !== "officer") {
        res.render("400");
        return;
    }

    if ( !req.params.stt ) {
         res.render("400");
         return;
    }

    printer.removePrinter(req.params.stt);

    res.json({msg: "OK"});
}

function edit(req, res) {
    if (!req.locals || req.locals.role !== "officer") {
        res.render("400");
        return;
    }

    if ( !req.body || !req.body.mmi || req.params.stt) {
         res.render("400");
         return;
    }

    printer.editPrinter(req.params.stt, req.body);

    res.json({msg: "OK"});
}

module.exports = {
    add,
    remove,
    edit,
    get
}