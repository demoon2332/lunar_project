

export const sendResponse = (res, code, message, data = null) =>{
    return res.json({code, message, data});
}

