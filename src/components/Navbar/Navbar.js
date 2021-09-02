import React, { useContext, useEffect, useState } from 'react';
import './navbar.scss'
import itemsData from '../../pages/Home/items.json'
import $ from 'jquery'
import styled from 'styled-components';
import LayoutContext from '../../context/LayoutContext';

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
    let [searchKey, setKey] = useState('')
    let { setProductsData } = useContext(LayoutContext)
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
        setKey(e.target.value)
    }
    useEffect(() => {
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 400) {
                $(".nav-container").addClass("sticky");
                $(".nav-search--container").removeClass("hidden");
            } else {
                $(".nav-container").removeClass("sticky");
                $(".nav-search--container").addClass("hidden");
            }
        });
    })
    return (
        <div className="nav-container">
            <a href="/">
                <img className="nav-logo" src="/image/logo.svg" />
            </a>
            <form onSubmit={(e) => handleSearchSubmit(e)} class="nav-search--container flex items-center justify-between hidden">
                <i class="bi bi-search"></i>
                <input name="searchKey" onChange={(e) => handleSearchInput(e)} class="nav-search-input" placeholder="Search your products from here" />
            </form>
            <div>
                <HeaderLink href="/offer">Offer</HeaderLink>
                <HeaderLink style={{ paddingRight: 0 }} href="/help"><i class="bi bi-question-circle-fill" style={{ marginRight: "8px" }}></i>Need Help</HeaderLink>
            </div>
        </div>
    );
}

export default Navbar;