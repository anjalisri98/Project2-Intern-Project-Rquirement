const { appendFile } = require("fs")
const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const mongoose = require("mongoose")


const isValid = function(value){
    if(typeof value === 'undefined' || value === 'null') return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidrequestBody = function(data){
    return Object.keys(data).length > 0
}


//=============================================**Post Api : To create college data**=============================================================//
let collegeData = async function (req, res) {
    try {
        let data = req.body
        if(!isValidrequestBody(data)){
            res.status(400).send({ status:false, message: "Invalid request parameters. Please provide college details"})
            return;
        }

        //Extract Params
        // const {name, fullName, logoLink }= data;    //object destructring

        //validations starts
        if(!isValid(data.name)){
            res.status(400).send({ status:false, message: "Name is required"})
            return;
        }
        if(!/^[a-z]+$/i.test(data.name)){
            res.status(400).send({ status:false, message: "Name should be in valid format"})
            return;
        }
        const isName = await collegeModel.findOne({name:data.name}); //{name:name} object shorthand property
        if(!isValid(data.fullName)){
            res.status(400).send({ status:false, message: "fullName is required"})
            return;
        }
        if(!/[a-zA-Z\s]\,[a-zA-Z\s]/.test(data.fullName)){
            res.status(400).send({ status:false, message: "fullName should be in valid format"})
            return;
        }

        if(!isValid(data.logoLink)){
            res.status(400).send({ status:false, message: "logolink is required"})
            return;
        }

        //validations ends
        // let colleges = {name, fullName, logoLink}
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
        if(!isValidrequestBody(data)){
            res.status(400).send({ status:false, message: "Invalid request parameters. Please provide intern details"})
            return;
        }

         //Extract Params
        //  const {name, email, mobile, collegeId }= data;    //object destructring

         //validations starts
         if(!isValid(data.name)){
             res.status(400).send({ status:false, message: "Name is required"})
             return;
            }
         if(!/^[a-z]+$/i.test(data.name)){
             res.status(400).send({ status:false, message: "Name should be in valid format"})
             return;
         }

         if(!isValid(data.email)){
            res.status(400).send({ status:false, message: "Name is required"})
            return;
        }
        const emailUsed = await internModel.findOne({email:data.email})
        if(emailUsed){
            res.status(400).send({status:false, message:"Email is already registered"})
        }

        if(!isValid(data.mobile)){
            res.status(400).send({ status:false, message: "Number is required"})
            return;
        }
        if(!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[0-9]\d{9}$/.test(data.mobile)){
            res.status(400).send({ status:false, message: "Mobile number should be in valid format"})
            return;
        }

        if(!isValid(data.collegeId)){
            res.status(400).send({ status: false, message: "collegeId is required "})
        }
        let id = data.collegeId
        let college =  await collegeModel.findById(id)
        if(!college){
            return res.status(404).send({status:false, message:" collegeId is not regestered"})
        }
        let result = await internModel.create(data)
        res.send({ status: true, msg: result })


    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }

}

module.exports = { collegeData, internData }