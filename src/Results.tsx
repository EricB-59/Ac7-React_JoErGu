import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Results.css";

interface Ask {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea" | "date" | "email";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
}

interface Form {
  titulo: string;
  preguntas: Ask[];
}

/**
 * We use this component to gather all the data from the forms
 * in the JSON so that we can iterate through each form and display the responses.
 */
export default function Results({ stageReset }: { stageReset: () => void }) {
  const [t, i18n] = useTranslation("global");
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/data/${i18n.language}/form_data.json`);
        if (!response.ok) throw new Error("Error loading the questionnaire");
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error("Error loading the questionnaire:", error);
      }
    };
    fetchForm();
  }, [i18n.language]);

  useEffect(() => {
    console.log(forms);
  }, [forms]);

  const handleReset = () => {
    localStorage.clear();
    stageReset();
  };

  return (
    <>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-64 h-12 cursor-pointer mb-7"
        onClick={handleReset}
      >
        {t("buttons.restart")}
      </button>
      {/** We use flatMap to iterate through each form and map to iterate through the questions */}
      <section className="grid-responsive">
        {forms.flatMap((form) =>
          form.preguntas.map((quest) => (
            <div key={quest.id}>
              {/** We also check the type of question, because if it is of type "check" it
               *  is saved differently in localStorage; for check, each option selected is saved with the value "true",
               *  and if there are multiple options, they are separated by commas.
               *  For other types, the value is stored using the question's ID.
               */}
              <article className="w-full h-auto border-2 rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-semibold">{quest.pregunta}</h3>
                <p className="font-medium">
                  {t("results.answer")}:{" "}
                  {quest.tipo === "check" &&
                  quest.opciones &&
                  quest.opciones.length > 0
                    ? quest.opciones
                        .filter(
                          (opcion) => localStorage.getItem(opcion) === "true"
                        )
                        .join(", ") || t("results.selected")
                    : localStorage.getItem(quest.id) || t("results.noAnswered")}
                </p>
              </article>
            </div>
          ))
        )}
      </section>
    </>
  );
}
