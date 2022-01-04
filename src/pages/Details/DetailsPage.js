import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Grid, CircularProgress } from "@material-ui/core";
import { authService } from "../../services/auth";
import ProfileDetails from "./ProfileDetails";
import useStyles from "./styles";
import Transactions from "./Transactions";
const DetailsPage = (props) => {
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userID = window.location.pathname.split("/")[3];
  const classes = useStyles();
  const fetchUserProfile = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await authService.getProfile(id);
      setProfileData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(userID);
  }, [userID]);

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      {isLoading ? (
        <CircularProgress size={32} />
      ) : (
        profileData.user !== undefined && (
          <div>
            <div className={classes.mainContainer}>
              <div style={{ marginRight: "100px" }}>
                {profileData.user.avatar === undefined ? (
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
            <Grid container>
              <Grid item xs={12}>
                <Transactions />
              </Grid>
            </Grid>
          </div>
        )
      )}
    </div>
  );
};

export default DetailsPage;
