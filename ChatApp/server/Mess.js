const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    
        name:{ type: "string"},
        message: {type:"string"},
        time: {type:"string"},
        cursor:{type: Boolean},
    
})

const Msg = mongoose.model('payload', msgSchema);
module.exports = Msg;