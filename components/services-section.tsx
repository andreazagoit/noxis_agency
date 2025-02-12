import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import {
  FaDesktop,
  FaShoppingCart,
  FaCogs,
  FaMobileAlt,
  FaSearch,
  FaTools,
  FaBriefcase,
} from "react-icons/fa"; // Aggiungi le icone che desideri utilizzare

const ServiziSection = () => {
  const dimensioneIcona = 56;
  const servizi = [
    {
      nome: "Sito Vetrina",
      descrizione:
        "Creazione di siti vetrina eleganti e funzionali per presentare la tua attività online.",
      icona: <FaDesktop size={dimensioneIcona} />,
    },
    {
      nome: "E-commerce",
      descrizione:
        "Sviluppo di piattaforme e-commerce complete con gestione prodotti, carrello e pagamenti sicuri.",
      icona: <FaShoppingCart size={dimensioneIcona} />,
    },
    {
      nome: "Siti Web Personalizzati",
      descrizione:
        "Creazione di siti web su misura per soddisfare le esigenze specifiche del cliente.",
      icona: <FaCogs size={dimensioneIcona} />,
    },
    {
      nome: "Applicazioni Mobili",
      descrizione:
        "Sviluppo di applicazioni mobili per iOS e Android per migliorare l'esperienza utente e il business.",
      icona: <FaMobileAlt size={dimensioneIcona} />,
    },
    {
      nome: "Siti Web Responsivi",
      descrizione:
        "Progettazione di siti web che si adattano perfettamente a qualsiasi dispositivo, garantendo una navigazione ottimale.",
      icona: <FaDesktop size={dimensioneIcona} />,
    },
    {
      nome: "SEO & Ottimizzazione",
      descrizione:
        "Ottimizzazione dei siti web per i motori di ricerca per migliorare la visibilità e il posizionamento online.",
      icona: <FaSearch size={dimensioneIcona} />,
    },
    {
      nome: "Manutenzione Siti Web",
      descrizione:
        "Servizi di manutenzione e aggiornamento dei siti web per mantenerli sicuri, funzionali e aggiornati con le ultime tendenze.",
      icona: <FaTools size={dimensioneIcona} />,
    },
    {
      nome: "Consulenza Digitale",
      descrizione:
        "Offriamo servizi di consulenza per ottimizzare la tua presenza online e raggiungere gli obiettivi aziendali attraverso strategie digitali avanzate.",
      icona: <FaBriefcase size={dimensioneIcona} />,
    },
  ];

  return (
    <AuroraBackground className="bg-blue-300 flex-1 h-full min-h-[50dvh] p-4">
      <div className="h-full w-full flex flex-col md:flex-row items-center gap-8 my-32">
        <div className="flex-[0.4]">
          <div className="text-white text-4xl font-semibold mb-4 text-center md:text-left">
            Potenziare le Imprese e gli Imprenditori
          </div>
          <div className="text-white mb-12 text-center md:text-left">
            Aiutiamo le imprese e gli imprenditori trasformando le loro idee in
            realtà. Offriamo soluzioni digitali su misura che non solo
            soddisfano le tue esigenze immediate, ma alimentano anche la
            crescita e il successo a lungo termine. Dalla creazione di siti web
            straordinari all&apos;implementazione di strategie
            all&apos;avanguardia, siamo qui per aiutarti a navigare ogni fase
            del tuo percorso digitale.
          </div>
        </div>
        <div className="flex-[0.6] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {servizi.map((servizio, i) => (
            <div
              key={i}
              className="bg-[#0009] backdrop-blur-md py-8 px-4 rounded-3xl flex flex-col items-center"
            >
              <div className="text-white text-3xl mb-4">{servizio.icona}</div>
              <div className="text-white text-xl font-semibold text-center">
                {servizio.nome}
              </div>
              <div className="text-white text-center">
                {servizio.descrizione}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ServiziSection;
