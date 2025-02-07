import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import Link from "next/link";
import Container from "./ui/container";

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
    <footer
      className="w-full pt-20 pb-10 relative overflow-hidden"
      id="contact"
    >
      <Container>
        {/* background grid */}
        <div className="w-full absolute left-0 -bottom-32 min-h-96">
          <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-full opacity-50 "
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-6xl text-center lg:max-w-[45vw]">
            Ready to take <span className="text-purple">your</span> digital
            presence to the next level?
          </h2>
          <p className="text-white-200 md:mt-10 my-5 text-center">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
          <a href="mailto:hello@noxis.agency">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
        <div className="flex mt-28 md:flex-row flex-col justify-between items-center gap-6">
          <p className="md:text-base text-sm md:font-normal font-light">
            Copyright © 2024 Andrea Zago
          </p>

          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((info) => (
              <Link
                key={info.id}
                href={info.link}
                target="_blank"
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <img src={info.img} alt="icons" width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
