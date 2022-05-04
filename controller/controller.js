const collegeModel = require("../model/collegeModel")
const intenModel = require("../model/internmodel")


let collegeData = async function (req, res) {
    try {
        let data = req.body
        let result = await collegeModel.create(data)
        res.send({status:true, msg: data})


    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }

}

let internData = async function (req, res) {
    try {
        let data = req.body
        let result = await internModel.create(data)
        res.send({status:true, msg: data})


    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }

}

module.exports={collegeData,internData}