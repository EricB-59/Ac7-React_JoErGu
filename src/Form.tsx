import { useEffect, useState } from "react";

interface Ask {
  id: string;
  tipo: "text" | "number" | "select";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
}
interface Form {
  titulo: string;
  preguntas: Ask[];
}

export default function Form() {
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch("/data/form_data.json");
        const data = await response.json();
        setForm(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar el cuestionario:", error);
      }
    };
    fetchForm();
  }, []);
  return (
    <>
      <h1></h1>
    </>
  );
}
