const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hobbies: [
        {
            hobby1: {
                type: String,
            },
            hobby2: {
                type: String,
            },
            hobby3: {
                type: String,
            },
            hobby4: {
                type: String,
            },
            hobby5: {
                type: String,
            },
        }
    ]
})

const User = mongoose.model("user", userSchema)

module.exports = User;