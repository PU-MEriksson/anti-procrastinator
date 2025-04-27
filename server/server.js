const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors());

// Endpoint with AI prompt
app.post("/api/generate-plan", async (req, res) => {
  const { task, when, moreInfo, detailslevel } = req.body;
  // Changed from uppgift, tidpunkt, ovrigInfo, detaljniva to match frontend variables

  const prompt = `
Du är en hjälpsam assistent som specialiserat dig på att hjälpa personer med exekutiva svårigheter att bryta ner uppgifter och motverka prokrastinering.

Användaren har skrivit in följande:
- Uppgift: ${task}
- När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
- Övrig information: ${moreInfo || "Ingen ytterligare info."}
- Önskad detaljnivå på nedbrytningen: ${detailslevel}

Gör så här baserat på användarens val:

Om användaren valt "Ett första steg":
1. Beskriv uppgiften tydligt och kortfattat.
2. Föreslå en naturlig "pivot-point", en lämplig övergångspunkt under dagen utifrån vald tid.
3. Ange endast ett första, minimalt steg (max 5 minuter).

Format:
Uppgift:
När:
Ditt första steg (max 5 min):

Om användaren valt "Flera steg":
1. Beskriv uppgiften tydligt och kortfattat.
2. Föreslå en naturlig "pivot-point" baserat på vald tid.
3. Bryt ned uppgiften i en kort punktlista (3–5 steg).

Format:
Uppgift:
När:
Handlingsplan:
1.
2.
osv.

Om användaren valt "I ännu fler detaljerade steg":
1. Beskriv uppgiften tydligt och kortfattat.
2. Föreslå en naturlig "pivot-point" baserat på vald tid.
3. Bryt ned uppgiften i en detaljerad punktlista (6–10 små steg).

Format:
Uppgift:
När:
Detaljerad handlingsplan:
1.
2.
3.
osv.
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fel vid generering av plan." });
  }
});

// Endpoint for editing the plan
// This endpoint is used to edit the generated plan based on user feedback
// It takes the original response and the edit text from the user
// and generates a new response based on the original plan and the user's request
app.post("/api/edit-plan", async (req, res) => {
  const { task, when, moreInfo, detailslevel, originalResponse, editText } =
    req.body;

  const systemPrompt = `
Du är en hjälpsam assistent som specialiserat dig på att hjälpa personer med exekutiva svårigheter att bryta ner uppgifter och motverka prokrastinering.
`;
  const userDetails = `
- Uppgift: ${task}
- När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
- Övrig information: ${moreInfo || "Ingen ytterligare info."}
- Önskad detaljnivå på nedbrytningen: ${detailslevel}
`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userDetails },
        { role: "assistant", content: originalResponse },
        {
          role: "user",
          content: `Användaren begär ändring: ${editText}. Anpassa planen baserat på detta och behåll samma format.`,
        },
      ],
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Edit-plan error:", error);
    res.status(500).json({ error: "Fel vid uppdatering av plan." });
  }
});

app.listen(3001, () => {
  console.log("Backend körs på port 3001");
});
