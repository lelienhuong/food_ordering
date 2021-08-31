import React, { useEffect, useState } from 'react';
import './styles/index.scss'
import $ from 'jquery'
import ContactModal from './ContactModal';
import DeliveryModal from './DeliveryModal';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_VOUCHER, REMOVE_ADDRESS, REMOVE_CONTACT, REMOVE_VOUCHER, UPDATE_CONTACT } from '../../store/actions/types';
import styled from 'styled-components';
import offerData from '../Offer/offer.json'
import { useHistory } from 'react-router-dom';

const SearchInput = styled.input`
    width: 72%;
    height: 100%;
    outline: none;
    border-radius: 6px;
    border: 1px solid rgb(230, 230, 230) !important;
    background-color: rgb(247, 247, 247);
    color: rgb(119, 121, 140);
    padding-left: 1vw;
    padding-right: 1vw;
    ::placeholder{
        color: rgb(119, 121, 140);
    }
`;
const timeData = [
    { name: "Express-Delivery", time: "90 min express delivery" },
    { name: "8am-11am", time: "8.00 AM - 11.00 AM" },
    { name: "11am-2pm", time: "11.00 AM - 2.00 PM" },
    { name: "2pm-5pm", time: "2.00 PM - 5.00 PM" },
    { name: "5pm-8pm", time: "5.00 PM - 8.00 PM" },
    { name: "Next Day", time: "Next Day" }]
