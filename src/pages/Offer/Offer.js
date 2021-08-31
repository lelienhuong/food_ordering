import React, { useEffect, useRef, useState } from 'react';
import './styles/index.scss'
import $ from 'jquery'
import offerData from './offer.json'
import OfferItem from './OfferItem';
import Item from '../Home/Item';
import Cart from '../../components/Cart/Cart';
function Offer(props) {
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.offer-container').css('margin-top', $('.nav-container').outerHeight())
    }, [])

    return (
        <div className="offer-container" style={{ marginTop: "58px" }}>
            {
                offerData.map(item => (
                    <OfferItem item={item} />
                ))
            }
        </div >
    );
}

export default Offer;