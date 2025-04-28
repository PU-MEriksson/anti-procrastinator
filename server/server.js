const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(cors());

// New improved endpoint for the frontend
app.post("/api/generate-plan", async (req, res) => {
  const { task, when, moreInfo, detailslevel } = req.body;

  // First, prepare the "internal thinking" system prompt
  const systemPrompt = `
  Du är en expert på att hjälpa personer med exekutiva svårigheter att komma igång med vardagliga uppgifter.
  
  Följ dessa instruktioner innan du svarar:
  - Dela upp uppgiften i flera möjliga små första steg.
  - Utvärdera vilket av dessa steg som är ABSOLUT enklast och snabbast (helst 1–2 minuter max).
  - Bestäm en tydlig tidpunkt och plats för när och var första steget kan göras.
  - Prioritera fysiska handlingar (gå till rätt plats, ta fram något, öppna något, skriva något).
  - Anpassa stegen efter användarens valda starttid ("pivot-point") och eventuell extra information.
  
  Om användaren valt "Flera steg" eller "I ännu fler detaljerade steg":
  - Bryt ner uppgiften i en sekvens av små steg (3–5 respektive 6–10 steg).
  - Varje steg ska ta max 2–5 minuter och kännas lätt att påbörja.
  
  Om användaren skriver att uppgiften känns svår eller jobbig:
  - Gör stegen ännu mindre och lättare.
  - Använd en varm och stöttande ton. Uppmuntra små framsteg.
  - Exempel: "Det räcker att börja så här!", "Bra jobbat om du kommer så långt!"
  
  Om tiden är vag ("ikväll", "senare"):
  - Föreslå en konkret tidpunkt baserat på typiska rutiner.
  
  Målet är att användaren ska känna: "Det här kan jag börja med direkt, utan att känna mig överväldigad."
  `;

  // Then, prepare the user-facing generation prompt
  const userPrompt = `
  Använd följande information från användaren:
  - Uppgift: ${task}
  - När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
  - Övrig information: ${moreInfo || "Ingen ytterligare info."}
  - Önskad detaljnivå på nedbrytningen: ${detailslevel}
  
  Så här ska du svara:
  
  1. Börja med en inledning där du beskriver uppgift, tidpunkt och plats i samma mening.
     Exempel: "Efter middagen (~19:00), när du är i badrummet, kan du börja så här:"
  
  2. Fortsätt med små och enkla steg i punktform (beroende på detaljnivå):
     - Om användaren valt "Ett första steg": bara ett enda, mycket litet steg (max 2 minuter).
     - Om användaren valt "Flera steg": 3–5 små steg.
     - Om användaren valt "I ännu fler detaljerade steg": 6–10 mycket små steg.
  
  3. Anpassa stegen utifrån eventuell extra information:
     - Om uppgiften känns svår eller jobbig: gör stegen ännu mindre, och var extra stöttande.
  
  4. Använd en varm och uppmuntrande ton i hela svaret.
  
  5. Avsluta planen med en kort, snäll påminnelse, till exempel:
     "Kom ihåg: Du behöver bara ta ett steg i taget. Var stolt över att du är igång!"
  
  Format:
  
  [inledande mening med tid och plats]
  
  1. [Första lilla steget]
  2. [Nästa lilla steg]
  osv.
  
  [Avslutande pepp]
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt }, // Step 1: Internal thinking
        { role: "user", content: userPrompt }, // Step 2: User-facing generation
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fel vid generering av plan." });
  }
});

// Endpoint for AI prompt
// app.post("/api/generate-plan", async (req, res) => {
//   const { task, when, moreInfo, detailslevel } = req.body;
// Changed from uppgift, tidpunkt, ovrigInfo, detaljniva to match frontend variables

//   const prompt = `
// Du är en hjälpsam assistent som specialiserat dig på att hjälpa personer med exekutiva svårigheter att bryta ner uppgifter och motverka prokrastinering.

// Användaren har skrivit in följande:
// - Uppgift: ${task}
// - När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
// - Övrig information: ${moreInfo || "Ingen ytterligare info."}
// - Önskad detaljnivå på nedbrytningen: ${detailslevel}

// Gör så här baserat på användarens val:

// Om användaren valt "Ett första steg":
// 1. Beskriv uppgiften tydligt och kortfattat.
// 2. Föreslå en naturlig "pivot-point", en lämplig övergångspunkt under dagen utifrån vald tid.
// 3. Ange endast ett första, minimalt steg (max 5 minuter).

// Format:
// Uppgift:
// När:
// Ditt första steg (max 5 min):

// Om användaren valt "Flera steg":
// 1. Beskriv uppgiften tydligt och kortfattat.
// 2. Föreslå en naturlig "pivot-point" baserat på vald tid.
// 3. Bryt ned uppgiften i en kort punktlista (3–5 steg).

// Format:
// Uppgift:
// När:
// Handlingsplan:
// 1.
// 2.
// osv.

// Om användaren valt "I ännu fler detaljerade steg":
// 1. Beskriv uppgiften tydligt och kortfattat.
// 2. Föreslå en naturlig "pivot-point" baserat på vald tid.
// 3. Bryt ned uppgiften i en detaljerad punktlista (6–10 små steg).

// Format:
// Uppgift:
// När:
// Detaljerad handlingsplan:
// 1.
// 2.
// 3.
// osv.
// `;

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "gpt-3.5-turbo",
//     });

//     res.json({ response: completion.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Fel vid generering av plan." });
//   }
// });

// Endpoint for editing the plan
// This endpoint is used to edit the generated plan based on user feedback
// It takes the original response and the edit text from the user
// and generates a new response based on the original plan and the user's request
app.post("/api/edit-plan", async (req, res) => {
  const { task, when, moreInfo, detailslevel, originalResponse, editText } =
    req.body;

  const systemPrompt = `
Du är en expert på att hjälpa personer med exekutiva svårigheter. Använd en varm och stöttande ton. Svara inte som i en konversation. Anpassa och förbättra den befintliga planen baserat på användarens begäran, utan att ändra format eller lägga till inledning som "Absolut," eller liknande.
`;
  const userDetails = `
- Uppgift: ${task}
- När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
- Övrig information: ${moreInfo || "Ingen ytterligare info."}
- Önskad detaljnivå på nedbrytningen: ${detailslevel}
`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userDetails },
        { role: "assistant", content: originalResponse },
        {
          role: "user",
          content: `Anpassa den befintliga planen baserat på denna ändring från användaren: "${editText}". Behåll samma struktur och stil som i originalsvaret. Ingen konversationsstil.`,
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
