import express from 'express';

//sub-routers
import eventRouter from './event.js';
import eventTypeRouter from './eventType.js';
import eventFrequenceTypeRouter from './frequenceType.js';

//services
import InitializationService from '../../services/mongoDatabaseService/initializationService.js';

//models
import { sendResponse } from '../../utils/utils.js';
import { logError } from '../../services/logger/logger.js';
import EventType from '../../models/eventNoteApp/eventType.js';
import FrequenceType from '../../models/eventNoteApp/frequenceType.js';
import Event from '../../models/eventNoteApp/event.js';

const router = express.Router();

const directory = "eventNoteApp";

router.get('/', function(req,res,next){
    res.render('eventNoteApp/index')
})

router.use('/event', eventRouter);
router.use('/eventType',eventTypeRouter);
router.use('/frequenceType',eventFrequenceTypeRouter);


router.get('/', function (req, res, next) {
    res.render('eventNoteApp/index');
  });
router.get('/init',  async (req,res,next) =>{
    try {
        const models = [
            {model: EventType, pathSampleFile: directory+"/eventTypeSampleData.json"},
            {model: FrequenceType, pathSampleFile: directory+"/frequenceTypeSampleData.json"},
            {model: Event, pathSampleFile: directory+"/eventSampleData.json"}
        ]
        await InitializationService.initializeModelsInorder(models);
        
        return sendResponse(res, 200, 'All models initialized successfully.');
    }catch(error){
        logError(error.message, error.stack);
        return sendResponse(res, 500, 'Failed to initialize eventNodeApp models',{error: error.message})
    }
})

export default router;