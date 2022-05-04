const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const mongoose = require("mongoose")


const isValid = function (value) {
    if (typeof value === 'undefined' || value === 'null') return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidrequestBody = function (data) {
    return Object.keys(data).length > 0
}


//=============================================**Post Api : To create college data**=============================================================//
let collegeData = async function (req, res) {
    try {
        let data = req.body
        if (!isValidrequestBody(data)) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide college details" })
            return;
        }

        if (!isValid(data.name)) {
            res.status(400).send({ status: false, message: "Name is required" })
            return;
        }
        if (!/^[a-z]+$/i.test(data.name)) {
            res.status(400).send({ status: false, message: "Name should be in valid format" })
            return;
        }
        const isName = await collegeModel.findOne({ name: data.name }); 

        if(isName){
            res.status(400).send({ status:false, message: "College name already exists"})
        }
        if (!isValid(data.fullName)) {
            res.status(400).send({ status: false, message: "fullName is required" })
            return;
        }
        if (!/[a-zA-Z\s]\,[a-zA-Z\s]/.test(data.fullName)) {
            res.status(400).send({ status: false, message: "fullName should be in valid format" })
            return;
        }

        if (!isValid(data.logoLink)) {
            res.status(400).send({ status: false, message: "logolink is required" })
            return;
        }

        //validations ends
        
        let result = await collegeModel.create(data)
        res.send({ status: true, msg: result })


    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }

}


//================================================**Post Api : To create intern data**===========================================================//
let internData = async function (req, res) {
    try {
        let data = req.body
        if (!isValidrequestBody(data)) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" })
            return;
        }


        //validations starts
        if (!isValid(data.name)) {
            res.status(400).send({ status: false, message: "Name is required" })
            return;
        }
        if (!/^[a-z]+$/i.test(data.name)) {
            res.status(400).send({ status: false, message: "Name should be in valid format" })
            return;
        }

        if (!isValid(data.email)) {
            res.status(400).send({ status: false, message: "email is required" })
            return;
        }
        const emailUsed = await internModel.findOne({ email: data.email })
        if (emailUsed) {
            res.status(400).send({ status: false, message: "Email is already registered" })
        }

        if (!isValid(data.mobile)) {
            res.status(400).send({ status: false, message: "Number is required" })
            return;
        }
        if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[0-9]\d{9}$/.test(data.mobile)) {
            res.status(400).send({ status: false, message: "Mobile number should be in valid format" })
            return;
        }

        if (!isValid(data.collegeId)) {
            res.status(400).send({ status: false, message: "collegeId is required " })
        }
        let id = data.collegeId
        let college = await collegeModel.findById(id)
        if (!college) {
            return res.status(404).send({ status: false, message: " collegeId is not regestered" })
        }
        let result = await internModel.create(data)
        res.send({ status: true, msg: result })


    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }

}


//=====================================================**Get Api : To get data of interns**======================================================//

let collegeDetails = async function (req, res) {
    try {
        let query = req.query.name
        if (!query) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" })
            return;
        }
        if (!query.match(/^[a-z]+$/i)) {
            res.status(400).send({ status: false, message: "Name should be in valid format" })
            return;
        }
        let specificCollege = await collegeModel.findOne({ name: query })
        if (!specificCollege) {
            res.status(400).send({ status: true, message: "No college exists with that name" })
        }

        let id = specificCollege._id.toString()
        let intern = await internModel.find({ collegeId: id })

        let data = {
            name: specificCollege.name,
            fullName: specificCollege.fullName,
            logoLink: specificCollege.logoLink,
            interests: intern
        }
        res.status(200).send({ status: true, msg: data })
    } catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }
}
module.exports = { collegeData, internData, collegeDetails }