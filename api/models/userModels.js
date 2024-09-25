import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://e7.pngegg.com/pngimages/425/74/png-clipart-computer-icons-user-login-icon-design-media-area-user.png',
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User;