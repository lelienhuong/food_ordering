import React, { useState } from 'react';
import './App.css';
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sandbox from "./pages/Sandbox/Sandbox";
import Login from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { LOGIN } from "./store/actions/types";
import UserLayout from './pages/User/UserLayout';
import AdminLayout from './pages/Admin/AdminLayout';

function App(props) {
  return (
    <div className="App">
    <Router>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/sandbox">
            <Sandbox />
          </Route>
          <PrivateRoute exact path="/admin">
            <AdminLayout />
          </PrivateRoute>
          <PrivateRoute path="/" component={UserLayout} />
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
export default App;