import { ADD_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT } from "../actions/types";

let contactData = [{ name: "Primary", phone: "202-555-0191" }]
export default function contactReducers(state = contactData, action) {
    switch (action.type) {
        case ADD_CONTACT: {
            state.push(action.payload.data)
            return state;
        }
        case UPDATE_CONTACT: {
            state.forEach((item, index) => {
                if (index === action.payload.index) {
                    Object.keys(item).map(key => {
                        item[key] = action.payload.data[key]
                    })
                }
            })
            return state;
        }
        case REMOVE_CONTACT: {
            state.splice(action.payload.index, 1)
            return state;
        }
        default:
            return state;
    }
}

