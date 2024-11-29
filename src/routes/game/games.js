import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GameRouter = express.Router();

GameRouter.get("/", async (req, res) => {
  try {
    // Load JSON data from the file
    const dataPath = path.resolve(__dirname, "../../samples/game/questions.json");
    const jsonData = await readFile(dataPath, "utf8");
    const questions = JSON.parse(jsonData);

    // Pass the JSON data to the template
    res.render("game/game", { questions : JSON.stringify(questions)});
  } catch (error) {
    console.error("Error loading JSON data:", error);
    res.status(500).send("Error loading page data");
  }
});

export default GameRouter;
