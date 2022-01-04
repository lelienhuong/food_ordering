import { SET_GROUPS_OPTION, SET_MEMBERS_OPTION } from "../actions/types";
let membersOption = [];
let groupsOption = [];
export default function navReducers(
  state = { membersOption, groupsOption },
  action
) {
  switch (action.type) {
    case SET_MEMBERS_OPTION:
      state.membersOption = action.payload.data;
      return state;
    case SET_GROUPS_OPTION:
      state.groupsOption = action.payload.data;
      return state;
    default:
      return state;
  }
}
