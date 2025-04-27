import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function StartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      navigate("/result", { state: { response: data.response, formData } });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Startsida</h1>
      <Form onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default StartPage;
