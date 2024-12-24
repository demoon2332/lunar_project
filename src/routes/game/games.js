import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GameRouter = express.Router();

GameRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    console.log("Here is the id:"+id);
    // Load JSON data from the file
    const questionDataPath = path.resolve(__dirname, "../../samples/game/questions.json");
    const infoDataPath = path.resolve(__dirname,"../../samples/game/information.json")
    const questionsJsonData = await readFile(questionDataPath, "utf8");
    const infoJsonData = await readFile(infoDataPath, "utf8");

    const questions = JSON.parse(questionsJsonData);
    const information = JSON.parse(infoJsonData);

    // Pass the JSON data to the template
    res.render("game/game", { 
      questions : JSON.stringify(questions),
      information: JSON.stringify(information)
    });
  } catch (error) {
    console.error("Error loading JSON data:", error);
    res.status(500).send("Error loading page data");
  }
});



export default GameRouter;