function Checkout(props) {
    let [isVoucherAvailable, setVoucherAvailable] = useState({})
    let [isAppliedCode, setApplied] = useState(false)
    let [voucherCode, setVoucherCode] = useState('')
    const history = useHistory()

    let contactData = useSelector(state => state.contactData)
    let addressData = useSelector(state => state.addressData)
    let { choosedProducts, totalBill, discount, totalProducts } = useSelector(state => state.itemsInCart)

    let [isSelectedShedule, setSchedule] = useState({ schedule: {}, index: 0 })
    let [isSelectedAddress, setAddress] = useState({ address: {}, index: 0 })
    let [isSelectedPhone, setPhone] = useState({ phone: {}, index: 0 })
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
        $('.nav-container').addClass('navbar-otherPages')
        $('.checkout-container').css('margin-top', $('.nav-container').outerHeight())
    }, [])

    const [isDeliveryAddress, setDeliveryAddress] = useState({ value: false, feature: "" })
    let [isChoosedItem, setItem] = useState({})
    const [isContact, setContact] = useState({ value: false, feature: "" })
    const handleCreatedAddress = () => {
        setDeliveryAddress({ value: true, feature: "create" })
    }
    const handleEditedAddress = (item, index) => {
        setItem({ item: item, index: index })
        setDeliveryAddress({ value: true, feature: "edit" })
    }
    const handleRemovedAddress = (index) => {
        dispatch({ type: REMOVE_ADDRESS, payload: { index: index } })
    }
    const handleCreatedContact = () => {
        setContact({ value: true, feature: "create" })
    }
    const handleEditedContact = (item, index) => {
        setItem({ item: item, index: index })
        setContact({ value: true, feature: "edit" })
    }
    const handleRemovedContact = (index) => {
        dispatch({ type: REMOVE_CONTACT, payload: { index: index } })
        handleChooseContact(contactData[0], 0)
    }
    const handleChooseContact = (item, contactIndex) => {
        contactData.forEach((contact, index) => {
            if (index !== contactIndex) {
                let item = { name: "Secondary", phone: contact.phone }
                dispatch({ type: UPDATE_CONTACT, payload: { data: item, index: index } })
            } else {
                let item = { name: "Primary", phone: contact.phone }
                dispatch({ type: UPDATE_CONTACT, payload: { data: item, index: index } })
            }
        })
        setPhone({
            phone: item, index: contactIndex
        })
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
    const handleRemovedCoupon = () => {
        dispatch({ type: REMOVE_VOUCHER })
        setApplied(false)
        setVoucherAvailable({})
        setVoucherCode('')
    }
    const appliedVoucherFunction = () => {
        if (isAppliedCode) {
            if (isVoucherAvailable.value === 'available') {
                return (
                    <p style={{ color: "rgb(119, 121, 140)" }} class="mt-5">Coupon Applied
                        <span style={{ color: "rgb(0, 158, 127)", fontWeight: "600", marginLeft: "5px" }}> {discount.code}</span>
                        <span onClick={() => handleRemovedCoupon()} class="text-sm" style={{ color: "red", marginLeft: "5px", cursor: "pointer" }}> (Remove)</span>
                    </p>
                )
            }
            return (
                <form onSubmit={(e) => handleAppliedCode(e)} class="flex items-center justify-between bg-white p-1 mt-12" style={{ height: "3.5vw", width: "70%" }}>
                    <SearchInput name="voucher" value={voucherCode} onChange={e => handleInputCode(e)} placeholder="Enter voucher code here" />
                    <button class="h-full applied-button">
                        Apply
                    </button>
                </form >

            )
        }
        return (
            <p class="mt-4" onClick={() => setApplied(true)} style={{ color: "rgb(0, 158, 127)", cursor: "pointer" }}>Do you have a voucher?</p>
        )
    }
    return (
        <div class="checkout-container">
            <div class="checkout-content--container">
                <div class="bill-information--container">
                    <div class="w-full p-4 bg-white" style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 2px 16px 0px" }}>
                        {isDeliveryAddress.value && <DeliveryModal item={isDeliveryAddress.feature === "edit" ? isChoosedItem.item : { name: '', address: '' }} index={isChoosedItem.index} feature={isDeliveryAddress.feature} setDeliveryAddress={(item) => setDeliveryAddress(item)} />}
                        <div class="flex w-full justify-between mb-5 items-center">
                            <div class="flex justify-center items-center text-xl"><p class="part-number">1</p> Delivery Address</div>
                            <button onClick={() => handleCreatedAddress()} class="flex justify-center items-center text-sm" style={{ color: "rgb(0, 158, 127)", fontWeight: "600", width: "20%" }}>
                                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="10px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                Add Address
                            </button>
                        </div>
                        <div class="delivery-container flex flex-wrap">
                            {
                                addressData && addressData.map((item, index) => (
                                    <div onClick={() => {
                                        setAddress({ address: item, index: index })
                                    }} class={`box-information box-functions-container ${isSelectedAddress.index === index ? "isActive" : ""}`}>
                                        <div>
                                            <p class="font-medium text-sm">{item.name}</p>
                                            <p class="text-lg text-base mt-1" style={{ color: "rgb(66, 69, 97)" }}>{item.address}</p>
                                        </div>
                                        <div class="button-functions">
                                            <div onClick={() => handleEditedAddress(item, index)} class="button-functions-item" style={{ backgroundColor: "rgb(0, 158, 127)" }}><i class="bi bi-pencil-fill" style={{ fontSize: "0.8vw" }}></i></div>
                                            <div onClick={() => handleRemovedAddress(index)} class="button-functions-item"><i class="bi bi-x" style={{ fontSize: "1.5vw" }}></i></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div class="w-full p-4 bg-white mt-4" style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 2px 16px 0px" }}>
                        <div class="flex w-full justify-between mb-5 items-center">
                            <div class="flex justify-center items-center text-xl"><p class="part-number">2</p> Delivery Schedule</div>
                        </div>
                        <div class="delivery-container flex flex-wrap">
                            {
                                timeData.map((item, index) => (
                                    <div onClick={() => {
                                        setSchedule({ shedule: item, index: index })
                                    }} class={`box-information  ${isSelectedShedule.index === index ? "isActive" : ""}`}>
                                        <p class="font-medium text-sm">{item.name}</p>
                                        <p class="text-lg text-base mt-1" style={{ color: "rgb(66, 69, 97)" }}>{item.time}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div class="w-full p-4 bg-white mt-4" style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 2px 16px 0px" }}>
                        {isContact.value && <ContactModal feature={isContact.feature} item={isContact.feature === "edit" ? isChoosedItem.item : { name: '', phone: '' }} index={isChoosedItem.index} feature={isContact.feature} setContact={(item) => setContact(item)} />}
                        <div class="flex w-full justify-between mb-5 items-center">
                            <div class="flex justify-center items-center text-xl"><p class="part-number">3</p> Contact Number</div>
                            <button onClick={() => handleCreatedContact()} class="flex justify-center items-center text-sm" style={{ color: "rgb(0, 158, 127)", fontWeight: "600", width: "20%" }}>
                                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="10px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                Add Contact
                            </button>
                        </div>
                        <div class="delivery-container flex flex-wrap">
                            {
                                contactData.map((item, index) => (
                                    <div onClick={() => handleChooseContact(item, index)}
                                        class={`box-information box-functions-container ${isSelectedPhone.index === index ? "isActive" : ""}`}  >
                                        <div>
                                            <p class="font-medium text-sm">{item.name}</p>
                                            <p class="text-lg text-base mt-1" style={{ color: "rgb(66, 69, 97)" }}>{item.phone}</p>
                                        </div>
                                        <div class="button-functions" style={{ top: "10%" }}>
                                            <div onClick={() => handleEditedContact(item, index)} class="button-functions-item" style={{ backgroundColor: "rgb(0, 158, 127)" }}><i class="bi bi-pencil-fill" style={{ fontSize: "0.8vw" }}></i></div>
                                            <div onClick={() => handleRemovedContact(index)} class="button-functions-item"><i class="bi bi-x" style={{ fontSize: "1.5vw" }}></i></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            appliedVoucherFunction()
                        }
                        {isVoucherAvailable.value === 'invalid' ? (
                            <p class="text-sm ml-3" style={{ color: "red" }}>
                                Invalid Coupon
                            </p>
                        ) :
                            (<></>)}

                        <p style={{ color: "rgb(119, 121, 140)" }} class="text-sm mt-4 mb-4">By making this purchase you agree to <span style={{ color: "red" }}>ourterms and conditions.</span></p>
                        <button onClick={() => history.push('/')} class="checkout-button--container">ORDER NOW</button>
                    </div>
                </div>
                <div class="products-information--container" style={{ color: "rgb(119, 121, 140)" }}>
                    <div class="font-sm font-medium mb-4" style={{ color: "rgb(13, 17, 54)" }}>Your Order</div>
                    <div class="w-full products-item">
                        {
                            choosedProducts.length > 0 ? choosedProducts.map(item => (
                                <div class="flex justify-between items-center font-sm p-3" style={{ color: "rgb(119, 121, 140)" }}>
                                    <p><span class="font-medium" style={{ color: "rgb(13, 17, 54)" }}>{item.amount}</span> x {item.info.title}|{item.info.unit} </p>
                                    <p>${item.info.price}</p>
                                </div>
                            )) : (
                                <>
                                    <svg style={{ width: "80%", margin: "auto" }} xmlns="http://www.w3.org/2000/svg" width="231.91" height="292" viewBox="0 0 231.91 292"><defs><linearGradient id="linear-gradient" x1="1" y1="0.439" x2="0.369" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#029477"></stop><stop offset="1" stop-color="#009e7f"></stop></linearGradient></defs><g id="no_cart_in_bag_2" data-name="no cart in bag 2" transform="translate(-1388 -351)"><ellipse id="Ellipse_2873" data-name="Ellipse 2873" cx="115.955" cy="27.366" rx="115.955" ry="27.366" transform="translate(1388 588.268)" fill="#ddd" opacity="0.25"></ellipse><path id="Path_18691" data-name="Path 18691" d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z" transform="translate(1403 381)" fill="#009e7f"></path><path id="Rectangle_1852" data-name="Rectangle 1852" d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Rectangle_1853" data-name="Rectangle 1853" d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Path_18685" data-name="Path 18685" d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z" transform="translate(1056.69 164.944)" fill="#006854"></path><path id="Path_18686" data-name="Path 18686" d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z" transform="translate(1057.793 95.684)" fill="#009e7f"></path><circle id="Ellipse_2874" data-name="Ellipse 2874" cx="28.689" cy="28.689" r="28.689" transform="translate(1473.823 511.046)" fill="#006854"></circle><circle id="Ellipse_2875" data-name="Ellipse 2875" cx="15.046" cy="15.046" r="15.046" transform="translate(1481.401 547.854) rotate(-45)" fill="#009e7f"></circle><path id="Path_18687" data-name="Path 18687" d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(1060.579 -35.703)" fill="#006854"></path><path id="Path_18688" data-name="Path 18688" d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(1060.566 -35.704)" fill="#006854"></path><path id="Path_18689" data-name="Path 18689" d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(970.304 -35.704)" fill="#006854"></path><path id="Path_18690" data-name="Path 18690" d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(970.318 -35.703)" fill="#006854"></path><path id="Path_18692" data-name="Path 18692" d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z" transform="translate(1292.301 101.536)" fill="url(#linear-gradient)"></path><path id="Path_18693" data-name="Path 18693" d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z" transform="translate(1118.301 101.536)" fill="url(#linear-gradient)"></path></g></svg>
                                    <p class="text-sm mb-4 text-center">No product fount</p>
                                </>
                            )
                        }
                    </div>
                    <div class="flex font-sm justify-between items-center mt-3">
                        <p>Sub Total</p>
                        {
                            discount.discount ? (
                                <p>${totalBill + totalBill * discount.discount / (100 - discount.discount)}</p>

                            ) : (
                                <p>${totalBill}</p>
                            )
                        }
                    </div>
                    <div class="flex font-sm justify-between items-center mt-3">
                        <p>Delivery Fee</p>
                        <p>$0</p>
                    </div>
                    <div class="flex font-sm justify-between items-center mt-3">
                        <p>Discount</p>
                        {
                            discount.discount ? (
                                <p>${totalBill * discount.discount / (100 - discount.discount)}</p>

                            ) : (
                                <p>$0</p>
                            )
                        }
                    </div>
                    <div class="flex font-sm font-medium justify-between items-center mt-3" style={{ color: "rgb(13, 17, 54)" }}>
                        <p>Total<span class="text-xs">(Incl.VAT)</span></p>
                        <p>${totalBill}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;