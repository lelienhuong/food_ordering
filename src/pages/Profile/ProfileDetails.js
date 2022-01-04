import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { AccountBalanceRounded } from "@material-ui/icons";
import moneyFormatter from "../../utils/moneyFormatter";
import useStyles from "./styles";
import LayoutContext from "../../context/LayoutContext";
const ProfileDetails = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { currency } = useContext(LayoutContext);
  return (
    <div className={classes.profileDetailsContainer}>
      <List style={{ position: "relative" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListItemText primary="NAME" />
            <Typography variant="h4">{props.profileData.user.name}</Typography>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MailIcon />
            </Avatar>
          </ListItemAvatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListItemText primary="EMAIL" />
            <Typography variant="h4">{props.profileData.user.email}</Typography>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListItemText primary="PHONE" />
            <Typography variant="h4">{props.profileData.user.phone}</Typography>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBalanceRounded />
            </Avatar>
          </ListItemAvatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListItemText primary="BALANCE" />
            <Typography variant="h4">
              {props.profileData.user.balance
                ? moneyFormatter(props.profileData.user.balance, currency, true)
                : ""}
            </Typography>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Button
        variant="contained"
        style={{
          marginTop: "10px",
        }}
        color="secondary"
        onClick={() => history.push("/my-profile/edit")}
      >
        <strong style={{ color: "white" }}>Edit profile</strong>
      </Button>
    </div>
  );
};

export default ProfileDetails;
