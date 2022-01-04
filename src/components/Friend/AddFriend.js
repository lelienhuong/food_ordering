import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Link,
  Box,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { authService } from "../../services/auth";
import { useHistory } from "react-router";
import LayoutContext from "../../context/LayoutContext";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import useStyles from "./styles";
const AddFriend = () => {
  const [friends, setFriends] = useState([]);
  const [isFriendList, setIsFriendList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { userID } = useContext(LayoutContext);
  const searchForFriend = async (e, userID, keyword) => {
    if (e.key === "Enter")
      try {
        setLoading(true);
        const { data } = await authService.searchFriendByKeyword(
          userID,
          keyword
        );
        if (data.length === 0) setNotFound(true);
        else {
          setNotFound(false);
          setFriends(data);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
  };

  const handleSendFriendRequest = async (userID, friendID, index) => {
    try {
      await authService.sendFriendRequest(userID, friendID);
      let changedState = {
        ...isFriendList[index],
        requestSent: true,
      };
      setIsFriendList([
        ...isFriendList.slice(0, index),
        changedState,
        ...isFriendList.slice(index + 1),
      ]);
    } catch (err) {}
  };
  const getIsFriend = async (userID, friendID) => {
    try {
      const { data } = await authService.isFriend(userID, friendID);
      return data.status;
    } catch (err) {}
  };

  const fetchIsFriendList = async () => {
    try {
      setLoading(true);
      let isFriendList = await Promise.all(
        friends.map((friend) => {
          return getIsFriend(userID, friend._id);
        })
      );
      isFriendList = isFriendList.map((item) => {
        return {
          isFriend: item,
          requestSent: false,
        };
      });
      setIsFriendList(isFriendList);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIsFriendList();
  }, [friends]);

  return (
    <Box className={classes.addFriendContainer} boxShadow={4} borderRadius={16}>
      <Typography type="h1" style={{ fontSize: "3rem" }}>
        Find a friend
      </Typography>
      <TextField
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyPress={(e) => searchForFriend(e, userID, keyword)}
        style={{ width: "60%", margin: "0 auto" }}
        color="secondary"
        label="Enter their email or phone number"
      />
      {isLoading ? (
        <div className={classes.progressCircleIcon}>
          <CircularProgress color="secondary" size={26} />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          {notFound ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CancelPresentationIcon style={{ fontSize: "5rem" }} />
              <Typography type="h1" style={{ fontSize: "4rem" }}>
                Not found
              </Typography>
            </div>
          ) : (
            <List component="div">
              {friends.map((item, index) => {
                return (
                  <ListItem
                    button
                    className={classes.friendListContainerAddFriend}
                    key={item._id}
                  >
                    {item.avatar ? (
                      <Avatar
                        className={classes.addFriendAvatar}
                        src={item.avatar}
                      ></Avatar>
                    ) : (
                      <Avatar className={classes.addFriendAvatar}>
                        {item.name[0].toUpperCase()}
                      </Avatar>
                    )}

                    <ListItemText
                      primary={
                        <Link
                          onClick={() =>
                            history.push(
                              `/my-profile/transaction-details/${item._id}`
                            )
                          }
                          style={{ color: "black" }}
                        >
                          <Typography type="h2">
                            {item.name ? item.name : ""}
                          </Typography>
                        </Link>
                      }
                      secondary={item.phone ? item.phone : ""}
                      style={{ fontSize: "7rem" }}
                    />
                    {!isFriendList[index].isFriend ? (
                      <Button
                        variant="contained"
                        style={{
                          background: "#1a56ec",
                          color: "white",
                          width: "180px",
                        }}
                        onClick={() =>
                          handleSendFriendRequest(userID, item._id, index)
                        }
                      >
                        {isFriendList[index].requestSent ? (
                          <>
                            <DoneIcon
                              style={{
                                marginRight: "3px",
                              }}
                            />
                            <Typography>Request Sent</Typography>
                          </>
                        ) : (
                          <>
                            <AddIcon
                              style={{
                                marginRight: "3px",
                              }}
                            />
                            <Typography>Add Friend</Typography>
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#b7bfd3",
                          color: "white",
                          width: "180px",
                        }}
                        disabled
                      >
                        <AccountCircleIcon
                          style={{
                            marginRight: "3px",
                          }}
                        />
                        <Typography>Friended</Typography>
                      </Button>
                    )}
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      )}
    </Box>
  );
};

export default AddFriend;
