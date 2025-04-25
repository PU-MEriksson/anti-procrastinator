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
    <article
      className="result"
      aria-labelledby="result-heading"
      aria-live="polite"
    >
      <h2 id="result-heading">{heading}</h2>
      <div>{formatResponse(response)}</div>
    </article>
  );
}

export default Result;
