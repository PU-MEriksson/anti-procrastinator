import { useLocation, useNavigate } from "react-router-dom";
import ResultContainer from "../components/ResultContainer";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const response = state?.response || "Ingen plan kunde genereras.";
  const handleBack = () => navigate("/");

  return <ResultContainer response={response} onBack={handleBack} />;
  <button onClick={goBackToForm}>Gå tillbaka</button>;
}
