import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { authService } from "../../services/auth";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from "@material-ui/core";
import ProfileDetails from "./ProfileDetails";
import LayoutContext from "../../context/LayoutContext";
import useStyles from "./styles";
import Lenders from "./Lenders";
import Borrowers from "./Borrowers";
import moneyFormatter from "../../utils/moneyFormatter";
const ProfilePage = (props) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { userID, currency } = useContext(LayoutContext);
  const classes = useStyles();

  const fetchUserProfile = async (id) => {
    console.log(id);
    try {
      setIsLoading(true);
      const { data } = await authService.getProfile(id);
      console.log(data);
      setProfileData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(userID);
  }, []);

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      {isLoading ? (
        <div className={classes.progressCircleIcon}>
          <CircularProgress
            color="secondary"
            size={32}
            style={{ margin: "0 auto" }}
          />
        </div>
      ) : (
        <div>
          <div className={classes.mainContainer}>
            <div style={{ marginRight: "100px" }}>
              {!profileData.user.avatar ? (
                <Avatar className={classes.avatar}>
                  {profileData.user.name[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  src={profileData.user.avatar}
                  className={classes.avatar}
                ></Avatar>
              )}
            </div>
            <ProfileDetails profileData={profileData} />
          </div>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
              <Tabs
                value={activeTab}
                onChange={(e, id) => setActiveTab(id)}
                indicatorColor="secondary"
                centered
                style={{ width: "380px", margin: "0 auto" }}
              >
                <Tab
                  label={
                    <Typography variant="h6">
                      Total Lendings<br></br>
                      {moneyFormatter(profileData.totalLend, currency, true)}
                    </Typography>
                  }
                  icon={<AccountBalanceWalletIcon />}
                  style={{ color: "green" }}
                />
                <Tab
                  label={
                    <Typography variant="h6">
                      Total Borrowings<br></br>
                      {moneyFormatter(profileData.totalBorrow, currency, true)}
                    </Typography>
                  }
                  icon={<AccountBalanceWalletIcon />}
                  style={{ color: "red" }}
                />
              </Tabs>
              {activeTab === 0 ? (
                <Lenders lenders={profileData.listLends} />
              ) : (
                activeTab === 1 && (
                  <Borrowers borrowers={profileData.listBorrow} />
                )
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
