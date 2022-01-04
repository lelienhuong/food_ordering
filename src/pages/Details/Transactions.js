import { Grid } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import LayoutContext from "../../context/LayoutContext";
import { authService } from "../../services/auth";
import TransactionsTag from "./TransactionsTag";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
const Transactions = (props) => {
  const [lendersId, setLendersId] = useState([]);
  const [borrowersId, setBorrowersId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userID } = useContext(LayoutContext);
  const targetID = window.location.pathname.split("/")[3];
  const classes = useStyles();
  const fetchCommonTransactions = async (userID, targetID) => {
    try {
      setIsLoading(true);
      const { data } = await authService.getCommonTransactionsDetails(
        userID,
        targetID
      );
      const borrowers = data.find((item) => item.status === "borrow");
      const lenders = data.find((item) => item.status === "lend");
      borrowers !== undefined && setBorrowersId(borrowers.detail);
      lenders !== undefined && setLendersId(lenders.detail);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCommonTransactions(userID, targetID);
  }, [userID, targetID]);

  return (
    <div className={classes.gridContainer}>
      {isLoading ? (
        <div className={classes.progressCircleIcon}>
          <CircularProgress color="secondary" size={32} />
        </div>
      ) : lendersId.length !== 0 || borrowersId.length !== 0 ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.gridContainer}
        >
          {lendersId.map((lender, index) => {
            return (
              <TransactionsTag
                billID={lender.billID}
                cost={lender.cost}
                status="lend"
                key={index}
              />
            );
          })}
          {borrowersId.map((borrower, index) => {
            return (
              <TransactionsTag
                billID={borrower.billID}
                cost={borrower.cost}
                status="borrow"
                key={index}
              />
            );
          })}
        </Grid>
      ) : (
        <div style={{ marginTop: "50px", color: "green" }}>
          <DoneOutlineIcon style={{ fontSize: "200px" }} />
          <Typography variant="h1">Transactions list is empty</Typography>
        </div>
      )}
    </div>
  );
};

export default Transactions;
