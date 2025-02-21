export type Work = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

const works: Work[] = [
  {
    title: "Email Marketing",
    description: "Email marketing platform (wip)",
    image: "/project-3.webp",
  },
  {
    title: "Upcoming Hub",
    description: "Hub for product and service releases",
    image: "/project-2.webp",
  },
  {
    title: "Steps Connect",
    description: "Hiring platform",
    image: "/project-4.webp",
    href: "https://www.stepsconnect.com/",
  },
  {
    title: "Agenzia Dese (2022)",
    description: "Car practice agency",
    image: "/project-1.webp",
    href: "https://agenziadese.it/",
  },
];

export default works;
