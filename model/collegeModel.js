const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {                                      //example iith
        type: String,
        unique: true,
        required: 'College name is required',
        trim: true
    },
    fullName: {                               //`Indian Institute of Technology, Hyderabad`
        type: String,
        require: 'Fullname is required',
        trim: true
    },
    logoLink: {
        type: String,
        required: 'Logoling is required',
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('college', collegeSchema)
