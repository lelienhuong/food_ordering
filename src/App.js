import React, { useState } from 'react';
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
import itemsData from './pages/Home/items.json'
import LayoutContext from './context/LayoutContext';
function App() {
  const [modalShow, setModalShow] = useState(true);
  let [isOpenedBill, setOpenBill] = useState(false);
  let [isSidebarOpen, setSidebarOpen] = React.useState(false)
  let [productsData, setProductsData] = useState(itemsData[0].fruitsAndVegetable)
  return (
    <LayoutContext.Provider
      value={{
        modalShow: modalShow,
        setModalShow: (props) => setModalShow(props),
        isOpenedBill: isOpenedBill,
        setOpenBill: (props) => setOpenBill(props),
        productsData: productsData,
        setProductsData: (props) => setProductsData(props),
        isSidebarOpen: isSidebarOpen,
        setSidebarOpen: (props) => setSidebarOpen(props)
      }}
    >
      <div className="App">
        <LayoutContext.Consumer>
          {() => (<>
            <Router>
              <Navbar id="navbar" />
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
          </>
          )}
        </LayoutContext.Consumer>
      </div>
    </LayoutContext.Provider>
  );
}

export default App;
