import React, { useContext, useState, useEffect } from "react";
import PeopleIcon from "@material-ui/icons/People";
import LayoutContext from "../../context/LayoutContext";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import FriendList from "./FriendList";
import SearchBar from "../SearchBar/SearchBar";
import { authService } from "../../services/auth";
import { useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
const Friend = () => {
  const classes = useStyles();
  const { userID } = useContext(LayoutContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(null);
  const [friends, setFriends] = useState([]);

  const fetchFriendList = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await authService.getFriendList(id);
      setFriends(data);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const keyword = useSelector((state) => state.search);
  const updateInput = (input) => {
    const filtered = friends.filter((friend) => {
      return friend.name.toLowerCase().includes(input.toLowerCase());
    });
    return filtered;
  };

  useEffect(() => {
    fetchFriendList(userID);
  }, []);

  return (
    <div className={classes.listFriendOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "15px",
          paddingLeft: "10px",
          paddingRight: "10px",
          justifyContent: "space-around",
        }}
      >
        <PeopleIcon className={classes.logoFriendBar} />
        <Typography variant="h5" style={{ marginRight: "2px" }}>
          Friends List
        </Typography>
        <Fab
          color="secondary"
          aria-label="add"
          size="medium"
          onClick={() => history.push("/my-profile/add-friend")}
        >
          <AddIcon />
        </Fab>
      </div>
      <SearchBar label="Search by name" color="secondary" />
      <FriendList isLoading={isLoading} friends={updateInput(keyword)} />
    </div>
  );
};

export default Friend;
