import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logoSideBar: {
    width: "35px",
    height: "auto",
    marginRight: "15px",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nestedOpen: {
    paddingLeft: "25px",
  },
  nestedClose: {
    paddingLeft: "5px",
  },
  sidebarDetailsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
    paddingLeft: "12px",
  },
  sidebarDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  toggleButton: {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "0px",
    height: "3em",
  },
  toggleIconOpen: {
    minWidth: "2.5em",
  },
  toggleIconClose: {
    minWidth: "2.5em",
    transform: "rotate(180deg)",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
