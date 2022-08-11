import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      {/* <HashRouter> */}
      <BrowserRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from='/' to='/auth/sign-in' />
        </Switch>
      </BrowserRouter>  
      {/* </HashRouter> */}
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
