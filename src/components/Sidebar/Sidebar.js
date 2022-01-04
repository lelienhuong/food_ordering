import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import SidebarProps from "./SidebarProps";
import useStyles from "./styles";
import clsx from "clsx";
import LayoutContext from "../../context/LayoutContext";
import { ListItem, Typography } from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
const Sidebar = (props) => {
  const classes = useStyles();
  const { isOpen, setIsOpen, SidebarDetails } = useContext(LayoutContext);
  const handleToggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={{ width: "fit-content" }}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
        anchor={props.anchor}
      >
        <div className={classes.sidebarDetailsContainer}>
          <img
            className={classes.logoSideBar}
            src="/image/logoIcon.png"
            alt="logo"
          />
          <Typography
            className={clsx({ [classes.hide]: !isOpen })}
            variant="h5"
          >
            Fruit Store 
          </Typography>
        </div>
        <div className={classes.sidebarDetails}>
          <List component="div">
            {SidebarDetails.map((item) => (
              <SidebarProps
                id={item.id}
                sideBarOpen={isOpen}
                parrentIcon={item.parrentIcon}
                childIcon={item.childIcon}
                path={item.path}
                key={item.id}
              />
            ))}
          </List>

          <ListItem
            onClick={handleToggleSideBar}
            button
            className={classes.toggleButton}
          >
            <ListItemIcon
              className={clsx({
                [classes.toggleIconOpen]: !isOpen,
                [classes.toggleIconClose]: isOpen,
              })}
            >
              <DoubleArrowIcon />
            </ListItemIcon>
            <ListItemText
              primary="Collapse sidebar"
              className={clsx({
                [classes.hide]: !isOpen,
              })}
            ></ListItemText>
          </ListItem>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
