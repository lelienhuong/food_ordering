import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiPopover-paper": {
      maxWidth: "fit-content",
    },
    "& .MuiBadge-anchorOriginTopRightRectangle": {
      fontWeight: "700",
    },
  },
  avatarButton: {
    cursor: "pointer",
  },
  appBar: {
    width: "100%",
    position: "sticky",
    right: "auto",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "0 1px 4px rgb(0 21 41 / 8%) !important",
  },
  breadCrumbsLink: {
    textDecoration: "none",
    float: "left",
    transitionDuration: "300ms",
    backgroundColor: (props) => props.backgroundColor,
  },
  menuButton: {
    marginRight: "36px !important",
  },
  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  headerMenu: {
    height: "50vh",
    width: "fit-content",
  },
}));
