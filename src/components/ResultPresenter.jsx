import React, { useState } from "react";
import styled from '@emotion/styled';
import Result from "./Result";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link } from "react-router-dom";

const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

const EditForm = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  margin: 1rem 0;
  font-weight: 500;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: #4479D4;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

function ResultPresenter({ response, onEdit, onBack, isLoading, error }) {
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editText);
    setEditText("");
  };

  return (
    <MainContainer>
      <Result response={response} />

      <EditForm onSubmit={handleSubmit}>
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
      </EditForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <BackLink
        to="/"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        Tillbaka till startsidan
      </BackLink>
    </MainContainer>
  );
}
export default ResultPresenter;