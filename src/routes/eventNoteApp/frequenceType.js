import express from 'express';
const router = express.Router();

import FrequenceType from '../../models/eventNoteApp/frequenceType.js'
import { sendResponse } from '../../utils/utils.js';
import { logError } from '../../services/logger/logger.js';
import { createFrequenceType } from '../../services/domain/eventNodeApp/frequenceTypeService.js';

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await FrequenceType.findById({id})
        if(!result){
            return sendResponse(res,404,"Not found any frequenceType with id:"+id,result);
        }
        return sendResponse(res,200,"fetch successfully",result);
    } catch (error){
        console.error('Error while fetching frequenceTypes:', error);
        return sendResponse(res, 500, 'Error while fetching frequenceType.', { error: error.message });
    }
})

router.post('/', async (req,res) => {
    const {type, description} = req.body;
    if(type || description) {
        return sendResponse(res,400, 'Type and description are required');
    }

    try {
        const newFrequenceType = await createFrequenceType(type)
    } catch(error){
        logError('Error while creating frequenceType', error.stack)
        if(error.code === 'DUPLICATE_TYPE'){
            return sendResponse(res,409, 'Frequence type already exists.',{error: error.message});
        }
        return sendResponse(res, 500, 'Error while creating frequenceType',{error: error.message});
    }
})



export default router;