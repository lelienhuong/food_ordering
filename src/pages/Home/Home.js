import React, { useEffect, useState } from 'react';
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

function Home(props) {
    const [modalShow, setModalShow] = useState(true);
    const [isOpenedBill, setOpenBill] = useState(false);
    useEffect(() => {
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
        <LayoutContext.Provider
            value={{
                modalShow: modalShow,
                setModalShow: (props) => setModalShow(props),
                isOpenedBill: isOpenedBill,
                setOpenBill: (props) => setOpenBill(props)
            }}
        >
            <div>
                <LayoutContext.Consumer>
                    {() => (
                        <>
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
                        </>
                    )}
                </LayoutContext.Consumer>
            </div>
        </LayoutContext.Provider >
    );
}

export default Home;