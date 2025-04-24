function Result({ response, heading = "Din handlingsplan" }) {
  return (
    <article
      className="result"
      aria-labelledby="result-heading"
      aria-live="polite"
    >
      <h2 id="result-heading">{heading}</h2>
      <p>{response}</p>
    </article>
  );
}

export default Result;
