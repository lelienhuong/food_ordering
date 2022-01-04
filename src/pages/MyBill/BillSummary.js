import React, { useEffect, useState } from "react";
//utils
import formatDateTime from "../../utils/filters";
import moneyFormatter from "../../utils/moneyFormatter";

//icons
import ReceiptIcon from "@material-ui/icons/Receipt";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DescriptionIcon from "@material-ui/icons/Description";
import GroupIcon from "@material-ui/icons/Group";
//styles
import useStyles from "./styles";
function BillSummary(props) {
  const classes = useStyles();
  let [informationBill, setInformation] = useState(props.informationBill);
  let amountOfMembers = informationBill.members.length;
  const currency = JSON.parse(localStorage.getItem("auth")).currency;
  useEffect(() => {
    setInformation(props.informationBill);
  }, [informationBill]);

  return (
    <div className={classes.billSummaryContainer}>
      <div className={classes.billSummaryBillImageContainer}>
        <img
          alt="bill_image"
          className={classes.billSummaryBillImage}
          src={
            informationBill.image ||
            "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
          }
        />
      </div>
      <div className={classes.billSummaryItemContainer}>
        <div className={classes.billSummaryItemTitle}>$ Total Bill</div>
        <div>
          {moneyFormatter(Number.parseFloat(informationBill.total), currency)}
          <span className={classes.billSummaryMoneyEachPerson}>
            (
            {moneyFormatter(
              Number.parseFloat(informationBill.total / amountOfMembers),
              currency
            )}{" "}
            per/member)
          </span>
        </div>
      </div>
      <div>
        <div className={classes.billSummaryItemContainer}>
          <div className={classes.billSummaryItemTitle}>
            <ReceiptIcon /> Bill Name
          </div>
          <div>{informationBill.name}</div>
        </div>
        <div className={classes.billSummaryItemContainer}>
          <div className={classes.billSummaryItemTitle}>
            <ScheduleIcon /> Datetime
          </div>
          <div>{formatDateTime(Date.now())}</div>
        </div>
        <div className={classes.billSummaryItemContainer}>
          <div className={classes.billSummaryItemTitle}>
            <DescriptionIcon /> Description
          </div>
          <div>{informationBill.description}</div>
        </div>
      </div>
      <div className={classes.billSummaryAmountOfMember}>
        <GroupIcon /> {amountOfMembers} members
      </div>
      <div>
        <div className={classes.billSummaryMemberListHeader}>
          <div className={classes.billSummaryMemberListHeaderTitle}>
            Members
          </div>
          <div
            className={`${classes.billSummaryMemberListHeaderTitle} ${classes.billSummaryMemberListHeader_paidColumnWidth}`}
          >
            Paid
          </div>
        </div>
        {informationBill.listPaid.map((bill) => {
          return (
            <div className={classes.billSummaryMemberItemName}>
              <div>
                {informationBill.members.map((member) => {
                  if (member.value === bill._id) {
                    return member.label;
                  }
                })}
              </div>
              <div
                className={classes.billSummaryMemberListHeader_paidColumnWidth}
              >
                {moneyFormatter(Number.parseFloat(bill.paid), currency)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BillSummary;
