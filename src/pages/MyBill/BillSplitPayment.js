import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import moneyFormatter from "../../utils/moneyFormatter";

function BillSplitPayment(props) {
  const classes = useStyles();
  let [informationBill, setInformation] = useState(props.informationBill);
  let amountOfMembers = informationBill.members.length;
  const currency = JSON.parse(localStorage.getItem("auth")).currency;

  useEffect(() => {
    setInformation(props.informationBill);
  }, [informationBill]);

  const handleBlur = (e, idMember, index) => {
    let name = e.target.name;
    let value = e.target.value;
    props.billInformationControl({
      [name]: { _id: idMember, paid: Number.parseFloat(value) },
    });
    informationBill.listPaid.forEach((bill, indexBill) => {
      document.getElementById(`pay_${indexBill}`).value = bill.paid;
    });
    if (
      index < amountOfMembers - 1 &&
      informationBill.listPaid[index + 1].paid !== 0
    ) {
      document.getElementById(`pay_${index + 1}`).value =
        informationBill.listPaid[index + 1].paid;
    }
  };

  const handleReset = () => {
    props.resetMoneyPaid();
  };

  return (
    <div className={classes.textCenter}>
      <div className={classes.billSplitPayment_title}>Total Bill</div>
      <div className={classes.billSplitPayment_total}>
        {moneyFormatter(Number.parseFloat(informationBill.total), currency)}
      </div>
      <div>
        {moneyFormatter(
          Number.parseFloat(informationBill.total / amountOfMembers),
          currency
        )}{" "}
        per/member
      </div>
      {informationBill.members.map((member, index) => (
        <div className={classes.billSplitPayment_textFieldContainer}>
          <div>{member.label}</div>
          <TextField
            className={classes.billSplitPayment_textField}
            onBlur={(e) => handleBlur(e, member.value, index)}
            defaultValue={informationBill["listPaid"][index].paid}
            name="listPaid"
            required
            id={`pay_${index}`}
            placeholder={`${moneyFormatter(
              Number.parseFloat(informationBill.total / amountOfMembers),
              currency
            )}`}
            type="number"
            autoComplete="cc-name"
          />
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleReset()}
        className={`${classes.button} ${classes.buttonActionDone}`}
      >
        RESET
      </Button>
    </div>
  );
}

export default BillSplitPayment;
