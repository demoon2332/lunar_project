import express from 'express';
const router = express.Router();

// models
import Event from '../../models/eventNoteApp/event.js'
import { sendResponse } from '../../utils/utils.js';

//sample data


router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await Event.findById({id})
        if(!result){
            return sendResponse(res,404,"Not found any event with id:"+id,result);
        }
        return sendResponse(res,200,"fetch successfully",result);
    } catch (error){
        console.error('Error while fetching events:', error);
        return sendResponse(res, 500, 'Error while fetching events.', { error: error.message });
    }
})

export default router;