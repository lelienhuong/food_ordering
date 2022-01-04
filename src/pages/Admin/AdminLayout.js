import React, { useEffect } from "react";
import "../../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sandbox from "../Sandbox/Sandbox";
import Login from "../Login/Login";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/actions/types";
import moneyConverter from "../../utils/moneyConvert";
import Layout from "../../components/layouts/Layout";
function AdminLayout() {
  useEffect(() => {
    moneyConverter();
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/admin"
            render={() => {
              return <Redirect to="/my-profile" />;
            }}
          />
          <Route path="/login" render={(props) => <Login {...props} />} />
          {/* <Route exact path="/sandbox">
            <Sandbox />
          </Route> */}
          <PrivateRoute path="/my-profile" component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  if (JSON.parse(auth) !== null)
    dispatch({ type: LOGIN, payload: { data: JSON.parse(auth) } });
    return <Route {...rest} render={(props) => <Component {...props}/>} />
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       auth !== null ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             state: { from: rest.path },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
};

export default AdminLayout;
