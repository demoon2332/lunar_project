import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    username: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    displayName: String,
    role: {type: String, default: 'user'},
    email: { type: String, required: true, unique: true },
    phone: String,
    birthDay: Date, 
    password: {type: String, required: true},
    address: String,
    isActive: Boolean,
    createdAt: String
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', UserSchema)