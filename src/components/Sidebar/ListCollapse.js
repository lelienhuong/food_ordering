import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

const ListCollapse = (props) => {
  let history = useHistory();
  return (
    <List component="div" disablePadding>
      {props.childIcon.map((icon) => {
        return (
          <ListItem
            button
            onClick={() => history.push(icon.path)}
            className={props.classes.nestedOpen}
            key={icon.text}
            style={{ height: "3em" }}
          >
            <ListItemIcon style={{ minWidth: "2.5em" }}>
              {icon.icon}
            </ListItemIcon>
            <ListItemText primary={icon.text} style={{ marginLeft: "4px" }} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListCollapse;
