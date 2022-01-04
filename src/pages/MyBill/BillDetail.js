import React, { useEffect, useState } from "react";
//Material-UI components
import Divider from "@material-ui/core/Divider";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

//icons
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DescriptionIcon from "@material-ui/icons/Description";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaymentIcon from "@material-ui/icons/Payment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
//styles
import useStyles from "./styles";
//api services
import { billService } from "../../services/bill";
//react-hooks
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//utils
import formatDateTime from "../../utils/filters";
import moneyFormatter from "../../utils/moneyFormatter";
//skeleton
import Skeleton from "react-loading-skeleton";
import { notificationService } from "../../services/notification";
import Alert from "../../components/common/Alert/Alert";

function BillDetail(props) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const currency = JSON.parse(localStorage.getItem("auth")).currency;

  const params = useParams();
  const username = auth.name.trim();

  const [isCompleted, setCompleted] = useState(false);
  const [billInformation, setBillInformation] = useState({});
  const [billCreator, setBillCreator] = useState({});
  const [billMemberList, setBillMemberList] = useState([]);
  const [billTransaction, setBillTransaction] = useState(null);

  const [isSnackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: null,
    type: "success",
  });
  const handleCloseSnackBar = () => {
    setSnackBarOpen({ value: false, message: null, type: "success" });
  };

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const { data } = await billService.getOne(auth._id, params.id);
        setBillInformation(data.info);
        setBillMemberList(data.listMembers);
        setBillTransaction(data.listTransactions);
        setBillCreator(data.creator);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOne();
  }, []);

  useEffect(() => {
    if (!billTransaction) return;
    const isCompletedBill = billTransaction.every(
      (transaction) =>
        transaction.borrower._id !== auth._id &&
        transaction.lender._id !== auth._id
    );
    billTransaction.length === 0 || isCompletedBill === true
      ? setCompleted(true)
      : setCompleted(false);
  }, [billTransaction]);

  const handleDemandBill = (to) => {
    let notification = {
      id: billInformation._id,
      to: [to],
      type: "reminder",
    };
    notificationService.createOne(notification, auth._id);
    setSnackBarOpen({
      value: true,
      message: "Transaction requested",
      type: "success",
    });
  };

  const handlePayDown = (to) => {
    let notification = {
      id: billInformation._id,
      to: [to],
      type: "payDown",
    };
    notificationService.createOne(notification, auth._id);
    setSnackBarOpen({
      value: true,
      message: "Transaction requested",
      type: "success",
    });
  };
  return (
    <div className={`${classes.billDetailContainer} ${classes.root}`}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen.value}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={isSnackBarOpen.type}>
          {isSnackBarOpen.message}
        </Alert>
      </Snackbar>
      <div className={classes.billInformationContainer}>
        <div className={`${classes.billImageContainer} component-center`}>
          <img
            alt="complete_stamp"
            className={
              isCompleted
                ? `${classes.BillImage_completedStamp}`
                : `${classes.hidden}`
            }
            src="/image/completed-stamp.png"
          />
          <img
            alt="staple"
            className={classes.billImage_stapleIcon}
            src="/image/staple.png"
          />
          {billInformation.image ? (
            <img
              alt="bill_image"
              className={classes.billDetailImage}
              src={billInformation.image}
            />
          ) : (
            <Skeleton width={"35rem"} height={"24.6rem"} />
          )}
        </div>

        {/* Information */}
        <div>
          <div className={classes.billDetailTitle}>
            <PaymentIcon
              className={`${classes.billDetailIcons} ${classes.billDetailIcons_title}`}
            />{" "}
            Bill Information
            <div className={classes.billDetailTitle_line}></div>
          </div>
          <div className={classes.informationContainer}>
            <div className={classes.flex}>
              <div className={classes.informationTitleContainer}>
                <div className={classes.informationBillTitleItem}>
                  <PersonIcon className={classes.billDetailIcons} />
                  Bill Name
                </div>
                <div className={classes.informationBillTitleItem}>
                  <ScheduleIcon className={classes.billDetailIcons} /> Datetime
                </div>
                <div className={classes.informationBillTitleItem}>
                  <DescriptionIcon className={classes.billDetailIcons} />{" "}
                  Description
                </div>
                <div className={classes.informationBillTitleItem}>
                  <PersonIcon className={classes.billDetailIcons} /> Creator
                </div>
              </div>
              <div>
                <div className={classes.informationBillContentItem}>
                  {billInformation.name}
                </div>
                <div className={classes.informationBillContentItem}>
                  {formatDateTime(billInformation.createdAt)}
                </div>
                <div className={classes.informationBillContentItem}>
                  {billInformation.description === null ||
                  (typeof billInformation.description !== "undefined" &&
                    billInformation.description.length === 0) ? (
                    <span className={classes.defaultColor}>empty</span>
                  ) : (
                    billInformation.description
                  )}
                </div>
                <div className={classes.informationBillContentItem}>
                  <div className={classes.flex}>
                    <Avatar
                      className={classes.informationCreatorBillAvatar}
                      alt={billCreator.name}
                      src={billCreator.avatar}
                    />
                    {billCreator.name}
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className={classes.flex}>
              <div
                className={`${classes.informationBillTitleItem} ${classes.informationTitleContainer}`}
              >
                <MonetizationOnIcon className={classes.billDetailIcons} /> Total
              </div>
              <div className={classes.informationBillContentItem}>
                {moneyFormatter(
                  Number.parseFloat(billInformation.cost),
                  currency,
                  true
                )}
              </div>
            </div>
          </div>
          {/* Member List */}
          <div className={classes.billDetailTitle}>
            <PeopleAltIcon
              className={`${classes.billDetailIcons} ${classes.billDetailIcons_title}`}
            />{" "}
            Members
            <div className={classes.billDetailTitle_line}></div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerTable}>Avatar</TableCell>
                <TableCell className={classes.headerTable}>Name</TableCell>
                <TableCell className={classes.headerTable}>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billMemberList.map((member) => (
                <TableRow>
                  <TableCell>
                    <Avatar alt={member.name} src={member.avatar} />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    {moneyFormatter(
                      Number.parseFloat(member.paid),
                      currency,
                      true
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Relationship */}
          <div className={classes.billDetailTitle}>
            <BeachAccessIcon
              className={`${classes.billDetailIcons} ${classes.billDetailIcons_title}`}
            />{" "}
            Relationship
            <div className={classes.billDetailTitle_line}></div>
          </div>
          {billTransaction && (
            <>
              {" "}
              {billTransaction.map((transaction) => (
                <div className={classes.relationshipContainer}>
                  <div className={classes.relationshipItemContainer}>
                    <div>
                      {transaction.borrower.name.trim() === username
                        ? "You"
                        : transaction.borrower.name}{" "}
                      <span className={classes.relationshipItem_borrowWord}>
                        borrowed
                      </span>{" "}
                      {transaction.lender.name.trim() === username
                        ? "your"
                        : transaction.lender.name}
                    </div>
                    <div className={classes.relationshipItem_moneyContainer}>
                      {" "}
                      {moneyFormatter(
                        Number.parseFloat(transaction.cost),
                        currency,
                        true
                      )}
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    className={
                      transaction.lender.name.trim() === username
                        ? `${classes.buttonPayDown}`
                        : `${classes.hidden}`
                    }
                    startIcon={<NotificationsNoneIcon />}
                    onClick={() => handleDemandBill(transaction.borrower._id)}
                  >
                    {" "}
                    DEMAND BILL
                  </Button>
                  <Button
                    variant="contained"
                    className={
                      transaction.borrower.name.trim() === username
                        ? `${classes.buttonPayDown}`
                        : `${classes.hidden}`
                    }
                    startIcon={<PaymentIcon />}
                    onClick={() => handlePayDown(transaction.lender._id)}
                  >
                    {" "}
                    PAY DOWN
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BillDetail;
