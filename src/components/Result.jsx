import styled from '@emotion/styled';

const ResultContainer = styled.article`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ResultHeading = styled.h2`
  color: #4479D4;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ResultContent = styled.div`
  line-height: 1.6;
  
  h3 {
    color: #4a5568;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
`;

function Result({ response, heading = "Din handlingsplan" }) {
  const formatResponse = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.trim().endsWith(":")) {
        return <h3 key={index}>{line}</h3>;
      }
      return line.trim() ? <p key={index}>{line}</p> : <br key={index} />;
    });
  };

  return (
    <ResultContainer
      aria-labelledby="result-heading"
      aria-live="polite"
    >
      <ResultHeading id="result-heading">{heading}</ResultHeading>
      <ResultContent>{formatResponse(response)}</ResultContent>
    </ResultContainer>
  );
}

export default Result;