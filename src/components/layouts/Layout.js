import React, { Fragment, useState } from "react";
import LayoutContext from "../../context/LayoutContext";
import Navbar from "../NavbarAdmin/Navbar";
import { useSelector } from "react-redux";
import useStyle from "./styles";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import GroupList from "../../pages/Group/GroupList";
import GroupDetail from "../../pages/Group/GroupDetail";
import { routes } from "../../routers/routers";
import GroupCreate from "../../pages/Group/GroupCreate";
import BillList from "../../pages/MyBill/BillList";
import BillCreate from "../../pages/MyBill/BillCreate";
import BillDetail from "../../pages/MyBill/BillDetail";
import Profile from "../../pages/Profile/Profile";
import EditProfile from "../../pages/Profile/EditProfile";
import Sidebar from "../Sidebar/Sidebar";
import SidebarDetails from "../Sidebar/SidebarDetails";
import Details from "../../pages/Details/Details";
import AddFriend from "../Friend/AddFriend";

function Layout() {
  const classes = useStyle();
  const [isOpen, setOpen] = useState(true);
  const [friendListOpen, setFriendListOpen] = useState(true);
  // const userID = useSelector((state) => state.auth)._id;
  // const currency = JSON.parse(localStorage.getItem("auth")).currency;
  // const rate = JSON.parse(localStorage.getItem("rate"));
  return (
    <LayoutContext.Provider
      value={{
        isOpen: isOpen,
        routes: routes,
        SidebarDetails: SidebarDetails,
        friendListOpen: friendListOpen,
        // userID: userID,
        // currency: currency,
        // rate: rate,
        setIsOpen: (props) => setOpen(props),
      }}
    >
      <div className={classes.root}>
        <LayoutContext.Consumer>
          {() => (
            <>
              <Sidebar />
              <div style={{ width: "100%" }}>
                <Navbar />
                <Switch>
                  <Route exact path="/my-profile" component={Profile} />
                  <Route
                    exact
                    path="/my-profile/edit"
                    component={EditProfile}
                  />
                  <Route
                    exact
                    path="/my-profile/transaction-details/:id"
                    component={Details}
                  />
                  <Route
                    exact
                    path="/my-profile/groups"
                    render={() => {
                      return <Redirect to="/my-profile/groups/groups-index" />;
                    }}
                  />
                  <Route
                    exact
                    path="/my-profile/add-friend"
                    component={AddFriend}
                  />
                  <Route
                    exact
                    path="/my-profile/groups/groups-index"
                    component={GroupList}
                  />
                  <Route
                    exact
                    path="/my-profile/groups/groups-create"
                    component={GroupCreate}
                  />
                  <Route
                    exact
                    path="/my-profile/groups/groups-detail/:id"
                    component={GroupDetail}
                  />
                  <Route
                    exact
                    path="/my-profile/bills"
                    render={() => {
                      return <Redirect to="/my-profile/bills/bills-index" />;
                    }}
                  />
                  <Route
                    exact
                    path="/my-profile/bills/bills-index"
                    component={BillList}
                  />
                  <Route
                    exact
                    path="/my-profile/bills/bills-create"
                    component={BillCreate}
                  />
                  <Route
                    exact
                    path="/my-profile/bills/bills-detail/:id"
                    component={BillDetail}
                  />
                </Switch>
              </div>
            </>
          )}
        </LayoutContext.Consumer>
      </div>
    </LayoutContext.Provider>
  );
}

export default withRouter(Layout);
