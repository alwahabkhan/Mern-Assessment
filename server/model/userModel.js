import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    addresses: [
        {
            addressline1: {
                type: String,
            },
            addressline2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            }
        }],
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
})

const userModel = mongoose.model('User', userSchema);;

export default userModel;