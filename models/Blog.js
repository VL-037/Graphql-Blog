const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Blog', BlogSchema)