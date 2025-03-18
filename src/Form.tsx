import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface Ask {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea" | "date" | "email";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
  restricciones?: { min: number; max: number };
}

interface Form {
  titulo: string;
  preguntas: Ask[];
}

export default function Form({ stageFunction }: any) {
  const [form, setForm] = useState<Form[]>([]);
  const [actualForm, setActualForm] = useState(0);
  // Cambio 1: Ajustar el tipo de answers para permitir string o string[]
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [error, setError] = useState("");

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

  const handleInputChange = (id: string, value: string | string[]) => {
    console.log(value);
    if (value == "false") {
      localStorage.removeItem(id);
    }
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (typeof value === "string") {
      validateInput(id, value);
    }
  };

  const validateInput = (id: string, value: string) => {
    console.log("validate");
    const questions = form[actualForm].preguntas;

    const quest = questions.find((quest) => quest.id == id);

    if (!(quest?.restricciones == null)) {
      const { min, max } = quest.restricciones;
      const valueLength = value.length;

      if (!(valueLength >= min && valueLength <= max)) {
        setError("Error con " + id);
        return;
      } else {
        setError("");
        localStorage.setItem(id, value);
      }
    }

    localStorage.setItem(id, value);
    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actualForm == 3) {
      stageFunction();
      return;
    }

    if (error == "") {
      setActualForm((prevState) => prevState + 1);
    }
  };

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
            required
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
            required
          />
        );
      case "textarea":
        return (
          <textarea
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-24"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
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
          <div className="flex flex-col gap-2">
            {pregunta.opciones && pregunta.opciones.length > 0 ? (
              pregunta.opciones.map((opcion) => (
                <div key={opcion} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${pregunta.id}-${opcion}`}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    onChange={(e) => {
                      handleInputChange(
                        opcion,
                        e.target.checked ? "true" : "false"
                      );
                    }}
                  />
                  <label
                    htmlFor={`${pregunta.id}-${opcion}`}
                    className="ml-2 text-gray-700"
                  >
                    {opcion}
                  </label>
                </div>
              ))
            ) : (
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
                  required
                />
                <label htmlFor={pregunta.id} className="ml-2 text-gray-700">
                  {pregunta.pregunta}
                </label>
              </div>
            )}
          </div>
        );
      case "date":
        return (
          <input
            type="date"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
          />
        );
      case "email":
        return (
          <input
            type="email"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="correo@stucom.com"
            value={answers[pregunta.id] || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
          />
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
          <div className="flex flex-col justify-center mt-8">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enviar Respuestas
            </button>
            {error == "" ? (
              <></>
            ) : (
              <ErrorMessage message={error}></ErrorMessage>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
