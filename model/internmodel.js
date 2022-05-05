const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Intern name is required',
        trim:true
    },
    email: {
        type:String,
        required: 'Email is required',
        unique: true,
        trim:true,
        validate:{                                       // valid email,
            validator: function(email){
                return /^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email)
            }, message:'Please fill a valid email address'
        }
    },
    mobile: {
        type:Number,
        required: 'Mobile number is required',
        unique: true,
        trim:true
    },
    collegeId: {
        type: ObjectId,
        ref: "college",
        required:'CollegeId is required',
        trim:true
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("intern", internSchema)