import { useState } from "react";

export default function useEditPlan(initialResponse, formData) {
  const [response, setResponse] = useState(initialResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editPlan = async (editText) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/edit-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          originalResponse: response,
          editText,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.response);
    } catch (error) {
      console.error("Edit error:", error);
      setError("Kunde inte uppdatera planen.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, editPlan };
}
