import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles/index.scss'
import $ from 'jquery'
import offerData from './offer.json'
import OfferItem from './OfferItem';
import Item from '../Home/Item';
import Cart from '../../components/Cart/Cart';
import LayoutContext from '../../context/LayoutContext';
import BillInformation from '../Home/BillInformation';
function Offer(props) {
    let { isOpenedBill, setOpenBill } = useContext(LayoutContext)
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.offer-container').css('margin-top', $('.nav-container').outerHeight())
    }, [])
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
        <div className="offer-container" style={{ marginTop: "58px" }}>
            {
                offerData.map(item => (
                    <OfferItem item={item} />
                ))
            }
            <BillInformation class={isOpenedBill ? "isOpen" : ""} />
            <Cart />
        </div >
    );
}

export default Offer;