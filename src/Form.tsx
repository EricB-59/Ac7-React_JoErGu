import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";

// In this interface we take into account that according to the JSON some values might be null
interface Ask {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea" | "date" | "email";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
  restricciones?: { min: number; max: number };
  validacion?: { max_seleccionados: number };
}

interface Form {
  titulo: string;
  preguntas: Ask[];
}

export default function Form({ stageFunction }: { stageFunction: () => void }) {
  // This state stores all the forms information from the JSON
  const [form, setForm] = useState<Form[]>([]);
  // This state controls the current form. It is saved in localStorage so that the current form is retained if the user closes the page.
  const [actualForm, setActualForm] = useState(Number(localStorage.getItem("actualForm")));
  // This state controls the values of the inputs
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  // This state controls if any input is invalid and we display error information to the user.
  const [error, setError] = useState("");
  // Get the current language from i18n
  const { i18n } = useTranslation();

  /**
   * This useEffect saves the current form in localStorage
   */
  useEffect(() => {
    localStorage.setItem("actualForm", actualForm.toString());
  }, [actualForm]);

  /**
   * We load the form JSON dynamically according to the selected language.
   */
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/data/${i18n.language}/form_data.json`);
        if (!response.ok) throw new Error("Error loading the questionnaire");
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error("Error loading the questionnaire:", error);
      }
    };
    fetchForm();
  }, [i18n.language]);

  // Handle changes for simple input types (text, number, textarea, select, date, email)
  const handleInputChange = (id: string, value: string | string[]) => {
    if (value === "false") {
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

  /*
    This function validates the input of a specific field in the form.
    It is used to:
    - Validate that the entry meets the defined constraints.
    - Report an error if validation fails.
    - Store the value in localStorage to later print the results.
  */
  const validateInput = (id: string, value: string) => {
    const questions = form[actualForm].preguntas;
    const quest = questions.find((quest) => quest.id === id);

    if (quest && quest.restricciones) {
      const { min, max } = quest.restricciones;
      const valueLength = value.length;

      if (!(valueLength >= min && valueLength <= max)) {
        setError("Error with: " + quest.pregunta);
        return;
      } else {
        setError("");
        localStorage.setItem(id, value);
      }
    }
    localStorage.setItem(id, value);
  };

  /**
   * Function executed when the form is submitted:
   * - Validates the current form.
   * - If it is the last form, it calls stageFunction() to move to the results.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actualForm === form.length - 1) {
      stageFunction();
      setActualForm(0);
      return;
    }
    if (error === "") {
      setActualForm((prevState) => prevState + 1);
    }
  };

  if (form.length === 0) {
    return <div>Loading form...</div>;
  }

  const currentForm = form[actualForm];

  const renderQuestion = (pregunta: Ask) => {
    switch (pregunta.tipo) {
      case "text":
        return (
          <input
            type="text"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={(answers[pregunta.id] as string) || ""}
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
            value={(answers[pregunta.id] as string) || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
          />
        );
      case "textarea":
        return (
          <textarea
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-24"
            value={(answers[pregunta.id] as string) || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
          />
        );
      case "select":
        return (
          <select
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={(answers[pregunta.id] as string) || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {pregunta.opciones?.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        );
      case "check":
        // For "check" type, it is assumed that there are always options (multiple selection)
        return (
          <div className="flex flex-col gap-2">
            {pregunta.opciones?.map((opcion) => (
              <div key={opcion} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${pregunta.id}-${opcion}`}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  onChange={(e) =>
                    handleInputChange(
                      opcion,
                      e.target.checked ? "true" : "false"
                    )
                  }
                />
                <label htmlFor={`${pregunta.id}-${opcion}`} className="ml-2 text-gray-700">
                  {opcion}
                </label>
              </div>
            ))}
          </div>
        );
      case "date":
        return (
          <input
            type="date"
            id={pregunta.id}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={(answers[pregunta.id] as string) || ""}
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
            value={(answers[pregunta.id] as string) || ""}
            onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto bg-[url(../public/images/background.png)]">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8 bg-indigo-50 p-4 rounded-lg">
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
              Submit Answers
            </button>
            {error !== "" && <ErrorMessage message={error} />}
          </div>
        </form>
      </section>
    </>
  );
}
