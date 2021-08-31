import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LayoutContext from '../../context/LayoutContext';
import { ADD_AMOUNT, ADD_ITEM, ADD_VOUCHER, DECREASE_AMOUNT, REMOVE_ITEM } from '../../store/actions/types';
import offerData from '../Offer/offer.json'
const SearchInput = styled.input`
    width:inherit;
    border-style: hidden;
    outline: none;
    color: rgb(119, 121, 140);
    padding-left: 1vw;
    padding-right: 1vw;
    ::placeholder{
        color: rgb(119, 121, 140);
    }
    `;
function BillInformation(props) {
    let totalBill = useSelector(state => state.itemsInCart.totalBill)
    let totalProducts = useSelector(state => state.itemsInCart.totalProducts)
    let choosedProducts = useSelector(state => state.itemsInCart.choosedProducts)
    let { isOpenedBill, setOpenBill } = useContext(LayoutContext)
    let [isVoucherAvailable, setVoucherAvailable] = useState({})
    let [isAppliedCode, setApplied] = useState(false)
    let [voucherCode, setVoucherCode] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const handleCloseBill = () => {
        setOpenBill(false)
        setApplied(false)
    }
    const handleIncreasingAmount = (item) => {
        dispatch({ type: ADD_AMOUNT, payload: { data: item } })
    }
    const handleDecreasingAmount = (item) => {
        dispatch({ type: DECREASE_AMOUNT, payload: { data: item } })
    }
    const handleRemovedItem = (item) => {
        dispatch({ type: REMOVE_ITEM, payload: { data: item } })
    }
    const handleAppliedCode = (e) => {
        e.preventDefault()
        if (offerData.every(item => item.code !== voucherCode)) {
            setVoucherAvailable({ value: 'invalid' })
            return
        }
        offerData.map(item => {
            if (item.code === voucherCode) {
                setVoucherAvailable({ value: 'available' })
                dispatch({ type: ADD_VOUCHER, payload: { data: item } })
            }
        })
    }
    const handleInputCode = (e) => {
        setVoucherCode(e.target.value)
    }
    const appliedVoucherFunction = () => {
        if (isAppliedCode) {
            if (isVoucherAvailable.value === 'available') {
                return (
                    <p class="text-center" style={{ color: "rgb(119, 121, 140)" }}>Coupon Applied <span style={{ color: "rgb(0, 158, 127)", fontWeight: "600" }}>{voucherCode}</span></p>
                )
            }
            return (
                <form onSubmit={(e) => handleAppliedCode(e)} class="flex  w-full items-center justify-between bg-white p-1" style={{ boxShadow: "rgb(0 0 0 / 5%) 0px 21px 36px", borderRadius: "6px", border: "1px solid rgb(237, 237, 237)", height: "30%" }}>
                    <div class="flex w-full h-full">
                        <SearchInput name="voucher" value={voucherCode} onChange={e => handleInputCode(e)} placeholder="Enter voucher code here" />
                    </div>
                    <button disabled={totalProducts > 0 ? false : true} class={totalProducts > 0 ? "h-full applied-button--active" : "h-full applied-button--disable"}>
                        Apply
                    </button>
                </form >

            )
        }
        return (
            <p class="text-center" onClick={() => setApplied(true)} style={{ color: "rgb(0, 158, 127)", fontWeight: "600", cursor: "pointer" }}>Do you have a voucher?</p>
        )
    }
    return (
        <div class="bill-container">
            <div class="bill-content">
                <div class="bill-content--header">
                    <div class="flex justify-between" >
                        <div style={{ color: "rgb(0, 158, 127)", fontWeight: 600, paddingRight: "10px" }} class="flex items-center justify-center"><i class="bi bi-bag-check-fill m-1"></i> {totalProducts} Items</div>
                        <button style={{ color: "rgba(0, 0, 0, 0.25)" }} onClick={() => handleCloseBill()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="bill-content--body">
                    <div class="bill-content--products">
                        {choosedProducts.map((item) => {
                            return (
                                <div class="flex" style={{ padding: "1vw 2vw", borderBottom: "1px solid rgb(247, 247, 247)" }}>
                                    <div class="col-1 p-0 adjustedAmount-button">
                                        <div class="flex flex-col h-full items-center justify-around" style={{ padding: "10px" }}>
                                            <button onClick={() => handleIncreasingAmount(item)}>
                                                <svg style={{ height: "10px" }} xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                            </button>
                                            <span>{item.amount}</span>
                                            <button onClick={() => handleDecreasingAmount(item)}>
                                                <svg style={{ width: "10px" }} xmlns="http://www.w3.org/2000/svg" width="12px" height="2px" viewBox="0 0 12 2"><rect data-name="Rectangle 522" width="12" height="2" rx="1" fill="currentColor"></rect></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-3 flex justify-center items-center">
                                        <img class="w-full h-auto" src={item.info.link} />
                                    </div>
                                    <div class="col-6">
                                        <p class="mb-2" style={{ fontWeight: "600" }}>{item.info.title}</p>
                                        <p class="mb-2" style={{ color: "rgb(0, 158, 127)", fontWeight: "700" }}>${item.info.price}</p>
                                        <p class="text-xs" style={{ color: "rgb(119, 121, 140)" }}>{item.amount} X {item.info.unit}</p>
                                    </div>
                                    <div class="col-2 flex justify-center items-center">
                                        <p style={{ fontWeight: "600" }}>${item.amount * item.info.price}</p>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <button style={{ color: "rgba(0, 0, 0, 0.25)" }} onClick={() => handleRemovedItem(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div class="p-3 flex flex-column justify-around" style={{ height: "30%" }}>
                        {
                            appliedVoucherFunction()
                        }
                        {isVoucherAvailable.value === 'invalid' ? (
                            <p style={{ color: "red", textAlign: "center" }}>
                                Invalid Coupon
                            </p>
                        ) :
                            (<></>)}
                        <button onClick={() => history.push('/checkout')} class="flex w-full justify-between items-center  p-px checkout-button">
                            <p class="ml-4">Checkout</p>
                            <div class="flex justify-center items-center totalMoney-button--container">
                                ${totalBill}
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillInformation;