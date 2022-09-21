const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
});

const EmployeeModel = mongoose.model("employee",EmployeeSchema);

module.exports = EmployeeModel;