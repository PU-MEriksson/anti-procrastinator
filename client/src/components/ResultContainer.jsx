//Move this to a ResultPage later
// Add AI-response to the result
// Add send logic to get the edit response
// Add loading state
// Add error handling

import React, { useState } from "react";
import Result from "./Result";
import TextInput from "./TextInput";
import Button from "./Button";

function ResultContainer({ response, onEdit }) {
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editText);
  };
  return (
    <main>
      <Result response={response} />
      {/* <form onSubmit={handleSubmit}>
        <TextInput
          id="edit-input"
          label="Är det något du vill ändra?"
          value="editText"
          onChange={setEditText}
          placeholder="T.ex städa badrummet"
        />
        <Button type="submit" text="Ändra min handlingsplan" />
      </form> */}
    </main>
  );
}
export default ResultContainer;
