import { BookOpen, Code, Lightbulb, Github } from "lucide-react";

function Layout({ children }: any) {
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
                <h1 className="font-bold text-xl">Ac7_React</h1>
                <p className="text-xs text-indigo-200">
                  Práctica de Formularios en React
                </p>
              </div>
            </div>

            {/* Navegación simple */}
            <nav className="flex space-x-4 items-center">
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors text-sm"
              >
                <Code size={16} />
                <span>Ejercicios</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors text-sm"
              >
                <Lightbulb size={16} />
                <span>Recursos</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 bg-white text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
              >
                <Github size={16} />
                <span>Repositorio</span>
              </a>
            </nav>
            <nav>
              <ul className="flex flex-row gap-10">
                <li>
                  <button className="cursor-pointer">Español</button>
                </li>
                <li>
                  <button className="cursor-pointer">Ingles</button>
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
                Ac7_React - Formularios
              </h3>
              <p className="text-sm text-gray-600">
                Desarrollado como parte del curso de Desarrollo de Aplicaciónes
                Web
              </p>
            </div>

            {/* Tips de formularios */}
            <div className="bg-indigo-50 p-3 rounded-lg max-w-md w-full">
              <h4 className="text-sm font-semibold text-indigo-700 flex items-center align-middle">
                <Lightbulb size={16} className="mr-1" />
                Práctica 07B - Formulario con REACT - Entrega 23/3/2025
              </h4>
            </div>

            {/* Autor */}
            <div className="text-center md:text-right text-sm text-gray-500 flex flex-row gap-5">
              <p className="font-bold">Estudiantes:</p>
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
