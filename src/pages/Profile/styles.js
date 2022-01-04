import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px ",
    // width: "calc(100% - 250px)",
    margin: "0 auto",
    // marginRight: "250px",
  },
  avatar: {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    marginBottom: "30px",
    fontSize: "100px",
  },
  lendDiv: {
    color: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "20vh",
    paddingLeft: "20px",
    paddingRight: "20px",
    border: "1px solid black",
  },
  borrowDiv: {
    color: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "20vh",
    paddingLeft: "20px",
    paddingRight: "20px",
    border: "1px solid black",
  },

  nestedOpen: {
    paddingLeft: "25px",
  },
  nestedClose: {
    paddingLeft: "5px",
  },
  progressCircleIcon: {
    display: "flex",
    alignItems: "center",
    height: "80vh",
  },
  profileDetails: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "50px",
  },
  mainForm: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "50%",
    margin: "0 auto",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.info.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.info.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.info.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },

  editImageContainer: {
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
  editImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },

  editDefaultImage: {
    backgroundImage:
      "url('https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif')",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
  },
  profileDetailsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "330px",
    marginRight: "30px",
  },
  containerLenderBorrower: {
    width: "60%",
    margin: "0 auto",
    marginBottom: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    borderRadius: "16px",
    height: "305px",
    overflow: "auto",
  },
  gridContainer: {
    marginTop: "20px",
  },
}));

export default useStyles;
