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
        // valid email, 
        unique: true,
        trim:true,
        validate:{
            validator: function(email){
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
            }, message:'Please fill a valid email address'
        }
    },
    mobile: {
        type:Number,
        required: 'Mobile number is required',
        // valid mobile number, 
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

module.exports = mongoose.model("inter", internSchema)