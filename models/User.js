const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    lastUpdate: {
        type: Date
    },
    updateLog: [
        {
            type: String,
            default: ""
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)