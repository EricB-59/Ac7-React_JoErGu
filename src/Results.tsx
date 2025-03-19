import { useEffect, useState } from "react";
import "./Results.css";

interface Ask {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
}

interface Form {
  titulo: string;
  preguntas: Ask[];
}
/**
 * We use this because we need to collect all the data from the forms
 *  that are in the JSON, so that we can then go through each form and display the responses.
 * @returns 
 */
export default function Results() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch("/data/form_data.json");
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error("Error al cargar el cuestionario:", error);
      }
    };
    fetchForm();
  }, []);

  useEffect(() => {
    console.log(forms);
  }, [forms]);

  return (
    <>
    {/** We use the flatMap to take each form and the .map to take the questions from them.*/}
      <section className="grid-responsive">
        {forms.flatMap((form) =>
          form.preguntas.map((quest) => (
            <div key={quest.id}>
              {/**We also check the type of question it is, because if it is a check type it
               *  is saved differently in the localStorage, because if that option is selected in 
               * the localStorage it is saved with the value ‘true’. If there is more than one,
               *  they are separated with commas.
                  And if it is another type of question we save it through the ID of the question
                   (if it has answered that question). */}
              <article className="w-full h-auto border-2 rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-semibold">{quest.pregunta}</h3>
                <p className="font-medium">
                  Respuesta:{" "}
                  {quest.tipo === "check" &&
                  quest.opciones &&
                  quest.opciones.length > 0
                    ? quest.opciones
                        .filter(
                          (opcion) => localStorage.getItem(opcion) === "true"
                        )
                        .join(", ") || "Ninguna seleccionada"
                    : localStorage.getItem(quest.id) || "No respondido"}
                </p>
              </article>
            </div>
          ))
        )}
      </section>
    </>
  );
}
