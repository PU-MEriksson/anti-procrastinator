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

        <div className="form-group">
        <label htmlFor="task">Vad behöver du göra?</label>
        <input
            type="text"
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            required
            placeholder="Ex: Skriva uppsats, städa köket, planera projekt..."
        />
        </div>

        <div className="form-group">
          <label htmlFor="when">När vill du börja?</label>
          <input
            type="text"
            id="when"
            name="when"
            value={formData.when}
            onChange={handleChange}
            placeholder="Ex: Nu, när jag kommer hem, efter lunch..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="moreInfo">Är det något du vill tillägga?</label>
          <textarea
            id="moreInfo"
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleChange}
            placeholder="Specifika utmaningar, tidsbegränsningar..."
          />
        </div>

        <div className="form-group">
          <label>Hur detaljerad nedbrytning önskar du?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="detailslevel"
                value="Ett första steg"
                checked={formData.detailslevel === "Ett första steg"}
                onChange={handleChange}
              />
              Ett första steg
            </label>
            <label>
              <input
                type="radio"
                name="detailslevel"
                value="Flera steg"
                checked={formData.detailslevel === "Flera steg"}
                onChange={handleChange}
              />
              Flera steg
            </label>
            <label>
              <input
                type="radio"
                name="detailslevel"
                value="I ännu fler detaljerade steg"
                checked={formData.detailslevel === "I ännu fler detaljerade steg"}
                onChange={handleChange}
              />
              I ännu fler detaljerade steg
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Genererar plan...' : 'Generera plan'}
        </button>
    </form>
    </div>
  );
}

export default Form;