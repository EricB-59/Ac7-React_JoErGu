import { useTranslation } from "react-i18next";

export default function Welcome({ children }: any) {
  const [t, i18n] = useTranslation("global");

  return (
    <section className="p-20 w-full h-full flex flex-col justify-center items-center gap-20">
      <article>
        <h1 className="text-6xl text-indigo-700 text-center font-bold">
          {t("welcome.title")}
        </h1>
        <h2 className="text-4xl text-indigo-700 text-center p-5">
          {t("welcome.sub-title")}
        </h2>
      </article>
      {children}
    </section>
  );
}
