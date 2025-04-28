import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Form from "../components/Form";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: #4479d4;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const PageDescription = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

function StartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-plan", {
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
    <PageContainer>
      <PageTitle>Momentum</PageTitle>
      <PageDescription>
        Bryt ner dina uppgifter och kom igång med det som känns svårt
      </PageDescription>
      <Form onSubmit={handleSubmit} isLoading={isLoading} />
    </PageContainer>
  );
}

export default StartPage;
