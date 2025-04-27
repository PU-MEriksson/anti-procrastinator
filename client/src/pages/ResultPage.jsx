import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultPresenter from "../components/ResultPresenter";
import useEditPlan from "../hooks/useEditplan";

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
    <ResultPresenter
      response={response}
      onBack={handleBack}
      onEdit={editPlan}
      isLoading={isLoading}
      error={error}
    />
  );
}
