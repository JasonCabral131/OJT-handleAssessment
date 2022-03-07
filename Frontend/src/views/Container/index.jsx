import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import TheDashboard from "../TheDashboard";
import { Redirect } from "react-router-dom";
import TheStudent from "../TheStudent";
import TheCollege from "./../TheCollege/index";
import TheEnrollment from "./../TheEnrollment/index";
import TheProgram from "../ThePrograms";
import Admin from "../Admin";
import { useDispatch } from "react-redux";
import { getStudents } from "../../redux/actions/student.actions";
import {
  getColleges,
  getPrograms,
  getEnrollStudent,
  getAdmins,
} from "../../redux/actions";
const Container = (props) => {
  const dispatch = useDispatch();
  const handleGetData = () => {
    dispatch(getStudents());
    dispatch(getColleges());
    dispatch(getPrograms());
    dispatch(getEnrollStudent());
    dispatch(getAdmins());
  };
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar {...props}>
        <Switch>
          <Route
            path={"/tl-university/dashboard"}
            exact
            component={TheDashboard}
          />
          <Route path={"/tl-university/student"} exact component={TheStudent} />
          <Route path={"/tl-university/college"} exact component={TheCollege} />
          <Route
            path={"/tl-university/enrollment"}
            exact
            component={TheEnrollment}
          />
          <Route
            path={"/tl-university/programs"}
            exact
            component={TheProgram}
          />
          <Route path={"/tl-university/admin"} exact component={Admin} />
          <Redirect to="/tl-university/dashboard" />
        </Switch>
      </Navbar>
    </div>
  );
};

export default Container;
