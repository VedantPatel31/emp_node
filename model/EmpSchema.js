const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    salary: {
        type: Number
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    // address : {
    //     state : {
    //         type : String,
    //     },
    //     city : {
    //         type : String,
    //     },
    //     pincode : {
    //         type : String,
    //     }
    // },
    // status:{
    //     type : String,
    // },
    // bloodGroup : {
    //     type : String,
    // },
    joiningDate: {
        type: String
    },
    email: {
        type: String,
        // unique: true,
    },
    password: {
        type: String,
        // required : true
    }

})

module.exports = mongoose.model('employees1', EmpSchema);