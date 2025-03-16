import { useEffect, useState } from "react";

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

export default function Form({ stageFunction }: any) {
  const [form, setForm] = useState<Form[]>([]);
  const [actualForm, setActualForm] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  /**
   *
   */
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch("/data/form_data.json");
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error("Error al cargar el cuestionario:", error);
      }
    };
    fetchForm();
  }, []);

  useEffect(() => {
    console.log("Updated form state:", form);
  }, [form]);

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    localStorage.setItem(id, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Respuestas:", answers);
    // Cuando le das click al ultimo formulario invoca la funcion del padre para pasar la etapa de la App
    // ! No puede ejecutar la funcion del padre hasta que valide el formulario
    if (actualForm == 3) {
      stageFunction();
    } else {
      setActualForm((prevState) => prevState + 1);
    }
  };

  // Verificar si hay datos cargados
  if (form.length === 0) {
    return <div>Cargando formulario...</div>;
  }

  const renderQuestion = (pregunta: Ask) => {
    switch (pregunta.tipo) {
      case "text":
        return (
          <input
            type="text"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-24"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
          />
        );
      case "select":
        return (
          <select
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {pregunta.opciones?.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        );
      case "check":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={pregunta.id}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={answers[pregunta.id] === "true"}
              onChange={(e) =>
                handleInputChange(
                  pregunta.id,
                  e.target.checked ? "true" : "false"
                )
              }
            />
            <span className="ml-2 text-gray-700">{pregunta.pregunta}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const currentForm = form[actualForm];

  return (
    <>
      <section className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          {currentForm.titulo}
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {currentForm.preguntas.map((pregunta) => (
            <div key={pregunta.id} className="bg-indigo-50 p-4 rounded-lg">
              <label
                htmlFor={pregunta.id}
                className="block text-sm font-medium text-indigo-800 mb-2"
              >
                {pregunta.pregunta}
              </label>
              {renderQuestion(pregunta)}
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enviar Respuestas
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
