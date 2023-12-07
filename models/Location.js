const printers = [
    {
        stt: "1",
        mmi: "ABC-696986",
        ddmi: "phòng 114 - tòa H6 - ĐHBK",
        ttmi: "Đang Hoạt Động",
        lmi: "Laser 2 mặt"
    }
];

function name() {
    return printers.map(printer => printer.ddmi);
}

function addPrinter(printer) {
    printers.push(printer);
}

function removePrinter(sttprinter) {
    printers = printers.filter(printer => (!printer.stt || printer.stt !== sttprinter));
}

function editPrinter(sttprinter, newdata) {
    printers = printers.map(function(printer) {
        if (printer.stt && printer.stt === sttprinter) {
            return newdata
        }
        return printer;
    });
}

module.exports = {
    name,
    printers,
    addPrinter,
    removePrinter
}