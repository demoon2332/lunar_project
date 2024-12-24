import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    form_id: {
        type: String,
        unique: true,
    },
    creator_id: String,
    attemp: Number,
    createdAt: String
});

export default mongoose.model('Form', CartSchema);
