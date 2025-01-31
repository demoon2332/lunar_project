import FrequenceType from "../../../models/eventNoteApp/frequenceType.js"

/**
 * Create a new frequency type
 * @param {string} type - The unique identifier for the frequency type.
 * @param {string} description - A description of the frequency type.
 * @returns {Promise<Object>} - The newly created frequency type.
 */
const createFrequenceType = async (type) => {
    const existingType = await FrequenceType.findOne({name: type});
    if(existingType){
        const error = new Error('Frequence type already exist');
        error.code = 'DUPLICATE_TYPE';
        throw error;
    }

    const newType = new FrequenceType({type});
    return await newType.save();
}

/**
 * Update an existing frequency type.
 * @param {string} type - The unique identifier for the frequency type to update.
 * @param {Object} updateData - The data to update (e.g., description).
 * @returns {Promise<Object>} - The updated frequency type.
 */
const updateFrequenceType = async (type, updateData) =>{
    const updatedType = await FrequenceType.findOneAndUpdate(
        {type},
        updateData,
        {new: true} // set it to true so that it return the document
    );

    if(!updatedType) {
        const error = new Error('Frequence type not found');
        error.code = 'NOT_FOUND';
        throw error;
    }

    return updatedType;
}

/**
 * Remove an existing frequency type.
 * @param {string} type - The unique identifier for the frequency type to remove.
 * @returns {Promise<Object>} - The removed frequency type.
 */

const removeFrequencyType = async (type) => {
    // Find and delete the frequency type
    const removedType = await FrequenceType.findOneAndDelete({ type });
  
    if (!removedType) {
      const error = new Error('Frequency type not found.');
      error.code = 'NOT_FOUND';
      throw error;
    }
  
    return removedType;
  };
  

export {createFrequenceType, updateFrequenceType, removeFrequencyType};

