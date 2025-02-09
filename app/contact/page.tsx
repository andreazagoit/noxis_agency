import PageInitializer from "@/components/page-initializer";
import React from "react";
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
          <div className="mx-4 py-8 flex border-t-[0.5px] border-neutral-700 gap-8 md:gap-32 md:flex-row flex-row-reverse">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-xs md:text-xl leading-[1.5rem]">
                We&apos;re always looking for amazing clients to work with –
                drop us a mail and you will hear from us as soon as possible.
              </p>
            </div>

            <div className="flex-1 md:flex-none flex gap-4 md:gap-32 flex-col md:flex-row">
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="font-light text-sm text-[#818181]">EMAIL</p>
                <p className="text-xs md:text-xl">info@noxis.agency</p>
              </div>
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="font-light text-sm text-[#818181]">TELEFONO</p>
                <p className="text-xs md:text-xl">+39 349 138 4504</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
