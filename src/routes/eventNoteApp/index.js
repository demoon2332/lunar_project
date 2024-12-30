import express from 'express';

//sub-routers
import eventRouter from './event.js';
import eventTypeRouter from './eventType.js';
import eventFrequenceTypeRouter from './frequenceType.js';

//services
import InitializationService from '../../services/eventNoteAppService/initializationService.js';

//models
import { sendResponse } from '../../share/utils.js';
import { logError } from '../../services/logger/logger.js';

const router = express.Router();



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
            {model: EventType, pathSampleFile: "eventTypeSampleData.json"},
            {model: FrequenceType, pathSampleFile: "frequenceTypeSampleData.json"},
            {model: Event, pathSampleFile: "eventSampleData.json"}
        ]
        await InitializationService.initializeModelsInorder(models);
        
        return sendResponse(res, 200, 'All models initialized successfully.');
    }catch(error){
        logError(error.message, error.stack);
        return sendResponse(res, 500, 'Failed to initialize models',{error: error.message})
    }
})

export default router;