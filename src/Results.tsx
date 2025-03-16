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
      <section className="grid-responsive ">
        {forms.flatMap((form) =>
          form.preguntas.map((quest) => (
            <article
              key={quest.id}
              className="w-full h-auto border-2 rounded-xl p-4 flex flex-col gap-2"
            >
              <h3 className="font-semibold">{quest.pregunta}</h3>
              <p className="font-medium">Respuesta: {}</p>
            </article>
          ))
        )}
      </section>
    </>
  );
}
