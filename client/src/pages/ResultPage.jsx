import { useLocation, useNavigate } from "react-router-dom";
import ResultContainer from "../components/ResultContainer";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const response = state?.response || "Ingen plan kunde genereras.";
  const handleBack = () => navigate("/");

  return <ResultContainer response={response} onBack={handleBack} />;
  <button onClick={goBackToForm}>Gå tillbaka</button>;
}

// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import TextInput from "../components/TextInput";
// import Button from "../components/Button";
// import Result from "../components/Result";

// function ResultPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const response = location.state?.response || "Ingen plan kunde genereras.";
//   const [response, setResponse] = useState(
//     location.state?.response || "Ingen plan kunde genereras."
//   );
//   const [editText, setEditText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const goBackToForm = () => {
//     navigate("/");
//   };

//   const formatResponse = (text) => {
//     return text.split("\n").map((line, index) => {
//       if (line.trim().endsWith(":")) {
//         return <h3 key={index}>{line}</h3>;
//       }
//       return line.trim() ? <p key={index}>{line}</p> : <br key={index} />;
//     });
//   };

//   return (
//     <main>
//       <Result response={response} />
//       {/* <form onSubmit={handleSubmit}> */}
//       <form>
//         <TextInput
//           id="edit-input"
//           label="Är det något du vill ändra?"
//           value="editText"
//           onChange={setEditText}
//           placeholder="T.ex städa badrummet"
//         />
//         <Button type="submit" text="Ändra min handlingsplan" />
//       </form>
//     </main>

//     // <div>
//     //   <h1>Din handlingsplan</h1>
//     //   <div>{formatResponse(response)}</div>
//     //   <button onClick={goBackToForm}>Gå tillbaka</button>
//     // </div>
//   );
// }

// export default ResultPage;
