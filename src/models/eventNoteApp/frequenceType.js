import mongoose from 'mongoose';

const FrequenceTypeSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
})

export default mongoose.model('FrequenceType', FrequenceTypeSchema);