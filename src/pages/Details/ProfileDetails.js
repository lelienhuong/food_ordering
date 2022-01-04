import React, { useState, useContext, useEffect } from "react";
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
import { Button, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import { authService } from "../../services/auth";
import LayoutContext from "../../context/LayoutContext";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Popover from "@material-ui/core/Popover";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
const ProfileDetails = (props) => {
  const classes = useStyles();
  const { userID } = useContext(LayoutContext);
  const [isFriend, setIsFriend] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isRequestSent, setRequestSent] = useState(false);
  // const history = useHistory();

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setPopoverOpen(true);
  };
  const getIsFriend = async (userID, friendID) => {
    try {
      setLoading(true);
      const { data } = await authService.isFriend(userID, friendID);
      setIsFriend(data.status);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (userID, friendID) => {
    try {
      await authService.sendFriendRequest(userID, friendID);
      setRequestSent(true);
    } catch (err) {
      console.log(err);
      // if (err.response.status === 400) setRequestSent(true);x
    }
  };

  const unFriend = async (userID, friendID) => {
    try {
      await authService.unFriend(userID, friendID);
      setIsFriend(false);
      handlePopoverClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIsFriend(userID, props.profileData.user._id);
  }, []);

  return (
    <div>
      <List className={classes.profileDetailsContainer}>
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
            <Typography variant="h4">
              {props.profileData.user.phone ? props.profileData.user.phone : ""}
            </Typography>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        {isFriend ? (
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: "#1a56ec",
              color: "white",
            }}
            onClick={handlePopoverOpen}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <DoneIcon style={{ marginRight: "10px" }} />
                <Typography>Friends</Typography>
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: "#1a56ec",
              color: "white",
            }}
            onClick={() =>
              handleSendFriendRequest(userID, props.profileData.user._id)
            }
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : !isRequestSent ? (
              <>
                <PersonAddIcon style={{ marginRight: "10px" }} />
                <Typography>Add Friend</Typography>
              </>
            ) : (
              <>
                <DoneIcon style={{ marginRight: "10px" }} />
                <Typography>Request Sent</Typography>
              </>
            )}
          </Button>
        )}

        <Popover
          open={isPopoverOpen}
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#e80707", color: "white" }}
            onClick={() => unFriend(userID, props.profileData.user._id)}
          >
            <PersonAddDisabledIcon style={{ marginRight: "10px" }} />
            <Typography>Unfriend</Typography>
          </Button>
        </Popover>
      </List>
    </div>
  );
};

export default ProfileDetails;
