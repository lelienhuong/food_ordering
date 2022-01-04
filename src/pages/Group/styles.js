import { makeStyles } from "@material-ui/core";

const propsTableComponent = {
  colorScheduleIcon: "#40AEDF",
  colorAttachMoneyIconLender: "#45ab45",
  colorAttachMoneyIconBorrower: "#D0021B",
};
export default makeStyles((theme) => ({
  root: {
    "& .MuiButton-contained:hover": {
      backgroundColor: "orange",
    },
    width: "auto",
    padding: "24px",
    "& .MuiStepIcon-active": {
      color: "#1976d2",
    },
    "& .MuiStepIcon-completed": {
      color: "#1976d2",
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
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid #2F93E0",
    },
  },
  textCenter: {
    textAlign: "center",
  },
  paperTableContainer: {
    overflowX: "auto",
  },
  tableCellIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  tableCellStatusLender: {
    color: `${propsTableComponent.colorAttachMoneyIconLender} !important`,
    fontWeight: "600 !important",
  },
  tableCellStatusBorrower: {
    color: `${propsTableComponent.colorAttachMoneyIconBorrower} !important`,
    fontWeight: "600 !important",
  },
  tableCellIcon_AttachMoney: {
    marginRight: "5px",
  },
  tableCellIcon_Schedule: {
    marginRight: "5px",
    color: propsTableComponent.colorScheduleIcon,
  },
  groupImageContainer: {
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
  groupImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  groupSelectFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2rem",
    marginBottom: "2rem",
    fontWeight: "600",
  },
  groupCreateItemContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  groupSelect: {
    width: "85%",
  },
  groupDefaultImage: {
    backgroundImage:
      "url('https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif')",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
  },
  buttonActionDone: {
    backgroundColor: "#2F93E0  !important",
    color: "white",
    display: "flex",
    margin: "auto",
    width: "10rem",
    fontWeight: "bolder",
    marginBottom: "3rem",
    marginTop: "3rem",
  },
  groupCreateForm: {
    marginLeft: "3rem",
    marginRight: "3rem",
  },
  groupCreateIconWidth: {
    width: "5%",
  },
  groupCreateInputWidth: {
    width: "95%",
  },
  buttonAddMembers: {
    backgroundColor: "#24a324 !important",
    color: "white",
    width: "10rem",
    fontWeight: "bolder",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
  informationContainer: {
    width: "fit-content",
  },
  groupDetailContainer: {
    padding: "0 1.5rem 1.5rem 1.5rem",
  },
  groupDetailTitle: {
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
  groupDetailTitle_line: {
    height: "0.15rem",
    width: "5rem",
    backgroundColor: "orange",
    marginLeft: "5px",
  },
  groupImage_stapleIcon: {
    position: "absolute",
    top: "-5%",
    left: "-5%",
    width: "15%",
    height: "auto",
    filter:
      "invert(61%) sepia(48%) saturate(6818%) hue-rotate(163deg) brightness(97%) contrast(100%);",
  },
  groupDetailImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  informationGroupTitleItem: {
    color: "grey",
    display: "flex",
    alignItems: "center",
    lineHeight: "3rem",
  },
  informationTitleContainer: {
    width: "10rem",
  },
  informationGroupContentItem: {
    lineHeight: "3rem",
  },
  informationDescriptionTextField: {
    padding: "12px",
  },
  groupDetailIcons: {
    marginRight: "0.5rem !important",
  },
  groupDetailIcons_title: {
    fontSize: "100%",
    color: "orange",
  },
  informationCreatorGroupAvatar: {
    marginRight: "1rem !important",
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
  activeStatus: {
    color: "#45ab45",
    fontWeight: "600",
  },
  waitingStatus: {
    color: "#D0021B",
    fontWeight: "600",
  },
}));
