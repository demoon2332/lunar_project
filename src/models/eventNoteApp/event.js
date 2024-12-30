import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    startDate: Date,
    endDate: date,
    title: String,
    description: String,
    priority: Number,
    frequenceType: Number,
    needEmailNotify: Boolean,
    frequenceTypeId: { type: Schema.Types.ObjectId, ref: 'FrequenceType', required: true },
    eventTypeId: { type: Schema.Types.ObjectId, ref: 'EventType', required: true },
})

export default mongoose.model('Event', EventSchema);