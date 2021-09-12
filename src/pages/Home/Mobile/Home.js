import React, { useContext, useEffect, useState } from 'react';
import Advertisement from '../Advertisement';
import Cart from '../../../components/Cart/Cart';
import '../styles/index.scss'
import ListItems from '../ListItems';
import LayoutContext from '../../../context/LayoutContext';
import BillInformation from '../BillInformation';
import $ from 'jquery'
import Sidebar from '../Sidebar';
import MyVerticallyCenteredModal from '../../../components/common/Modal/MyVerticallyCenteredModal';
import { Modal } from 'react-bootstrap';
import itemsData from '../items.json'
import { useSelector } from 'react-redux';

function Home(props) {
    let totalBill = useSelector(state => state.itemsInCart.totalBill)
    let totalProducts = useSelector(state => state.itemsInCart.totalProducts)
    let [isOpenedBill, setOpenBill] = useState(false)
    let { setSidebarOpen } = useContext(LayoutContext)
    let [isCategoryOpen, setCategoryOpen] = useState(false)
    useEffect(() => {
        $('.modal-content').css({
            'position': 'fixed', 'bottom': 0, "left": 0, "overflow-y": "scroll"
        })
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
    useEffect(() => {
        $('.modal-content').css({
            'position': 'fixed', 'bottom': 0, "left": 0, "overflow-y": "scroll",
            "height": "60vh"
        })
        $('.sidebar-container').css('width', '100%')
    }, [isCategoryOpen])
    useEffect(() => {
        $('.homeContainer').css('margin-top', $('.navContainer').outerHeight())
    }, [])

    let [searchKey, setKey] = useState('')
    let { setProductsData } = useContext(LayoutContext)
    const handleSearchSubmit = (e) => {
        let introAndAdHeight = Math.round($(".home-intro--container").outerHeight() + $(".advertisement-container").outerHeight())
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
        let search = e.target.value
        search = search.trim()
        setKey(search)
    }

    return (
        <div className="homeContainer">
            <div class="home-intro--container" style={{ padding: "2vw 3vw" }}>
                <div class="flex items-center justify-between">
                    <p class="text-sm">Groceries Delivered in 90 Minute</p>
                    <p class="WordStyle flex items-center" >Grocery</p>
                </div>
                <div class="w-full text-sm">
                    <form onSubmit={(e) => handleSearchSubmit(e)} class="nav-search--container flex items-center justify-between mt-4">
                        <i class="bi bi-search text-lg"></i>
                        <input name="searchKey" onChange={(e) => handleSearchInput(e)} class="nav-search--input" placeholder="Search your products from here" />
                    </form>
                </div>
            </div>
            <Advertisement />
            <div>
                <button onClick={() => {
                    setOpenBill(true)
                }} class="flex w-full justify-between items-center  p-px checkout-button">
                    <p class="ml-4">{totalProducts} {totalProducts > 1 ? "Items" : "Item"}</p>
                    <div class="flex justify-center items-center totalMoney-button--container">
                        ${totalBill}
                    </div>
                </button>
            </div>
            <Modal
                show={isOpenedBill}
                onHide={() => setOpenBill(false)}
            >
                <BillInformation class="isOpen" />
            </Modal>
            {/* <Cart /> */}
            <div onClick={() => {
                setCategoryOpen(true)
                setSidebarOpen(false)
            }} class="greenWithBold mr-4 w-full flex justify-end mt-4" style={{ float: "right", cursor: "pointer", width: "fit-content" }}><i class="bi bi-filter mr-1 mb-4"></i> Filter</div>
            <Modal
                show={isCategoryOpen}
                onHide={() => setCategoryOpen(false)}
            >
                {/* <button onClick={() => setCategoryOpen(false)} class="buttonCloseModalSideBar mt-3"><i style={{ fontSize: "50%" }} class="bi bi-x-lg"></i></button> */}
                <Sidebar />
            </Modal>
            <ListItems />
        </div >
    );
}

export default Home;