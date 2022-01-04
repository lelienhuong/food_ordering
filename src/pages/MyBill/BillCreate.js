import React, { useRef, useState } from "react";

//components
import BillSplitPayment from "./BillSplitPayment";
import InformationBillCreateForm from "./InformationBillCreateForm";
import BillSummary from "./BillSummary";

// Material-UI components
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";

//styles
import useStyles from "./styles";
import clsx from "clsx";
//hooks
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//services
import { billService } from "../../services/bill";

function BillCreate(props) {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const currency = JSON.parse(localStorage.getItem("auth")).currency;

  var originalInformationForm = {
    name: null,
    total: null,
    members: [],
    groups: null,
    description: null,
    listPaid: [],
    image: null,
  };
  let [isValid, setValid] = useState(false);
  let [isRightMembers, setIsRightMembers] = useState(false);

  const [isSnackBarDoneCreatingOpen, setSnackBarDoneCreating] = useState(false);
  const handleCloseDoneCreatingSnackBar = () => {
    setSnackBarDoneCreating(false);
  };

  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };
  const [isSplitComplete, setSnackBarSplitCompleteOpen] = useState(false);
  const handleCloseBillSplitAlert = () => {
    setSnackBarSplitCompleteOpen(false);
  };

  /**
   * isEqualToBillTotal variable means if it's true then screen will show alert message "PLease make sure.." that some fields not correct
   * and if it's false then screen will show alert message "Bill split has not finished yet"
   */
  let [isEqualToBillTotal, setEqualToBillTotal] = useState(true);
  var [billInformation, setInformation] = useState(originalInformationForm);

  /**
   * counterNextStep variable is in order to input in listPaid a default array with value of paid is 0
   */
  let counterNextStep = useRef(0);

  /**
   * isFirst variable is in order to check condition if total of money paid input not equal in the first time
   */
  let isFirst = useRef(true);

  /**
   * checkHasLastOneZeroPaidForFirstTime function helps automaticly fill out the last input field in bill split component
   */
  const checkHasLastOneZeroPaidForFirstTime = (key) => {
    let ammountOfZeroPaid = 0;
    let indexOfOnlyOneZeroPaid = -1;
    billInformation[key].map((bill, index) => {
      if (bill.paid == 0) {
        ammountOfZeroPaid++;
        indexOfOnlyOneZeroPaid = index;
      }
    });
    if (ammountOfZeroPaid != 1) {
      return -1;
    }
    return indexOfOnlyOneZeroPaid;
  };

  const validatePaid = (key, indexBill, paid) => {
    let data = billInformation;
    var sum = 0;
    var total = data.total;
    data[key].map((bill, index) => {
      if (index != indexBill) {
        let billPay = Number.parseInt(bill.paid);
        sum = sum + billPay;
      }
    });
    const afterSumWithPaid = Number.parseInt(sum) + Number.parseInt(paid);
    data[key][indexBill].paid = paid;
    if (afterSumWithPaid > total) {
      let indexArrayPaidExceptCurrentInput = null;
      let maxMoneyPaidExceptCurrentInput = -1;
      data[key].map((item, index) => {
        if (
          index !== indexBill &&
          Number.parseInt(item.paid) > maxMoneyPaidExceptCurrentInput
        ) {
          maxMoneyPaidExceptCurrentInput = item.paid;
          indexArrayPaidExceptCurrentInput = index;
        }
      });
      /**
       * if recent input value satisfies the first case, the max money value except itself will decrease so that
       * money paid is equal to bill total. In constract, it will decrease itself to equal to bill total.
       */
      if (
        maxMoneyPaidExceptCurrentInput > 0 &&
        afterSumWithPaid - Number.parseInt(total) <
          maxMoneyPaidExceptCurrentInput
      ) {
        let moneyPaidAfter =
          Number.parseInt(data[key][indexArrayPaidExceptCurrentInput].paid) -
          (Number.parseInt(sum) +
            Number.parseInt(paid) -
            Number.parseInt(total));
        data[key][indexArrayPaidExceptCurrentInput].paid = moneyPaidAfter;
        setInformation({ ...data });
      } else {
        paid = Number.parseInt(total) - Number.parseInt(sum);
        data[key][indexBill].paid = paid;
        setInformation({ ...data });
      }
      setInformation({ ...data });
    }
    setInformation({ ...data });
    if (afterSumWithPaid < total) {
      if (isFirst.current) {
        console.log(isFirst.current);
        let indexOfZeroPaid = checkHasLastOneZeroPaidForFirstTime(key);
        if (indexOfZeroPaid != -1) {
          isFirst.current = false;
          console.log(isFirst);
          data[key][indexOfZeroPaid].paid =
            Number.parseInt(total) -
            Number.parseInt(sum) -
            Number.parseInt(paid);
          setInformation({ ...data });
        }
      } else {
        let arrayPaidExceptCurrentInput = [];
        data[key].map((item, index) => {
          if (index !== indexBill) {
            arrayPaidExceptCurrentInput.push(index);
          }
        });
        data[key][arrayPaidExceptCurrentInput[0]].paid =
          Number.parseInt(data[key][arrayPaidExceptCurrentInput[0]].paid) +
          (Number.parseInt(total) -
            Number.parseInt(sum) -
            Number.parseInt(paid));
        setInformation({ ...data });
      }
    } else if (afterSumWithPaid == total) {
      setSnackBarSplitCompleteOpen(true);
      console.log("NICE");
    }
  };
  const savedInformation = (form) => {
    Object.keys(form).map((key) => {
      if (key == "listPaid") {
        billInformation[key].map((bill, index) => {
          if (bill._id == form[key]._id) {
            validatePaid(key, index, form[key].paid);
          }
        });
      } else {
        let data = billInformation;
        data[key] = form[key];
        setInformation({ ...data });
      }
    });
  };
  function getSteps() {
    return ["Information bill", "Split the bill payment", "Completed"];
  }
  function resetMoneyPaid() {
    let data = billInformation;
    data.members.map((member, index) => {
      data.listPaid[index].paid = 0;
      document.getElementById(`pay_${index}`).value = 0;
    });
    setInformation({ ...data });
    isFirst.current = true;
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InformationBillCreateForm
            isRightMembers={(valid) => setIsRightMembers(valid)}
            isValid={(valid) => setValid(valid)}
            informationBill={billInformation}
            billInformationControl={(form) => savedInformation(form)}
          />
        );
      case 1:
        return (
          <BillSplitPayment
            resetMoneyPaid={() => resetMoneyPaid()}
            informationBill={billInformation}
            billInformationControl={(form) => savedInformation(form)}
          />
        );
      case 2:
        return (
          <BillSummary
            informationBill={billInformation}
            billInformationControl={(form) => savedInformation(form)}
          />
        );
      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep == 0) {
      if (
        isValid &&
        billInformation.members !== null &&
        billInformation.groups !== null &&
        isRightMembers == true
      ) {
        if (
          counterNextStep.current == 0 ||
          billInformation.members.length !== billInformation.listPaid.length
        ) {
          billInformation.listPaid = [];
          billInformation.members.map((member, index) => {
            billInformation.listPaid.push({
              _id: member.value,
              paid: 0,
            });
          });
          setInformation(billInformation);
          counterNextStep.current++;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setSnackBarOpen(true);
      }
    } else if (activeStep == 1) {
      let sum = 0;
      billInformation.listPaid.map((member) => {
        sum = sum + Number.parseInt(member.paid);
      });
      if (
        billInformation.listPaid.every((member) => member.paid >= 0) === true &&
        sum == billInformation.total
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        if (
          billInformation.listPaid.every((member) => member.paid >= 0) === false
        ) {
          setEqualToBillTotal(true);
        } else {
          setEqualToBillTotal(false);
        }
        setSnackBarOpen(true);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    let { name, total, description, listPaid, groups, image } = billInformation;
    listPaid.forEach((list) => {
      list.paid =
        Number.parseFloat(list.paid) /
        Number.parseFloat(JSON.parse(localStorage.getItem("rate"))[currency]);
    });
    total =
      Number.parseFloat(total) /
      Number.parseFloat(JSON.parse(localStorage.getItem("rate"))[currency]);
    let billInformationForm = {
      name: name,
      description: description,
      total: total,
      groupID: groups.value,
      listPaid: listPaid,
      image: image,
    };
    try {
      billService.createOne(auth._id, billInformationForm);
    } catch (err) {
      console.log(err);
    }
    setSnackBarDoneCreating(true);
    setTimeout(() => {
      history.push("/my-profile/bills/bills-index");
    }, 3000);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className={classes.root} style={{ width: "auto", padding: "24px" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarDoneCreatingOpen}
        autoHideDuration={3000}
        onClose={handleCloseDoneCreatingSnackBar}
      >
        <Alert onClose={handleCloseDoneCreatingSnackBar} severity="success">
          Create a new bill successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="error">
          {isEqualToBillTotal
            ? "Please make sure all fields are filled in correctly!"
            : "Bill split has not already finished yet!"}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSplitComplete}
        autoHideDuration={3000}
        onClose={handleCloseBillSplitAlert}
      >
        <Alert onClose={handleCloseBillSplitAlert} severity="success">
          Bill split has already finished!
        </Alert>
      </Snackbar>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.textCenter}>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <div className={classes.submitButton}>
              {isSnackBarDoneCreatingOpen ? (
                <CircularProgress size={26} className={classes.circleLoader} />
              ) : (
                <Button
                  onClick={handleDone}
                  className={`${classes.button} ${classes.buttonActionDone}`}
                  disabled={isSnackBarDoneCreatingOpen}
                  variant="contained"
                  type="submit"
                  value="Submit"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div classes={classes.instructionsButtons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={clsx(
                  { [classes.hidden]: activeStep === 0 },
                  classes.button,
                  classes.buttonActionBack
                )}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={`${classes.button} ${classes.buttonActionNext}`}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BillCreate;
