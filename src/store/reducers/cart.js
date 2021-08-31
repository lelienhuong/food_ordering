import { ADD_AMOUNT, ADD_ITEM, ADD_VOUCHER, DECREASE_AMOUNT, REMOVE_ITEM, REMOVE_VOUCHER } from "../actions/types";

let choosedProducts = []
let totalBill = 0
let totalProducts = 0
let discount = {}
const updatedNumbers = (state) => {
    let totalItems = 0
    let totalMoney = 0
    state.choosedProducts.forEach(item => {
        totalItems = totalItems + item.amount
        totalMoney = totalMoney + item.info.price * item.amount
    })
    state.totalBill = totalMoney
    state.totalProducts = totalItems
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
            localStorage.setItem('choosedProducts', state.choosedProducts)
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
            updatedNumbers(state)
            return state;
        }
        case ADD_VOUCHER: {
            let totalMoney = 0
            state.discount = action.payload.data
            let discount = action.payload.data.discount;
            state.choosedProducts.forEach(item => {
                totalMoney = totalMoney + item.info.price * item.amount
            })
            totalMoney = totalMoney * (100 - discount) / 100
            state.totalBill = totalMoney
            return state;
        }
        case REMOVE_VOUCHER: {
            let total = state.totalBill + (state.totalBill * Number.parseInt(state.discount.discount) / (100 - Number.parseInt(state.discount.discount)))
            state.totalBill = total
            state.discount = {}
            return state;
        }
        default:
            return state;
    }
}
