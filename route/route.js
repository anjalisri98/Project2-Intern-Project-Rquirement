const express = require('express');
const controller = require('../controller/controller')
const router = express.Router();

router.post("/functionup/colleges", controller.collegeData)
router.post("/functionup/interns", controller.internData)




module.exports = router;