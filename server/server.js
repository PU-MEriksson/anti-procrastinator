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
Pivot-point:
Ditt första steg (max 5 min):

Om användaren valt "Flera steg":
1. Beskriv uppgiften tydligt och kortfattat.
2. Föreslå en naturlig "pivot-point" baserat på vald tid.
3. Bryt ned uppgiften i en kort punktlista (3–5 steg).

Format:
Uppgift:
Pivot-point:
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
Pivot-point:
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

app.listen(3001, () => {
  console.log("Backend körs på port 3001");
});
