import * as Icons from "../icons";
import { FaBrain, FaHeadphones, FaHistory } from "react-icons/fa";
export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },

      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Essay Checker",
        url: "/essay-checker",
        icon: FaBrain,
        items: [],
      },
      {
        title: "Listening",
        url: "/listening",
        icon: FaHeadphones,
        items: [],
      },
      {
        title: "Video History",
        url: "/videohistory",
        icon: FaHistory,
        items: [],
      },
      // {
      //   title: "Forms",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Form Elements",
      //       url: "/forms/form-elements",
      //     },
      //     {
      //       title: "Form Layout",
      //       url: "/forms/form-layout",
      //     },
      //   ],
      // },
      

    ],
  },
];
