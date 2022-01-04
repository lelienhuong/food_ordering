import React, { useContext, useEffect, useState } from 'react';
import '../navbar.scss'
import itemsData from '../../../pages/Home/items.json'
import $ from 'jquery'
import styled from 'styled-components';
import LayoutContext from '../../../context/LayoutContext';
import './pc.scss'
import { Avatar, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import useStyle from "./styles";
import { LOGOUT } from '../../../store/actions/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const HeaderLink = styled.a`
    text-decoration: none;
    padding: 1rem;
    color: black;
    font-weight: 600;
    font-family: Poppins;
    &:hover{
        color: rgb(0, 158, 127);
        text-decoration: none;
    }
    `;
function Nav(props) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isAvatarBtnOpen, setAvatarBtnOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    let [searchKey, setKey] = useState('')
    let { setProductsData } = useContext(LayoutContext)
    const auth = useSelector((state) => state.auth);
    // get information of user
    const linkAvatar = auth?.avatar;
    const userName = auth?.name;
    const handleSearchSubmit = (e) => {
        let introAndAdHeight = Math.round($(".home-container").outerHeight() + $(".advertisement-container").outerHeight() - $(".nav-container").outerHeight())
        e.preventDefault()
        if (searchKey.length === 0) {
            setProductsData(itemsData[0].fruitsAndVegetable)
            window.scrollTo({
                top: introAndAdHeight,
                left: 0,
                behavior: 'smooth'
            });
            return
        }
        setProductsData(itemsData[0].fruitsAndVegetable.filter(item => item.title.indexOf(searchKey) !== -1 || item.title.toLowerCase().indexOf(searchKey) !== -1))
        window.scrollTo({
            top: introAndAdHeight,
            left: 0,
            behavior: 'smooth'
        });
    }
    const handleSearchInput = (e) => {
        let search = e.target.value
        search = search.trim()
        setKey(search)
    }

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

    return (
        <div className="nav-container">
            <a href="/">
                <img className="nav-logo" src="/image/logo.svg" />
            </a>
            <form onSubmit={(e) => handleSearchSubmit(e)} class="nav-search--container flex items-center justify-between hidden">
                <i class="bi bi-search"></i>
                <input name="searchKey" onChange={(e) => handleSearchInput(e)} class="nav-search-input" placeholder="Search your products from here" />
            </form>
            <div className="component-center">
                <HeaderLink href="/offer">Offer</HeaderLink>
                <HeaderLink href="/help"><i class="bi bi-question-circle-fill" style={{ marginRight: "8px" }}></i>Need Help</HeaderLink>
                <HeaderLink href="/admin"><i class="bi bi-speedometer" style={{ marginRight: "8px" }}></i>Admin Manager</HeaderLink>
                <div className="component-center" style={{ paddingRight: 0 }} >
                    <IconButton
                        className={classes.avatarButton}
                        ref={anchorRef}
                        aria-controls={isAvatarBtnOpen ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <Avatar alt={userName} src={linkAvatar} />
                    </IconButton>
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
                </div>
            </div>
        </div>
    );
}

export default Nav;