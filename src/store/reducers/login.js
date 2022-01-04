import { LOGIN, LOGOUT, REGISTER } from "../actions/types";
let auth = null;
export default function navReducers(state = auth, action) {
  switch (action.type) {
    case LOGIN:
      state = action.payload.data;
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      return state;
    case LOGOUT:
      state = {};
      localStorage.removeItem("auth");
      return state;
    case REGISTER:
      state = action.payload.data;
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      return state;
    default:
      return state;
  }
}
