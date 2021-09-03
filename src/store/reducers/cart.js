import { ADD_AMOUNT, ADD_ITEM, ADD_VOUCHER, DECREASE_AMOUNT, DONE_ORDER, REMOVE_ITEM, REMOVE_VOUCHER } from "../actions/types";

let choosedProducts = JSON.parse(localStorage.getItem('choosedProducts')) || []
let totalBill = localStorage.getItem('totalBill') || 0
let totalProducts = localStorage.getItem('totalProducts') || 0
let discount = JSON.parse(localStorage.getItem('discount')) || {}
const updatedNumbers = (state) => {
    let totalItems = 0
    let totalMoney = 0
    state.choosedProducts.forEach(item => {
        totalItems = totalItems + item.amount
        totalMoney = totalMoney + item.info.price * item.amount
    })
    state.totalBill = Number.parseFloat(totalMoney).toFixed(2)
    state.totalProducts = totalItems
    localStorage.setItem('totalBill', state.totalBill)
    localStorage.setItem('totalProducts', state.totalProducts)
}
export default function cartReducers(state = { choosedProducts, totalBill, totalProducts, discount }, action) {
    switch (action.type) {
        case ADD_ITEM: {
            let itemInfo = action.payload.data;
            let products = [...state.choosedProducts]
            if (products.every(item => item.info.title != itemInfo.title)) {
                products.push({ info: itemInfo, amount: 1 })
            } else {
                products.map(item => {
                    if (item.info.title === itemInfo.title) {
                        item.amount++
                    }
                })
            }
            state.choosedProducts = products
            updatedNumbers(state)
            localStorage.setItem('choosedProducts', JSON.stringify(state.choosedProducts))
            return state;
        }
        case ADD_AMOUNT: {
            let selectedItem = action.payload.data;
            let products = [...state.choosedProducts]
            products.map(item => {
                if (Object.keys(selectedItem).includes("info")) {
                    if (item.info.title === selectedItem.info.title) {
                        item.amount++
                    }
                } else {
                    if (item.info.title === selectedItem.title) {
                        item.amount++
                    }
                }
            })
            state.choosedProducts = products
            localStorage.setItem('choosedProducts', JSON.stringify(state.choosedProducts))
            updatedNumbers(state)
            return state;
        }
        case DECREASE_AMOUNT: {
            let selectedItem = action.payload.data;
            let products = [...state.choosedProducts]
            products.map((item, index) => {
                if (Object.keys(selectedItem).includes("info")) {
                    if (item.info.title === selectedItem.info.title || item.info.title === selectedItem.title) {
                        item.amount--
                        if (item.amount == 0) {
                            products.splice(index, 1)
                        }
                    }
                } else {
                    if (item.info.title === selectedItem.title) {
                        item.amount--
                        if (item.amount == 0) {
                            products.splice(index, 1)
                        }
                    }
                }
            })
            state.choosedProducts = products
            localStorage.setItem('choosedProducts', JSON.stringify(state.choosedProducts))
            updatedNumbers(state)
            return state;
        }
        case REMOVE_ITEM: {
            let selectedItem = action.payload.data;
            let products = [...state.choosedProducts]
            products.map((item, index) => {
                if (item.info.title === selectedItem.info.title) {
                    products.splice(index, 1)
                }
            })
            state.choosedProducts = products
            localStorage.setItem('choosedProducts', JSON.stringify(state.choosedProducts))
            updatedNumbers(state)
            return state;
        }
        case ADD_VOUCHER: {
            let totalMoney = 0
            state.discount = action.payload.data
            localStorage.setItem('discount', JSON.stringify(state.discount))
            let discount = action.payload.data.discount;
            state.choosedProducts.forEach(item => {
                totalMoney = totalMoney + item.info.price * item.amount
            })
            totalMoney = totalMoney * (100 - discount) / 100
            state.totalBill = Number.parseFloat(totalMoney).toFixed(2)
            localStorage.setItem('totalBill', state.totalBill)
            return state;
        }
        case REMOVE_VOUCHER: {
            let totalMoney = 0
            state.choosedProducts.forEach(item => {
                totalMoney = totalMoney + item.info.price * item.amount
            })
            state.totalBill = totalMoney
            localStorage.setItem('totalBill', state.totalBill)
            state.discount = {}
            localStorage.setItem('discount', JSON.stringify(state.discount))
            return state;
        }
        case DONE_ORDER: {
            state.choosedProducts = []
            localStorage.removeItem('choosedProducts')
            state.totalBill = 0
            localStorage.removeItem('totalBill')
            state.totalProducts = 0
            localStorage.removeItem('totalProducts')
            state.discount = {}
            localStorage.removeItem('discount')
            return state;
        }
        default:
            return state;
    }
}
