import ContactsSection from "@/components/contacts-section";
import Footer from "@/components/Footer";
import PageInitializer from "@/components/page-initializer";
import Marquee from "react-fast-marquee";

const ContactPage = () => {
  const infiniteTexts = [
    "Ciao!", // Italiano
    "Hello!", // Inglese
    "Hola!", // Spagnolo
    "Bonjour!", // Francese
    "Hallo!", // Tedesco
    "Olá!", // Portoghese
    "Привет!", // Russo
    "你好!", // Cinese (Mandarino)
    "こんにちは!", // Giapponese
    "안녕하세요!", // Coreano
    "Merhaba!", // Turco
    "Namaste!", // Hindi
    "Salam!", // Arabo
    "Hej!", // Svedese/Danese
    "Hei!", // Norvegese/Finlandese
    "Ahoj!", // Ceco/Slovacco
    "Zdravstvuyte!", // Russo (formale)
    "Szia!", // Ungherese
    "Sawubona!", // Zulu
    "Shalom!", // Ebraico
  ];

  return (
    <>
      <PageInitializer />
      <main>
        <section className="h-[100dvh] flex flex-col">
          <div className="flex-1 flex items-center">
            <Marquee speed={100}>
              <div className="flex gap-32">
                {infiniteTexts.map((text, i) => (
                  <h2
                    key={i}
                    className="text-[25vh] font-black"
                    style={{
                      display: "inline-block",
                      writingMode: "horizontal-tb",
                    }}
                  >
                    {text}
                  </h2>
                ))}
              </div>
            </Marquee>
          </div>
          <div className="px-4">
            <ContactsSection>
              <p className={"text-xs md:text-base md:leading-[2rem]"}>
                Siamo sempre alla ricerca di clienti straordinari con cui
                collaborare.
                <br />
                Inviaci una mail e ti risponderemo il prima possibile.
              </p>
            </ContactsSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
