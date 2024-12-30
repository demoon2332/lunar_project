import mongoose from 'mongoose';

const EventTypeSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
})

export default mongoose.model('EventType', EventTypeSchema);
