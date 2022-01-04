import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  notificationContainer: {
    display: "flex",
    alignItems: "center",
  },
  hidden: {
    display: "none ",
  },
  notificationContained: {
    borderRadius: 45,
    height: 45,
    boxShadow: theme.customShadows.widgetDark,
  },
  notificationContainedShadowless: {
    boxShadow: "none",
  },
  notificationIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 45,
    display: "flex",
    justifyContent: "center",
    fontSize: 24,
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: "#FFFFFF80",
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing(2),
  },
  containedTypography: {
    color: "white",
  },
  RequestButton: {
    textAlign: "center",
  },
  extraButton: {
    color: "white",
    "&:hover, &:focus": {
      background: "transparent",
    },
  },
}));
