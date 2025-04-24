import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3001/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Vad vill du göra?"
      />
      <button onClick={handleSubmit}>Generera plan</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
