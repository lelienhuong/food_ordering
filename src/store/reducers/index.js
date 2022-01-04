import { combineReducers } from "redux";
import itemsInCart from './cart'
import addressData from './address'
import contactData from './contact'
import auth from "./login";
import editting from "./edit";
import billsId from "./billsId";
import search from "./search";
import options from "./billCreate";
import getRate from "./rate";
export default combineReducers({
    itemsInCart,
    addressData,
    contactData,
    auth,
    editting,
    billsId,
    search,
    options,
    getRate,
});