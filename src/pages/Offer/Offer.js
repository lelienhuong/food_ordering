import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
    let [width, setWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    })
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.offer-container').css('margin-top', $('.nav-container').outerHeight())
        $('.offer-container').css('margin-top', $('.navContainer').outerHeight())
        // $(".nav-container").css("padding","1.7vw 2vw");
    }, [width])
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
            {
                width < 576 ? (<></>) : (
                    <Cart />
                )
            }
        </div >
    );
}

export default Offer;