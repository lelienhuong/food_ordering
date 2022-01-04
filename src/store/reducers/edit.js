let editting = false;
export default function edittingProfile(state = editting, action) {
  switch (action.type) {
    case "EDITTING":
      state = true;
      return state;
    case "NOTEDITTING":
      state = false;
      return state;
    default:
      return state;
  }
}
