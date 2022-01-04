import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { useContext } from "react";
import ListCollapse from "./ListCollapse";
import useStyles from "./styles";
import LayoutContext from "../../context/LayoutContext";
import clsx from "clsx";
const SidebarProps = (props) => {
  const [sidebarStatus, setSidebarStatus] = useState({
    profile: false,
    groups: false,
    bills: false,
  });
  const { isOpen } = useContext(LayoutContext);
  const classes = useStyles();

  const handleClick = (key) => {
    setSidebarStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const open = sidebarStatus[props.id.toLowerCase()];
  return (
    <div id={props.id}>
      <ListItem
        button
        onClick={() => handleClick(props.id.toLowerCase())}
        style={{ height: "3em" }}
      >
        <ListItemIcon style={{ minWidth: "2.5em" }}>
          {props.parrentIcon}
        </ListItemIcon>
        <ListItemText
          primary={props.id}
          className={clsx({ [classes.hide]: !isOpen })}
        />
        {props.sideBarOpen ? open ? <ExpandLess /> : <ExpandMore /> : ""}
      </ListItem>
      {props.childIcon && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListCollapse
            open={open}
            classes={classes}
            childIcon={props.childIcon}
            sideBarOpen={props.sideBarOpen}
          />
        </Collapse>
      )}
    </div>
  );
};

export default SidebarProps;
