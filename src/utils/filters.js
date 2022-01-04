import moment from "moment";
export default function formatDateTime(val) {
  return val ? moment(val).format("HH:mm DD-MM-YYYY") : "";
}
