import express from 'express';
const router = express.Router();

import FrequenceType from '../../models/eventNoteApp/FrequenceType.js'

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await FrequenceType.findById({id})
        if(!result){
            return sendResponse(res,404,"Not found any frequenceType with id:"+id,result);
        }
        return sendResponse(res,200,"fetch successfully",result);
    } catch (error){
        console.error('Error initializing frequenceTypes:', error);
        return sendResponse(res, 500, 'Failed to initialize frequenceType sample data.', { error: error.message });
    }
})

export default router;