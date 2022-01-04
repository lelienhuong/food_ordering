import React, { useState } from 'react';
import '../../App.css';
import '../../App.scss'
import Navbar from '../../components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from '../Home/Home';
import Offer from '../Offer/Offer';
import Help from '../Help/Help';
import ItemDetail from '../Home/ItemDetail';
import Checkout from '../Checkout/Checkout';
import itemsData from '../Home/items.json'
import LayoutContext from '../../context/LayoutContext';
import AdminLayout from '../Admin/AdminLayout';
import Profile from '../Profile/User/Profile';

function UserLayout() {
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
      <div>
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
                 <Route
                  exact
                  path="/my-profile"
                  component={Profile}
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

export default UserLayout;
