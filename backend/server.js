const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors());

// Enkel endpoint för AI
app.post("/api/generate", async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userPrompt }],
      model: "gpt-3.5-turbo", // Valfri modell
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating response" });
  }
});

// Servern lyssnar på port 3001
app.listen(3001, () => {
  console.log("Express backend is running on port 3001");
});
