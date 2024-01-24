const mongoose = require('mongoose')
const suggestionSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Name is compulsory']
    },
    suggestion:[
        {
            type: String,
        }
    ],
    id:{type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User',
    }

    
})

module.exports = mongoose.model('Suggestion',suggestionSchema);