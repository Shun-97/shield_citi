import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineQuiz,
  MdLock,
  MdAssignment,
} from "react-icons/md";

// Common import
import Home from "views/common/home";
import Quiz from "views/common/quiz";
// import Quiz from "views/common/quiz";
import Report from "views/common/report";
import Recommendation from "views/common/recommendation";
import KYCquiz from "views/common/KYCQuiz"
import auth from "views/auth/signIn"

const routes = [
  {
    name: "Main",
    layout: "/admin",
    path: "/main",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Home,
  },
  {
    name: "Intro Quiz",
    layout: "/admin",
    path: "/KYCquiz",
    icon: <Icon as={MdOutlineQuiz} width='20px' height='20px' color='inherit' />,
    component: KYCquiz,
  },
  {
    name: "ESG Quiz",
    layout: "/admin",
    icon: <Icon as={MdOutlineQuiz} width='20px' height='20px' color='inherit' />,
    path: "/quiz",
    component: Quiz,
  },
  {
    name: "Report",
    layout: "/admin",
    path: "/report",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Report,
  },
  {
    name: "Recommendation",
    layout: "/admin",
    path: "/recommendation",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Recommendation,
  }, {
    name:'Sign Out',
    layout: "/auth",
    path:"/sign-in",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: auth,
  }
];

export default routes;
