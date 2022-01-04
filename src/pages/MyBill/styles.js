import { makeStyles } from "@material-ui/core";

const propsTableComponent = {
  colorScheduleIcon: "#40AEDF",
  colorAttachMoneyIconLender: "#45ab45",
  colorAttachMoneyIconBorrower: "#D0021B",
};
const styleForFlexSpaceBetween = {
  display: "flex",
  justifyContent: "space-between",
};
export default makeStyles((theme) => ({
  root: {
    "& .MuiButton-contained:hover": {
      backgroundColor: "orange",
    },
    width: "auto",
    padding: "24px",
    "& .MuiStepIcon-active": {
      color: "#1976d2 !important",
    },
    "& .MuiStepIcon-completed": {
      color: "#1976d2 !important",
    },
    "& .MuiStepIcon-text": {
      fill: "white",
    },
    "& .MuiTableCell-head": {
      fontWeight: "800 !important",
      color: "grey !important",
    },
    "& .Mui-focused": {
      color: "#2F93E0 !important",
    },
    "& .MuiInputBase-input": {
      color: "black ",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid #2F93E0",
    },
  },
  textCenter: {
    textAlign: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  informationCreatorBillAvatar: {
    marginRight: "1rem !important",
  },
  paperTableContainer: {
    overflowX: "auto",
  },
  tableCellIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  tableCellStatusLender: {
    color: propsTableComponent.colorAttachMoneyIconLender,
    fontWeight: "600",
  },
  tableCellStatusBorrower: {
    color: propsTableComponent.colorAttachMoneyIconBorrower,
    fontWeight: "600",
  },
  tableCellIcon_AttachMoney: {
    marginRight: "5px",
  },
  tableCellIcon_Schedule: {
    marginRight: "5px",
    color: propsTableComponent.colorScheduleIcon,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  instructionsButtons: {
    marginTop: "2rem",
    textAlign: "center",
  },
  hidden: {
    display: "none",
  },
  billCreateContainer: {
    width: "auto !important",
    padding: "24px",
  },
  informationContainer: {
    width: "fit-content",
  },
  billDetailContainer: {
    padding: "0 1.5rem 1.5rem 1.5rem",
  },
  billDetailTitle: {
    color: "#2da2ff",
    fontWeight: 700,
    fontSize: "1.6rem",
    margin: 0,
    textAlign: "",
    display: "flex",
    alignItems: "center",
    marginTop: "4rem",
    marginBottom: "0.5rem",
  },
  headerTable: {
    fontWeight: "800",
    fontSize: "1.5rem",
  },
  billDetailTitle_line: {
    height: "0.15rem",
    width: "5rem",
    backgroundColor: "orange",
    marginLeft: "5px",
  },
  billImage_stapleIcon: {
    position: "absolute",
    top: "-5%",
    left: "-5%",
    width: "15%",
    height: "auto",
    filter:
      "invert(61%) sepia(48%) saturate(6818%) hue-rotate(163deg) brightness(97%) contrast(100%);",
  },
  billDetailImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  informationBillTitleItem: {
    color: "grey",
    display: "flex",
    alignItems: "center",
    lineHeight: "3rem",
  },
  informationTitleContainer: {
    width: "10rem",
  },
  informationBillContentItem: {
    lineHeight: "3rem",
  },
  informationDescriptionTextField: {
    padding: "12px",
  },
  informationSelectFieldContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    padding: "12px",
  },
  informationSelect: {
    width: "85%",
  },
  billDetailIcons: {
    marginRight: "0.5rem !important",
  },
  billDetailIcons_title: {
    fontSize: "100%",
    color: "orange",
  },
  buttonPayDown: {
    backgroundColor: "orange",
    width: "15vw",
    fontWeight: "bolder",
    fontSize: "0.9rem",
  },
  relationshipContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.1rem",
  },
  relationshipItemContainer: {
    width: "100%",
    display: "flex",
    padding: "1rem",
  },
  relationshipItem_moneyContainer: {
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    marginLeft: "5px",
  },
  relationshipItem_borrowWord: {
    color: "#e51b1b",
    fontWeight: "700",
  },
  BillImage_completedStamp: {
    width: "15vw",
    height: "auto",
    position: "absolute",
    bottom: "0",
    right: "-10%",
    filter:
      "invert(37%) sepia(82%) saturate(535%) hue-rotate(64deg) brightness(84%) contrast(89%)",
    transform: "rotate(-25deg)",
  },
  billSplitPayment_title: {
    fontWeight: "600",
    fontSize: "1.8rem",
    color: "#2F93E0",
  },
  billSplitPayment_total: {
    fontSize: "3.5rem",
  },
  billSplitPayment_textFieldContainer: {
    ...styleForFlexSpaceBetween,
    width: "50%",
    margin: "auto",
  },
  billSplitPayment_textField: {
    width: "30%",
  },
  billSummaryContainer: {
    fontSize: "1.1rem",
  },
  billSummaryItemContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  billSummaryItemTitle: {
    color: "#f27e15",
    fontWeight: "800",
    fontSize: "1.3rem",
  },
  billSummaryMoneyEachPerson: {
    fontStyle: "italic",
  },
  billSummaryAmountOfMember: {
    fontSize: "1.3rem",
    color: "#f27e15",
    fontWeight: "800",
  },
  billSummaryMemberListHeader: {
    ...styleForFlexSpaceBetween,
    width: "50%",
    margin: "auto",
    color: "#2F93E0",
  },
  billSummaryMemberItemName: {
    ...styleForFlexSpaceBetween,
    width: "50%",
    margin: "auto",
  },
  billSummaryMemberListHeaderTitle: {
    fontWeight: "600",
  },
  billSummaryMemberListHeader_paidColumnWidth: {
    width: "30%",
  },
  billSummaryBillImageContainer: {
    width: "100%",
  },
  billSummaryBillImage: {
    width: "50%",
    height: "auto",
    display: "flex",
    margin: "auto",
    borderStyle: "dashed",
    borderColor: "orange",
    padding: "0.5rem",
    marginBottom: "3rem",
  },
  buttonActionNext: {
    backgroundColor: "#ff9942 !important",
    color: "white",
  },
  buttonActionBack: {
    backgroundColor: "#ED054D  !important",
    color: "white",
  },
  buttonActionDone: {
    backgroundColor: "#2F93E0  !important",
    color: "white",
  },
  billImageContainer: {
    padding: "0.5rem !important",
    margin: "auto",
    position: "relative",
    width: "35rem",
    height: "25rem",
    borderStyle: "dashed",
    borderColor: "orange",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  billImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  billDefaultImage: {
    backgroundImage:
      "url('https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif')",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
  },
  submitButton: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleLoader: {
    color: "#2F93E0",
    marginLeft: theme.spacing(4),
  },
  defaultColor: {
    color: "grey",
  },
}));
