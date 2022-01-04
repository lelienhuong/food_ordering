import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    // overflowY: "hidden",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px ",
  },
  avatar: {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    marginBottom: "30px",
    fontSize: "100px",
  },
  progressCircleIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  listFriendOpen: {
    height: "100vh",
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  },
  hover: {
    color: "red",
    fontSize: "20px",
    top: "50%",
    left: "50%",
    WebkitTransform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  unHover: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "#008CBA",
    // overflow: "hidden",
    width: "100%",
    height: "0",
    transition: ".5s ease",
  },
  profileDetailsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "330px",
    marginRight: "30px",
  },
  gridContainer: {
    width: "95%",
    // marginRight: "300px",
    margin: "0 auto",
  },
}));
