import express from 'express';
const router = express.Router();

// models
import EventType from '../../models/eventNoteApp/eventType.js'

//sample data

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await EventType.findById({id})
        if(!result){
            return sendResponse(res,404,"Not found any event type with id:"+id,result);
        }
        return sendResponse(res,200,"fetch successfully",result);
    } catch (error){
        console.error('Error initializing eventTypes:', error);
        return sendResponse(res, 500, 'Error while fetching eventTypes.', { error: error.message });
    }
})

export default router;