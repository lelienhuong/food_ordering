import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import useStyles from "./styles";

const FriendList = (props) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className={classes.friendBar}>
      {props.isLoading ? (
        <div className={classes.progressCircleIcon}>
          <CircularProgress color="secondary" size={26} />
        </div>
      ) : (
        <div>
          <List component="div">
            {props.friends.map((item) => {
              return (
                <ListItem
                  button
                  className={classes.friendListContainer}
                  key={item.name}
                  onClick={() =>
                    history.push(`/my-profile/transaction-details/${item._id}`)
                  }
                >
                  {item.avatar ? (
                    <Avatar
                      style={{ marginRight: "10px" }}
                      src={item.avatar}
                    ></Avatar>
                  ) : (
                    <Avatar style={{ marginRight: "10px" }}>
                      {item.name[0].toUpperCase()}
                    </Avatar>
                  )}

                  <ListItemText
                    primary={item.name === null ? "" : item.name}
                    secondary={item.phone ? item.phone : ""}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
};
export default FriendList;
