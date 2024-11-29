import express from "express";
const FormRouter = express.Router();
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();


// model

// another

// routes



// Utility function to hash an answer
function hashAnswer(answer) {
    return crypto.createHash('sha256').update(answer).digest('hex');
}

// Utility function to validate answers
function isAnswerCorrect(givenAnswer, hashedCorrectAnswer) {
    const hashedGivenAnswer = crypto.createHash('sha256').update(givenAnswer).digest('hex');
    return hashedGivenAnswer === hashedCorrectAnswer;
}

import path from 'path';
import fs from 'fs/promises';
const rootPath = process.cwd();

// Get the directory of the main entry point

// Function to fetch a file by combining a given relative path with the root path
async function fetchJsonFile(relativePath) {
    try {
        // Combine the main file directory with the relative path
        const filePath = path.join(rootPath, relativePath);

        // Read the file asynchronously
        const fileContent = await fs.readFile(filePath, 'utf8');
        console.log("JSON")
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

// Example usage: Read "/sample/game/questions.json"
//fetchFile('sample/game/questions.json');


FormRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    
    // Access the environment variable 'FORM1'
    if (id === process.env.FORM1_ID) {
      res.render("game/game");
    } else {
      res.render("error.hbs");
    }
});

FormRouter.post('/', async (req, res, next) => {
  const {answers,formId} = req.body;
  console.log("POST FORM")
  console.log(answers)
  if(formId == process.env.FORM1_ID){
    const json = fetchJsonFile(process.env.FORM1_PATH)
    console.log("JSON HERE")
    console.log(json)
  }

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ code: 1, message: "Invalid answers format" });
}

  return res.json({ code: 0, message: 'POST FORM done' });
});

export default FormRouter;
