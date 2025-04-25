// Add send logic to get the edit response
// Add loading state
// Add error handling

import React, { useState } from "react";
import Result from "./Result";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link } from "react-router-dom";

function ResultContainer({ response, onEdit, onBack }) {
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
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        Tillbaka till startsidan
      </Link>
    </main>
  );
}
export default ResultContainer;
