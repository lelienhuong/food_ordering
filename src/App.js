import React from 'react';
import './App.css';
import './App.scss'
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Offer from './pages/Offer/Offer';
import Help from './pages/Help/Help';
import ItemDetail from './pages/Home/ItemDetail';
import Checkout from './pages/Checkout/Checkout';
function App() {
  return (
    <div className="App">
      <Navbar id="navbar" />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (<Redirect to="/grocery" />)}
          />
          <Route
            path="/grocery"
            component={Home}
          />
          <Route
            exact
            path="/product/:name"
            component={ItemDetail}
          />
          <Route
            exact
            path="/offer"
            component={Offer}
          />
          <Route
            exact
            path="/help"
            component={Help}
          />
          <Route
            exact
            path="/checkout"
            component={Checkout}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
