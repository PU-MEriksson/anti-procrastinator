function Result({ response }) {
  return (
    <article
      className="result"
      aria-labelledby="result-heading"
      aria-live="polite"
    >
      <h2 id="result-heading">Din personliga plan</h2>
      <p>{response}</p>
    </article>
  );
}

export default Result;
