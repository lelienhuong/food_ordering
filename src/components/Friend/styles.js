import { makeStyles } from "@material-ui/core/styles";
console.log(window.innerHeight);
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  logoFriendBar: {
    width: "35px",
    height: "35px",
    color: "rgba(0, 0, 0, 0.54)",
    marginRight: "15px",
  },
  hide: {
    display: "none",
  },
  listFriendOpen: {
    height: "100vh",
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    width: "300px",
    // position: "-webkit-sticky",
    backgroundColor: "white",
    zIndex: "100",
  },
  avatar: {
    width: "200px",
    height: "200px",
  },
  nestedOpen: {
    paddingLeft: "25px",
  },
  nestedClose: {
    paddingLeft: "5px",
  },
  progressCircleIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  friendListContainer: {
    height: "3em",
  },
  friendListContainerAddFriend: {
    height: "5em",
  },
  addFriendContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "50%",
    margin: "0 auto",
    marginTop: "2vh",
    marginBottom: "0.5vh",
    height: "90vh",
  },
  addFriendAvatar: {
    marginRight: "10px",
    height: "70px",
    width: "70px",
    fontSize: "35px",
  },
}));

export default useStyles;
