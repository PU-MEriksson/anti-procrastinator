import React, { useState } from "react";
import Result from "./Result";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link } from "react-router-dom";

function ResultPresenter({ response, onEdit, onBack, isLoading, error }) {
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editText);
  };

  return (
    <main>
      <Result response={response} />

      <form onSubmit={handleSubmit}>
        <TextInput
          id="edit-input"
          label="Är det något du vill ändra?"
          value={editText}
          onChange={(val) => setEditText(val)}
          placeholder="T.ex. Det känns fortfarande svårt att börja."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uppdaterar..." : "Ändra min handlingsplan"}
        </Button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
export default ResultPresenter;
