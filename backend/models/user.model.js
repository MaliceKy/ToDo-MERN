import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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