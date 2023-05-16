const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const moduleschema = new Schema({
    number : {type : Number,require: true},
    name : {type : String,require: true},
    code: { type: String, required: true },
    tmark:{type : Number,require: true},
    Datet: { type: Date, required: true },
    uploader: { type: String, required: true }

})

const Module = mongoose.model("Modules",moduleschema);
module.exports = Module;