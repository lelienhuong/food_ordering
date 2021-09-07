import React, { useContext, useEffect, useState } from 'react';
import '../styles/index.scss'
import Introduction from '../Introduction';
import Advertisement from '../Advertisement';
import ListItems from '../ListItems';
import Sidebar from '../Sidebar';
import $ from 'jquery';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import ItemDetail from '../ItemDetail';
import LayoutContext from '../../../context/LayoutContext';
import BillInformation from '../BillInformation';
import Cart from '../../../components/Cart/Cart';

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