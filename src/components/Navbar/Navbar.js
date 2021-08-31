import React, { useEffect } from 'react';
import './navbar.scss'
import $ from 'jquery';

import styled from 'styled-components';
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
function Navbar(props) {
    useEffect(() => {
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 400) {
                $(".nav-container").addClass("sticky");
            } else {
                $(".nav-container").removeClass("sticky");
            }
        });
    })
    return (
        <div className="nav-container">
            <a href="/">
                <img className="nav-logo" src="/image/logo.svg" />
            </a>
            <div>
                <HeaderLink href="/offer">Offer</HeaderLink>
                <HeaderLink style={{ paddingRight: 0 }} href="/help"><i class="bi bi-question-circle-fill" style={{ marginRight: "8px" }}></i>Need Help</HeaderLink>
            </div>
        </div>
    );
}

export default Navbar;