import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { FaDesktop, FaShoppingCart, FaCogs, FaMobileAlt } from "react-icons/fa";

const ServiziSection = () => {
  const dimensioneIcona = 56;
  const servizi = [
    {
      nome: "Siti Web Aziendali",
      descrizione:
        "Creazione di siti web professionali e ottimizzati per aziende, startup e professionisti, con design moderno e navigazione intuitiva.",
      icona: <FaDesktop size={dimensioneIcona} />,
    },
    {
      nome: "Sviluppo E-commerce",
      descrizione:
        "Realizziamo piattaforme e-commerce performanti con gestione avanzata di prodotti, pagamenti sicuri e strategie di conversione ottimizzate.",
      icona: <FaShoppingCart size={dimensioneIcona} />,
    },
    {
      nome: "Siti Web Personalizzati",
      descrizione:
        "Progettazione e sviluppo di siti web su misura per esigenze specifiche, con funzionalità avanzate e ottimizzazione per i motori di ricerca.",
      icona: <FaCogs size={dimensioneIcona} />,
    },
    {
      nome: "App Mobile iOS e Android",
      descrizione:
        "Sviluppiamo applicazioni mobile intuitive e ad alte prestazioni per dispositivi iOS e Android, migliorando l’esperienza utente e l'engagement.",
      icona: <FaMobileAlt size={dimensioneIcona} />,
    },
  ];

  return (
    <AuroraBackground className="bg-blue-300 flex-1 h-full min-h-[50dvh] p-4">
      <div className="h-full w-full flex flex-col items-center my-8 md:my-32">
        <div className="flex flex-col md:flex-row mb-8 md:mb-32 gap-8">
          <h1 className="text-white text-3xl md:text-5xl uppercase font-semibold flex-[0.4]">
            Sviluppo Creativo Web e Mobile per Aziende e Startup
          </h1>
          <p className="text-white flex-[0.6] text-xl">
            Offriamo soluzioni digitali innovative per la crescita del tuo
            business. Realizziamo siti web ottimizzati, e-commerce ad alte
            prestazioni e applicazioni mobile su misura. Dall&apos;ideazione
            alla messa online, ti supportiamo in ogni fase per garantirti
            visibilità e risultati concreti.
          </p>
        </div>
        <div className="flex-[0.6] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {servizi.map((servizio, i) => (
            <div
              key={i}
              className="bg-[#0006] backdrop-blur-md py-8 px-4 rounded-3xl flex flex-col items-center border border-[#ffffff40]"
            >
              <div className="text-white text-3xl mb-4">{servizio.icona}</div>
              <h3 className="text-white text-xl font-semibold text-center">
                {servizio.nome}
              </h3>
              <p className="text-white text-center text-sm">
                {servizio.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ServiziSection;
