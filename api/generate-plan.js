import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const { task, when, moreInfo, detailslevel } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });
    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Fel vid generering av plan.", details: err.message });
  }
};
