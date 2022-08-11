import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdAssignment,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import SignInCentered from "views/auth/signIn";

// Common import
import Home from "views/common/home";
import Report from "views/common/report";
import recommendation from "views/common/recommendation";

const routes = [
  {
    name: "Main",
    layout: "/admin",
    path: "/main",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Home,
  },
  {
    name: "Explore",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
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
    component: recommendation,
  }
];

export default routes;
