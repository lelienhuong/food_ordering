import React, { useState } from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";
const Login = (props) => {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img
          src="/image/logo.svg"
          alt="logo"
          className={classes.logotypeImage}
        />
        <Typography className={classes.logotypeText}>Fruit Store</Typography>
      </div>

      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="secondary"
            color="info"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && <LoginTab history={props.history} />}
          {activeTabId === 1 && <RegisterTab history={props.history} />}
        </div>
      </div>
    </Grid>
  );
};

export default withRouter(Login);
