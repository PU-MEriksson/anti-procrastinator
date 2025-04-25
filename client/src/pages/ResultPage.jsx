import { useLocation, useNavigate } from "react-router-dom";
import ResultPresenter from "../components/ResultPresenter";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const response = state?.response || "Ingen plan kunde genereras.";
  const handleBack = () => navigate("/");

  return <ResultPresenter response={response} onBack={handleBack} />;
}
