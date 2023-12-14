import { TCustomLink } from "../ui/CustomLink";

export const links: TCustomLink[] = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Textbook",
    to: "/textbook",
  },
  {
    name: "Test Constructor",
    to: "test-constructor",
  },
  {
    name: "Games",
    to: "/games",
    children: [
      {
        name: "Test",
        to: "/games/test",
      },
      {
        name: "Statistics",
        to: "/games/stats",
      },
    ],
  },
];
