import { combineReducers } from "redux";
import itemsInCart from './cart'
import addressData from './address'
import contactData from './contact'
export default combineReducers({
    itemsInCart,
    addressData,
    contactData
});