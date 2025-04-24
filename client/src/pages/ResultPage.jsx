import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const response = location.state?.response || "Ingen plan kunde genereras.";

  const goBackToForm = () => {
    navigate('/');
  };

  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => {
      
      if (line.trim().endsWith(':')) {
        return <h3 key={index}>{line}</h3>;
      }
      return line.trim() ? <p key={index}>{line}</p> : <br key={index} />;
    });
  };

  return (
    <div>
      <h1>Din handlingsplan</h1>
      <div>
        {formatResponse(response)}
      </div>
      <button onClick={goBackToForm}>
        Gå tillbaka
      </button>
    </div>
  );
}

export default ResultPage;