import { ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS } from "../actions/types";

let addressData = [{ name: "Huong", address: "27 Street, 2569 Heritage Road Visalia, CA 9329127 Street" }]
export default function addressReducers(state = addressData, action) {
    switch (action.type) {
        case ADD_ADDRESS: {
            state.push(action.payload.data)
            return state;
        }
        case UPDATE_ADDRESS: {
            state.forEach((item, index) => {
                if (index === action.payload.index) {
                    Object.keys(item).map(key => {
                        item[key] = action.payload.data[key]
                    })
                }
            })
            return state;
        }
        case REMOVE_ADDRESS: {
            state.splice(action.payload.index, 1)
            return state;
        }
        default:
            return state;
    }
}

