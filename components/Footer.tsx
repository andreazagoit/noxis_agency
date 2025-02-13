import Link from "next/link";
import Brand from "./brand";
import ContactsSection from "./contacts-section";

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/andreazagoit",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/andreazagoit/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white sm:h-[100vh] pt-16 pb-4 flex flex-col">
      <div className="px-4 flex flex-col h-full justify-between">
        <div />
        {/* <ContactFormSection /> */}
        <div>
          <ContactsSection color="black">
            <p
              className={
                "text-xs leading-[1.5rem] md:text-xl md:leading-[2.5rem]"
              }
            >
              All Rights <br />
              Reserved © 2025
            </p>
          </ContactsSection>
          <Brand fill="black" width="100%" />
        </div>
      </div>
      <div className="flex items-center mt-4 gap-4 justify-center flex-col md:flex-row">
        <p className="text-black uppercase text-center text-xs">
          ZAGO ANDREA - P.IVA 05668260283 - C.F. zgandr97c22b563e - Trebaseleghe
          (PD) Via Giuseppe Mazzini 5a 35010
        </p>
        <div className="flex gap-4">
          <Link
            href="https://www.iubenda.com/privacy-policy/75442792"
            className="text-black text-xs uppercase"
            target="_blank"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://www.iubenda.com/privacy-policy/75442792/cookie-policy"
            className="text-black text-xs uppercase"
            target="_blank"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
