import { useState } from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import Button from './Button';

function Form({ onSubmit, isLoading = false}) {
    const [task, setTask] = useState('');
    const [when, setWhen] = useState('');
    const [moreInfo, setMoreInfo] = useState('');
    const [detailslevel, setDetailslevel] = useState('Ett första steg');
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData(prev => ({ ...prev, [name]: value }));
    // };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ task, when, moreInfo, detailslevel });
      };

      const detailOptions = [
        { value: 'Ett första steg', label: 'Ett första steg' },
        { value: 'Flera steg', label: 'Flera steg' },
        { value: 'I ännu fler detaljerade steg', label: 'I ännu fler detaljerade steg' }
      ];

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>

            <TextInput
            id="task"
            label="Vad behöver du göra?"
            value={task}
            onChange={setTask}
            placeholder="Ex: Skriva uppsats, städa köket, planera projekt..."
            required={true}
            />

            <TextInput
            id="when"
            label="När vill du börja?"
            value={when}
            onChange={setWhen}
            placeholder="Ex: Nu, när jag kommer hem, efter lunch..."
            />

            <TextInput
            id="moreInfo"
            label="Övrig information (valfritt)"
            value={moreInfo}
            onChange={setMoreInfo}
            placeholder="Specifika utmaningar, tidsbegränsningar..."
            />

            <RadioGroup
            label="Hur detaljerad nedbrytning önskar du?"
            name="detailslevel"
            options={detailOptions}
            selectedValue={detailslevel}
            onChange={setDetailslevel}
            />

            <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Genererar plan...' : 'Generera plan'}
            </Button>

        </form>
    </div>
  );
}

export default Form;