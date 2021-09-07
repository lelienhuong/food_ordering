import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LayoutContext from '../../context/LayoutContext';
import './cart.scss'
import $ from 'jquery';

function Cart(props) {
    let totalBill = useSelector(state => state.itemsInCart.totalBill)
    let totalProducts = useSelector(state => state.itemsInCart.totalProducts)
    let { isOpenedBill, setOpenBill, setSidebarOpen } = useContext(LayoutContext)

    const handleClosedCart = () => {
        setOpenBill(true)
        setSidebarOpen(false)
    }
    return (
        <div className="cart-container" onClick={() => handleClosedCart()}>
            <div class="flex items-center justify-center" style={{ padding: "10px 10px" }}><i class="bi bi-bag-check-fill m-1"></i> {totalProducts} Items</div>
            <div class="bg-white h-8 flex items-center justify-center cart-money--font">
                ${totalBill}
            </div>
        </div>
    );
}

export default Cart;