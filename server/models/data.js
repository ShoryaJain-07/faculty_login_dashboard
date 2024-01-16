const mongoose=require("mongoose")

const DataSchema = new mongoose.Schema({
    facultyId:{type:String},
    achievements:{type:[String]},
    awards:{type:[String]},
    certificates:{type:[String]}
})

const DataModel = mongoose.model("facultyData",DataSchema)
module.exports = DataModel