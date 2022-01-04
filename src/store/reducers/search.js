let keyword = "";

export default function search(state = keyword, action) {
  switch (action.type) {
    case "SEARCH":
      state = action.payload.data;
      return state;
    default:
      state = "";
      return state;
  }
}
