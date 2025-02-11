export type Work = {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
};

const works: Work[] = [
  {
    id: "1",
    title: "Email Marketing",
    description: "Email marketing platform (wip)",
    image: "/project-3.webp",
  },
  {
    id: "2",
    title: "Upcoming Hub",
    description: "Hub for product and service releases",
    image: "/project-2.webp",
  },
  {
    id: "3",
    title: "Agenzia Dese (2022)",
    description: "Car practice agency",
    image: "/project-1.webp",
    href: "https://agenziadese.it/",
  },
];

export default works;
