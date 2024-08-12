import { useState } from "react";

// import Usestate from "./component/Usestate";
// import Alart from "./component/Alart";
import "./App.css";
import GetApi from "./component/GetApi";
import ErrorPage from "./component/ErrorPage";

function App() {
  let [ErrorForPageError, setErrorForPageError] = useState<string>("");
  return (
    <div
      className={`${
        ErrorForPageError.length == 0 ? "bg-green-400 h-full" : "bg-red-400"
      }  h-screen w-full `}
    >
      {ErrorForPageError.length == 0 ? (
        <GetApi onErrorHandel={sendErrorToAPP} />
      ) : (
        <>
          <ErrorPage />
          <p className="flex justify-center text-xl">{ErrorForPageError} </p>
        </>
      )}
    </div>
  );

  function sendErrorToAPP(Error: string) {
    setErrorForPageError(Error);
  }
}
export default App;
