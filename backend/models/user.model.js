import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    todos: {
        type: [String],
        default: []
    }
},
{
    timestamps: true, // keeps created and updated values
});

// Comparse plain text password
userSchema.methods.matchPassword = function (enteredPassword) {
    return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);

export default User;