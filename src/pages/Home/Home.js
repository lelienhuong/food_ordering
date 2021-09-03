import React, { useContext, useEffect, useState } from 'react';
import './styles/index.scss'
import Introduction from './Introduction';
import Advertisement from './Advertisement';
import Cart from '../../components/Cart/Cart';
import ListItems from './ListItems';
import Sidebar from './Sidebar';
import $ from 'jquery';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import LayoutContext from '../../context/LayoutContext';
import Help from '../Help/Help';
import BillInformation from './BillInformation';
import Offer from '../Offer/Offer';
import itemsData from './items.json'

function Home(props) {
    let { isOpenedBill, setOpenBill } = useContext(LayoutContext)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
        $('.nav-container').removeClass('navbar-otherPages')
        let introAndAdHeight = Math.round($(".home-container").outerHeight() + $(".advertisement-container").outerHeight() + $(".nav-container").outerHeight() + Number.parseFloat($(".sidebar-container").css("padding-top")))
        $(window).on("scroll", function () {
            if (Math.floor($(window).scrollTop()) >= introAndAdHeight) {
                $(".sidebar-sticky").css("top", $(".nav-container").outerHeight())
                $(".sidebar-container").addClass("sidebar-sticky");
            } else if (Math.ceil($(window).scrollTop()) < introAndAdHeight) {
                $(".sidebar-container").removeClass("sidebar-sticky");
            }
        });
    })
    useEffect(() => {
        if (!isOpenedBill) {
            $('.bill-content').removeClass('isShowContent')
            $('.bill-container').removeClass('isOpen')
            $('.bill-content').addClass('isClose')
            return
        }
        $('.bill-content').removeClass('isClose')
        $('.bill-container').addClass('isOpen')
        $('.bill-content').addClass('isShowContent')
    }, [isOpenedBill])

    return (
        <div>
            <Switch>
                <Route
                    exact
                    path="/grocery/product/:name"
                    component={ItemDetail}
                />
            </Switch>
            <Introduction />
            <Advertisement />
            <BillInformation class={isOpenedBill ? "isOpen" : ""} />
            <Cart />

            <div id="content" class="flex">
                <div class="flex home-content--container">
                    <Sidebar />
                    <ListItems />
                </div>
            </div>
        </div>
    );
}

export default Home;
// crawl data
// var mang=[]; for(var i=0;i<20;i++){ mang.push({"title": document.getElementsByClassName('product-title').item(i).innerText,link: document.getElementsByClassName('product-image').item(i).src,unit:document.getElementsByClassName('product-weight').item(i).innerText,price:document.getElementsByClassName('product-price').item(i).innerText,description:document.getElementsByClassName('quick-viewstyle__ProductDescription-d67ysb-12 kOEjVM').item(i)})} console.log(JSON.stringify(mang))