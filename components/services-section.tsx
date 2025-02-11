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
} from "react-icons/fa"; // Add the icons you want to use

const ServicesSection = () => {
  const iconSize = 56;
  const services = [
    {
      name: "Showcase Website",
      descrizione:
        "Creation of elegant and functional showcase websites to present your business online.",
      icon: <FaDesktop size={iconSize} />,
    },
    {
      name: "E-commerce",
      descrizione:
        "Development of complete e-commerce platforms with product management, cart, and secure payments.",
      icon: <FaShoppingCart size={iconSize} />,
    },
    {
      name: "Custom Websites",
      descrizione:
        "Creation of custom websites tailored to meet the client's specific needs.",
      icon: <FaCogs size={iconSize} />,
    },
    {
      name: "Mobile Applications",
      descrizione:
        "Development of mobile applications for iOS and Android to enhance user experience and business.",
      icon: <FaMobileAlt size={iconSize} />,
    },
    {
      name: "Responsive Websites",
      descrizione:
        "Design of websites that perfectly adapt to any device, ensuring optimal navigation.",
      icon: <FaDesktop size={iconSize} />,
    },
    {
      name: "SEO & Optimization",
      descrizione:
        "Optimization of websites for search engines to improve visibility and online ranking.",
      icon: <FaSearch size={iconSize} />,
    },
    {
      name: "Website Maintenance",
      descrizione:
        "Website maintenance and update services to keep your site secure, functional, and up-to-date with the latest trends.",
      icon: <FaTools size={iconSize} />,
    },
    {
      name: "Digital Consulting",
      descrizione:
        "We offer consulting services to optimize your online presence and achieve business goals through advanced digital strategies.",
      icon: <FaBriefcase size={iconSize} />,
    },
  ];

  return (
    <AuroraBackground className="bg-blue-300 flex-1 h-full min-h-[50dvh] p-4">
      <div className="h-full w-full flex flex-col md:flex-row items-center gap-8 my-32">
        <div className="flex-[0.4]">
          <div className="text-white text-4xl font-semibold mb-4 text-center md:text-left">
            Empowering Businesses and Entrepreneurs
          </div>
          <div className="text-white mb-12 text-center md:text-left">
            We are dedicated to empowering businesses and entrepreneurs by
            turning their ideas into reality. We offer tailored digital
            solutions that not only meet your immediate needs but also fuel
            long-term growth and success. From crafting stunning websites to
            implementing cutting-edge strategies, we are here to help you
            navigate every step of your digital journey with confidence.
          </div>
        </div>
        <div className="flex-[0.6] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[#0009] backdrop-blur-md py-8 px-4 rounded-3xl flex flex-col items-center"
            >
              <div className="text-white text-3xl mb-4">{service.icon}</div>
              <div className="text-white text-xl font-semibold text-center">
                {service.name}
              </div>
              <div className="text-white text-center">
                {service.descrizione}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ServicesSection;
