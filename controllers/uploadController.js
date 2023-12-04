const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
let userData = require('../models/User').userData;

const HTML_FORM_FIELDS_NAME = "filecontent";
const NEW_FILE_STATIC_PATH = __dirname.replace("controllers", "") + "storage" + path.sep;

const allowedMimeFileType = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "application/rtf"
]

function checkAllowedFileType(mimetype) {
    return allowedMimeFileType.includes(mimetype);
}

function renameFileAfterUpload(file) {
    const filepath = file[HTML_FORM_FIELDS_NAME][0]["filepath"];
    const newpath = NEW_FILE_STATIC_PATH + file[HTML_FORM_FIELDS_NAME][0]["newFilename"];

    try {
        fs.renameSync(filepath, newpath);
    } catch(error) {
        console.log("Error renaming files: " + error);
        return false;
    }

    return true;
}

async function upload(req, res) {
    let form = new formidable.IncomingForm({
        keepExtensions: true
      });
    // form.keepExtensions = true;

    form.encoding = 'utf-8';

    let viewData = 	{
        styleClass: "failed-upload-file",
        fileUploadMessage: "",
        canRedirectNextPage: false
    }

    try {
        let result =  await new Promise(function (resolve, reject) {
            form.parse(req, function(error, fields, file) {
                if (error) {
                    console.log("Error on file uploaded: " + JSON.stringify(error));
                    return reject(error);
                }

                if ( !checkAllowedFileType(file[HTML_FORM_FIELDS_NAME][0]["mimetype"]) ) {
                    return reject( {failedCode: 1} );
                }

                if ( !renameFileAfterUpload(file) ) {
                    return reject( {failedCode: 2} );
                }

                // console.log("--->" + );
                // console.log("+++>" + JSON.stringify(fields));

                if (!userData[req.session.cas_id]) {
                    userData[req.session.cas_id] = [];
                }
                userData[req.session.cas_id].push(JSON.parse(JSON.stringify(file)));

                console.log("file uploaded: " + fields);
                resolve(file);
            })
        });

        let fileName = result[HTML_FORM_FIELDS_NAME][0]["originalFilename"];

        if (fileName.length > 15) {
            fileName = fileName.substring(0, 16) + "...";
        }
    
        viewData.styleClass = "success-upload-file";
        viewData.fileUploadMessage = `Tải Lên Tập Tin ${fileName} Thành Công, Bạn Có Thể Bắt Đầu In`;
        viewData.canRedirectNextPage = true;
    } catch(error) {
        if (error.failedCode === 1) {
            viewData.fileUploadMessage = "Định dạng tệp tin không cho phép, Hãy Thử Lại";
        }
        else if (error.failedCode === 2) {
            viewData.fileUploadMessage = "Máy Chủ Không Thể Tiếp Nhận Tệp Tin!!";
        }
        else if (error.code === 1010) {
            viewData.fileUploadMessage = "Không Cho Phép Tệp Tin Rỗng, Hãy Thử Lại";
        }
        else {
            viewData.fileUploadMessage = "Lỗi Không Xác Định Khi Tải Tệp Tin!!";
        }
    }

    res.render("index", viewData);
}

module.exports = upload;