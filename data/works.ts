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
    description: "Piattaforma di email marketing (wip)",
    image: "/website-1.webp",
  },
  {
    id: "2",
    title: "Upcoming Hub",
    description: "Hub per uscita di prodotti, servizi",
    image: "/project-2.webp",
  },
  {
    id: "3",
    title: "Agenzia Dese (2022)",
    description: "Pratiche auto",
    image: "/project-1.webp",
    href: "https://agenziadese.it/",
  },
];

export default works;
