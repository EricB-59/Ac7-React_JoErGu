import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./Layout.tsx";

//IMPORTS: i18next dependencie
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

//IMPORTS: Text of translations in english and spanish
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

/*
This init is used to initialize and configure the i18next library so that it can be used in the application components.
*/
i18next.init({
  interpolation: { escapeValue: false }, // Interpolation handling: escapeValue: false -> disables character escaping to avoid problems with HTML.
  lng: "es", // Set the main language to Spanish.
  resources: {
    // Define available translation resources.
    es: {
      global: global_es, // Load the Spanish translation object.
    },
    en: {
      global: global_en, // Load the English translation object.
    },
  },
});

createRoot(document.getElementById("root")!).render(
  /*
  By wrapping your components with this provider, you achieve the following:
  - Access translations anywhere in the app
  - Centralization of the configuration of i18next
  -  <I18nextProvider i18n={i18next}>: Passes the configuration of i18next made it previously to the React context. 
  */
  <I18nextProvider i18n={i18next}>
    <StrictMode>
      <Layout>
        <App />
      </Layout>
    </StrictMode>
  </I18nextProvider>
);
