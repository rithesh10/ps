const mongoose = require('mongoose')
const resultSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:['true','please add a name value']
    },
    rollno:{
        type:String,
        required:['true','please add a name value']
    },
    options:[
        {
            "Depression":Number,
            "Anxiety":Number,
            "Stress":Number,
            "date": {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{
    timestamps:true,
})

module.exports = mongoose.model('Result',resultSchema);