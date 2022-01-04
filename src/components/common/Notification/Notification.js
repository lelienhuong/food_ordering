import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  Done,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";

// styles
import useStyles from "./styles";
// components
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { groupService } from "../../../services/group";
import { friendService } from "../../../services/friend";
import { notificationService } from "../../../services/notification";
import Alert from "../Alert/Alert";
import { billService } from "../../../services/bill";

const typesIcons = {
  notification: <NotificationsIcon />,
  reminder: <NotificationsIcon />,
  invitedGroup: <NotificationsIcon />,
  invitedFriend: <NotificationsIcon />,
  payDown: <NotificationsIcon />,
  done: <Done />,
  approvedPayDown: <Done />,
  approvedGroup: <Done />,
  approvedFriend: <Done />,
};

export default function Notification({ variant, ...props }) {
  var classes = useStyles();
  var theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  });
  const [isSnackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: null,
    type: "success",
  });
  const handleCloseSnackBar = () => {
    setSnackBarOpen({ value: false, message: null, type: "success" });
  };

  const fetchNotificationData = async () => {
    try {
      const { data } = await notificationService.getMany(auth._id);
      props.changeNotiList(data.listNotis);
    } catch (err) {
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.deleteOne(id);
      await fetchNotificationData();
    } catch (err) {
    }
  };
  const handleAccept = () => {
    switch (props.type) {
      case "payDown":
        let notificationPayDown = {
          id: props.id,
          to: [props.sender._id],
          type: "approvedPayDown",
        };
        notificationService.createOne(notificationPayDown, auth._id);
        let transaction = {
          lender: auth._id,
          borrower: props.sender._id,
        };
        billService.deleteTransaction(props.id, transaction);
        break;
      case "invitedGroup":
        let memberGroupform = {
          guestID: auth._id,
        };
        groupService.addMember(props.id, memberGroupform);
        let notificationApprovedGroup = {
          id: props.id,
          to: [props.sender._id],
          type: "approvedGroup",
        };
        notificationService.createOne(notificationApprovedGroup, auth._id);
        break;
      case "invitedFriend":
        let friendform = {
          friendID: props.sender._id,
        };
        friendService.addFriend(auth._id, friendform);
        let notificationApprovedFriend = {
          id: props.id, //có thể là auth._id
          to: [props.sender._id],
          type: "approvedFriend",
        };
        notificationService.createOne(notificationApprovedFriend, auth._id);
        break;
      default:
        break;
    }
    handleDelete(props._id);
  };
  const handleView = () => {
    switch (props.type) {
      case "reminder":
        props.handleNotification(false);
        history.push(`/my-profile/bills/bills-detail/${props.id}`);
        break;
      case "approvedPayDown":
        props.handleNotification(false);
        history.push(`/my-profile/bills/bills-detail/${props.id}`);
        break;
      case "approvedGroup":
        props.handleNotification(false);
        history.push(`/my-profile/groups/groups-detail/${props.id}`);
        break;
      case "approvedFriend":
        props.handleNotification(false);
        history.push(`/my-profile/transaction-details/${props.sender._id}`);
        break;
      default:
        break;
    }
    handleDelete(props._id);
  };
  return (
    <div style={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen.value}
        autoHideDuration={1000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={isSnackBarOpen.type}>
          {isSnackBarOpen.message}
        </Alert>
      </Snackbar>
      <div
        className={classnames(classes.notificationContainer, props.className, {
          [classes.notificationContained]: variant === "contained",
          [classes.notificationContainedShadowless]: props.shadowless,
        })}
        style={{
          backgroundColor:
            variant === "contained" &&
            theme.palette[props.color] &&
            theme.palette[props.color].main,
          alignItems: "flex-start",
        }}
      >
        <div
          className={classnames(classes.notificationIconContainer, {
            [classes.notificationIconContainerContained]:
              variant === "contained",
            [classes.notificationIconContainerRounded]: variant === "rounded",
          })}
        >
          {iconWithStyles}
        </div>
        <div className={classes.messageContainer}>
          <Typography
            className={classnames({
              [classes.containedTypography]: variant === "contained",
            })}
            variant={props.typographyVariant}
          >
            <span style={{ fontWeight: "bold" }}>{props.sender.name}</span>{" "}
            {props.message}
          </Typography>

          <div style={{ width: "100%", marginTop: "0.5vw" }}>
            {[
              "reminder",
              "approvedPayDown",
              "approvedGroup",
              "approvedFriend",
            ].includes(props.type) === true ? (
              <Button
                onClick={handleView}
                style={{
                  color: "rgb(57 147 181)",
                  fontWeight: "700",
                  marginRight: "1vw",
                }}
              >
                <VisibilityIcon style={{ marginRight: "4px" }} /> View
              </Button>
            ) : (
              <Button
                onClick={handleAccept}
                style={{
                  color: "#39b539",
                  fontWeight: "700",
                  marginRight: "1vw",
                }}
              >
                <CheckCircleIcon style={{ marginRight: "4px" }} /> Accept
              </Button>
            )}
            <Button
              onClick={() => handleDelete(props._id)}
              style={{ color: "red", fontWeight: "700" }}
            >
              <DeleteIcon style={{ marginRight: "4px" }} /> Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getIconByType(type = "offer") {
  return typesIcons[type];
}
