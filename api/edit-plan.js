const OpenAI = require("openai");
require("dotenv").config();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const { task, when, moreInfo, detailslevel } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `
Du är en expert på att hjälpa personer med exekutiva svårigheter. Använd en varm och stöttande ton. Svara inte som i en konversation. Anpassa och förbättra den befintliga planen baserat på användarens begäran, utan att ändra format eller lägga till inledning som "Absolut," eller liknande.
`;
  const userDetails = `
- Uppgift: ${task}
- När användaren vill börja: ${when || "Ingen tidpunkt angiven"}
- Övrig information: ${moreInfo || "Ingen ytterligare info."}
- Önskad detaljnivå på nedbrytningen: ${detailslevel}
`;

  // Call OpenAI API to generate the edited plan
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
    res.status(500).json({ error: "Fel vid generering av plan." });
  }
};
