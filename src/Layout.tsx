import { BookOpen, Code, Lightbulb, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

function Layout({ children }: any) {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header para actividad de clase */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo de la actividad */}
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6" />
              <div>
                <h1 className="font-bold text-xl">{t("header.title")} </h1>
                <p className="text-xs text-indigo-200">
                  {t("header.subtitle")}
                </p>
              </div>
            </div>

            {/* Navegación simple */}
            <nav className="flex space-x-4 items-center">
              <a
                target="_blank"
                href="https://github.com/Stucom-Pelai/MarkDown-Mermaid/blob/main/REACT/PRACTICA-REACT+FORMULARIO.md"
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors text-sm"
              >
                <Code size={16} />
                <span>{t("header.exercices")}</span>
              </a>
              <a
                target="_blank"
                href="https://github.com/Stucom-Pelai/MarkDown-Mermaid/tree/main/REACT"
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors text-sm"
              >
                <Lightbulb size={16} />
                <span>{t("header.resources")}</span>
              </a>
              <a
                target="_blank"
                href="https://github.com/EricB-59/Ac7-React_JoErGu"
                className="flex items-center space-x-1 bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
              >
                <Github size={16} />
                <span>{t("header.repository")}</span>
              </a>
            </nav>
            <nav>
              <ul className="flex flex-row gap-10">
                <li>
                  <button
                    onClick={() => i18n.changeLanguage("es")}
                    className="cursor-pointer"
                  >
                    <img
                      src="images/spain.png"
                      alt="Español"
                      className="w-6 h-6"
                    />{" "}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => i18n.changeLanguage("en")}
                    className="cursor-pointer"
                  >
                    <img
                      src="images/uk.png"
                      alt="Español"
                      className="w-6 h-6"
                    />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer para actividad de clase */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Información de la actividad */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-indigo-700">
                {t("footer.main-text")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("footer.secondary-text")}
              </p>
            </div>

            {/* Tips de formularios */}
            <div className="bg-indigo-50 p-3 rounded-lg max-w-md w-full">
              <h4 className="text-sm font-semibold text-indigo-700 flex items-center align-middle">
                <Lightbulb size={16} className="mr-1" />
                {t("footer.blue-box")}
              </h4>
            </div>

            {/* Autor */}
            <div className="text-center md:text-right text-sm text-gray-500 flex flex-row gap-5">
              <p className="font-bold">{t("footer.students")}:</p>
              <ul className="flex flex-row gap-5">
                <li className="text-indigo-600">Eric Baena</li>
                <li className="text-indigo-600">Joel Mesas</li>
                <li className="text-indigo-600">Guillem Sanchez</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
