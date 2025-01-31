import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
    startDate: Date,
    endDate: Date,
    title: String,
    description: String,
    priority: Number,
    needEmailNotify: Boolean,
    frequenceTypeId: { type: Number , required: true },
    eventTypeId: { type: Number, required: true },
});

export default mongoose.model('Event', EventSchema);
