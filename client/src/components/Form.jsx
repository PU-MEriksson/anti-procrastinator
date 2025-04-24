import { useState } from 'react';

function Form({ onSubmit }) {
  const [task, setTask] = useState('');
  const [when, setWhen] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [detailslevel, setDetailslevel] = useState('Ett första steg');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ task, when, moreInfo, detailslevel });
  };

  return (
    <form onSubmit={handleSubmit}>
      {}
      <button type="submit">Generera plan</button>
    </form>
  );
}

export default Form;