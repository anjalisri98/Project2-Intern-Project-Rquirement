const express = require('express');
const controller = require('../controller/controller')
const router = express.Router();

//api for creation of colleges
router.post("/functionup/colleges", controller.collegeData)

//api for creation of interns 
router.post("/functionup/interns", controller.internData)

//api for fetching all interns data with particular collegeId
router.get("/functionup/collegeDetails", controller.collegeDetails)




module.exports = router;