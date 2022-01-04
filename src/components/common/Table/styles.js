import { makeStyles } from "@material-ui/core";

const propsTableComponent = {
  colorScheduleIcon: "#40AEDF",
  colorAttachMoneyIcon: "#45ab45",
};

export default makeStyles(() => ({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "800 !important",
      color: "grey !important",
    },
  },
  paperTableContainer: {
    overflowX: "auto",
  },
  tableCellIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  tableCellIcon_AttachMoney: {
    marginRight: "5px",
    color: propsTableComponent.colorAttachMoneyIcon,
  },
  tableCellIcon_Schedule: {
    marginRight: "5px",
    color: propsTableComponent.colorScheduleIcon,
  },
  buttonShowIcon: {
    backgroundColor: "#ff9942 !important",
    color: "white",
    cursor: "pointer",
  },
  buttonArchivedIcon: {
    backgroundColor: "#ED054D !important",
    color: "white",
    cursor: "not-alloweds !important",
    marginLeft: "5px",
  },
  hidden: {
    display: "none",
  },
  buttonDisableArchivedIcon: {
    cursor: "not-allowed",
    backgroundColor: "#9b7878 !important",
  },
}));
