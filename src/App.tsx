import { useState } from "react";
import Form from "./Form";
import Welcome from "./Welcome";
import Results from "./Results";
import { useTranslation } from "react-i18next";

function App() {
  const [stage, setStage] = useState(0);
  const [t, i18n] = useTranslation("global");

  function handleChangeStage() {
    setStage((prevState) => prevState + 1);
  }

  function renderStage() {
    switch (stage) {
      case 0:
        return (
          <Welcome>
            <button
              onClick={handleChangeStage}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-64 h-12 cursor-pointer"
            >
              {t("body.button-start")}
            </button>
          </Welcome>
        );
      case 1:
        return <Form stageFunction={handleChangeStage}></Form>;
      case 2:
        return <Results></Results>;
      default:
        return <h1>Problema cargando el formulario...</h1>;
        break;
    }
  }

  return (
    <>
      <main>{renderStage()}</main>
    </>
  );
}

export default App;
