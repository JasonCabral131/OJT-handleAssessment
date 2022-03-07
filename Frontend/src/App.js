import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { checkValidity } from "./redux/actions";
import TheLandingPage from "./views/LandingPage/";
import Container from "./views/Container";
const App = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const handleToken = () => {
    if (token && user) {
      const { _id } = user;
      dispatch(checkValidity({ _id, token }));
    }
  };
  useEffect(() => {
    handleToken();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    handleToken();
    // eslint-disable-next-line
  }, [token]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={"/"}
          exact
          render={(props) => {
            return !isAuthenticated ? (
              <TheLandingPage {...props} />
            ) : (
              <Redirect to={"/tl-university"} />
            );
          }}
        />
        <Route
          path={"/tl-university"}
          render={(props) => {
            return isAuthenticated ? (
              <Container {...props} />
            ) : (
              <Redirect to={"/"} />
            );
          }}
        />
        <Redirect to={"/"} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
