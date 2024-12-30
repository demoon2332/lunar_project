import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { logInfo } from '../logger/logger';

// Helper to get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InitializationService {
    /**
     * Initializes data for a specified model.
     * @param {object} Model - The Mongoose model to initialize.
     * @param {string} sampleFilePath - The relative path to the sample data file (e.g., 'eventNoteApp/eventSampleData.json'). begin from folder samples/
     * @returns {Promise<object>} - Result with status and message.
     */
    static async initializeModel(Model, sampleFilePath) {
        // Validate if the passed model is a Mongoose model
        if (!mongoose.modelNames().includes(Model.modelName)) {
            throw new Error(`The provided model (${Model.modelName}) is not a valid Mongoose model.`);
        }

        const fullFilePath = path.join(__dirname, '../../samples', sampleFilePath);

        if (!fs.existsSync(fullFilePath)) {
            throw new Error(`Sample data file not found: ${fullFilePath}`);
        }

        const existingData = await Model.find({});
        const message = `${Model.modelName} collection already initialized.`;

        if (!existingData.length) {
            const sampleData = JSON.parse(fs.readFileSync(fullFilePath, 'utf-8'));
            await Model.insertMany(sampleData);

            message = `${Model.modelName} initialized successfully`;
            logInfo(message)
            return { status: 201, message: message };
        }

        message = `${Model.modelName} collection already initialized.`;
        return { status: 200, message: message, data: existingData };
    }

    /**
     * Initialize multiple models in sequence (FIFO).
     * @param {Array<{ model: mongoose.Model, pathSampleFile: string }>} models - Array of models with sample file paths.
     */
    static async initializeModelsInorder(models){
        for (const {model, pathSampleFile} of models){
            await this.initializeModel(model, pathSampleFile);
        }
    }
}

export default InitializationService;
