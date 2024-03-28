const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"please add the user"]
    },
    phone: {
        type: String,
        required: [true, "please add the phone no"], 
        unique: [true, "Phoine already expist"]
    },
    password: {
        type: String,
        required: [true, "please add the user password"]
    },

}, 
   {
        timeStamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);