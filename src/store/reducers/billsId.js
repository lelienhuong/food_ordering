let billsId = [];

export default function getBillsId(state = billsId, action) {
  switch (action.type) {
    case "BILL":
      state = action.payload.data;
      return state;
    default:
      return state;
  }
}
