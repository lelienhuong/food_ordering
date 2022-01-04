let rate = 1;

export default function getRate(state = rate, action) {
  switch (action.type) {
    case "RATE":
      state = action.payload.rate;
      return state;
    default:
      state = 1;
      return state;
  }
}
