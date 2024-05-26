const express = require("express");
const router = express.Router();
const empController = require("../controller/EmpController");
// router.get('/employees',empController.getEmps);
// router.post('/employees',empController.addEmp);
// router.get('/employees/:sal1/:sal2',empController.getEmpsBySalary);
// router.post('/employees',empController.addEmpArray);
router.post('/upload',empController.uploadFile);

module.exports = router;