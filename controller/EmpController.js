const { json } = require('express');
const EmpSchema = require('../model/EmpSchema');
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const { log } = require('console');
const storage = multer.diskStorage({
    destination: './uploads/',

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    // fileFilter: function(req, file, cb){
    //     checkFileType(file, cb);
    // }
}).single("singlefile");

const uploadFile = (req, res) => {

    upload(req, res, async (err) => {

        // console.log(err);

        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            // res.status(200).json({
            //     message: "File uploaded successfully",
            //     filename: await req.file.originalname,
            // });
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
            try {
                const workbook = xlsx.readFile(`uploads/${file.filename}`);
                // console.log(workbook);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(sheet);

                const result = await EmpSchema.insertMany(data);
                if (result != null || result != undefined) {
                    res.status(200).json({
                        message: "success",
                        data: result
                    })
                } else {
                    res.status(500).json({
                        message: "error",
                    })
                }

            } catch (err) {
                console.error(err);
                return res.status(500).send('Error processing the Excel file.');
            }
            // const readFile = xlsx.readFile(`uploads/${file.filename}`);
            // console.log(readFile);
        }
    });
};
const getEmps = (req, res) => {
    EmpSchema.find().then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).jspn({
            message: "error",
            error: err
        })
    })
}


const getEmpsBySalary = (req, res) => {
    var sal1 = req.params.sal1;
    var sal2 = req.params.sal2;
    console.log(sal1);
    console.log(sal2);

    EmpSchema.find({ "salary": { $gt: sal1, $lt: sal2 } }).then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).jspn({
            message: "error",
            error: err
        })
    })
}

const addEmp = (req, res) => {
    const emp = new EmpSchema(req.body);
    console.log(emp);
    emp.save().then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    })
}

const addEmpArray = async (req, res) => {
    // const emp = new EmpSchema(req.body);
    console.log(req.body);
    try {
        const result = await EmpSchema.insertMany(req.body);
        if (result != null || result != undefined) {
            res.status(200).json({
                message: "success",
                data: result
            })
        } else {
            res.status(500).json({
                message: "error",
            })
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

module.exports = {
    getEmps,
    addEmp,
    getEmpsBySalary,
    addEmpArray,
    uploadFile
}