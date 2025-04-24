import { useState } from 'react';

function Form({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
      task: '',
      when: '',
      moreInfo: '',
      detailslevel: 'Ett första steg'
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      {}
      <button type="submit">Generera plan</button>
    </form>
    </div>
  );
}

export default Form;