import React, { useState, useEffect } from "react";

import Notification from "../common/Notification/Notification";

import useStyle from "./styles";

import clsx from "clsx";
// Components Material UI
import Typography from "@material-ui/core/Typography";
import {
  AppBar,
  Avatar,
  Breadcrumbs,
  ClickAwayListener,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
// icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NotificationsNone as NotificationsIcon } from "@material-ui/icons";
// react hooks
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// animation
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// constant action types
import { LOGOUT } from "../../store/actions/types";
import { routes } from "../../routers/routers";
import { notificationService } from "../../services/notification";

function Navbar() {
  //   {
  //     _id: 4,
  //     sender: { _id: '123', name: 'Thành Long' },
  //     message: "accepted to be friends with you",
  //     type: "approvedFriend",
  //     id: '60d5886ec7a5910016ecbe98'
  //   },
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  let [numberOfNotifications, setNumberOfNotifications] = useState(0);
  let [notifications, setNotification] = useState(null);
  useEffect(async () => {
    try {
      const { data } = await notificationService.getMany(auth._id);
      setNumberOfNotifications(data.total);
      setNotification(data.listNotis);
    } catch (err) {
    }
  }, []);
  const [isAvatarBtnOpen, setAvatarBtnOpen] = React.useState(false);
  let [notificationsMenu, setNotificationsMenu] = useState(null);

  // get information of user
  const linkAvatar = auth?.avatar;
  const userName = auth?.name;

  // get title of each route from routes list to make Breadcrumbs
  let location = useLocation();
  let recentLocation = location.pathname;
  let arraySplitBySeperator = recentLocation.split("/");
  // let originalIndexOfLastSeparator = recentLocation.lastIndexOf("/");
  // let breadCrumbArray = [{ title: "My Profile", path: "/my-profile" }];
  let breadCrumbArray = [];

  let getTitleFromRoute = (currentPath, route) => {
    if (!currentPath) return "";
    if (route.path && route.path.includes(currentPath) && route.meta.title)
      return breadCrumbArray.push({
        title: route.meta.title,
        path: route.path,
      });
    const { children = [] } = route;
    if (!children.length) return "";
    for (const child of children) {
      const title = getTitleFromRoute(currentPath, child);
      if (title) return title;
    }
    return "";
  };

  const r = arraySplitBySeperator.map((path) => {
    for (const route of routes) {
      const title = getTitleFromRoute(path, route);
      if (title) return title;
    }
    return "";
  });

  document.title = breadCrumbArray[breadCrumbArray.length - 1].title;

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setAvatarBtnOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAvatarBtnOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setAvatarBtnOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(isAvatarBtnOpen);

  useEffect(() => {
    if (prevOpen.current === true && isAvatarBtnOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = isAvatarBtnOpen;
  }, [isAvatarBtnOpen]);

  const handleLogout = (e) => {
    dispatch({ type: LOGOUT });
    history.push("/");
    handleClose(e);
  };
  const handleDirectToProfile = (e) => {
    history.push("/my-profile");
    handleClose(e);
  };
  const handleIsReadNotification = async () => {
    setNumberOfNotifications(0);
    await notificationService.announceReaded(auth._id);
  };
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={clsx(classes.appBar)}>
        <Toolbar>
          <div
            className="component-center"
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadCrumbArray.map((item, index) => {
                  return (
                    <ReactCSSTransitionGroup
                      transitionName="fade"
                      key={location.key}
                      transitionAppear={true}
                      transitionAppearTimeout={500}
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {index !== breadCrumbArray.length - 1 ? (
                        <Link
                          key={index}
                          style={{
                            transitionDelay: `${index * 100}ms`,
                            color: "#b9b9b9",
                          }}
                          className={classes.breadCrumbsLink}
                          to={item.path}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <Typography
                          key={index}
                          style={{
                            transitionDelay: `${index * 100}ms`,
                            color: "#20D3E2",
                          }}
                          className={classes.breadCrumbsLink}
                          color="textPrimary"
                        >
                          {item.title}
                        </Typography>
                      )}
                    </ReactCSSTransitionGroup>
                  );
                })}
              </Breadcrumbs>
            </Typography>
            <div className="component-center">
              <IconButton
                className={classes.avatarButton}
                ref={anchorRef}
                aria-controls={isAvatarBtnOpen ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar alt={userName} src={linkAvatar} />
              </IconButton>
            </div>
          </div>
          <Popper
            open={isAvatarBtnOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={isAvatarBtnOpen}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleDirectToProfile}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
