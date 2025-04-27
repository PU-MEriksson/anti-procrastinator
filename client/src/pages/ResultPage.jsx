import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import ResultPresenter from "../components/ResultPresenter";
import useEditPlan from "../hooks/useEditplan";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: #4479D4;
  font-size: 2.25rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Initial response
  const initialResponse = state?.response || "Ingen plan kunde genereras.";
  const formData = state?.formData;

  // Call the custom hook, receiving the response, loading state, error state, and editPlan function
  const { response, isLoading, error, editPlan } = useEditPlan(
    initialResponse,
    formData
  );

  //Send the user back to the start page
  const handleBack = () => navigate("/");

  return (
    <PageContainer>
      <PageTitle>Din handlingsplan</PageTitle>
      <ResultPresenter
        response={response}
        onBack={handleBack}
        onEdit={editPlan}
        isLoading={isLoading}
        error={error}
      />
    </PageContainer>
  );
}