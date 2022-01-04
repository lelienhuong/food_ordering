import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LayoutContext from "../../context/LayoutContext";
import { authService } from "../../services/auth";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import { CircularProgress } from "@material-ui/core";
import moneyFormatter from "../../utils/moneyFormatter";
const Borrowers = (props) => {
  const classes = useStyles();
  const { userID, currency } = useContext(LayoutContext);
  const [borrowers, setBorrowers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const fetchListBorrowers = async (id) => {
    try {
      setLoading(true);
      const { data } = await authService.getListBorrow(id);
      setBorrowers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (id) => {
    history.push(`/my-profile/transaction-details/${id}`);
  };

  useEffect(() => {
    fetchListBorrowers(userID);
  }, []);

  return (
    <List className={classes.containerLenderBorrower}>
      {isLoading ? (
        <CircularProgress
          size={26}
          color="secondary"
          style={{ marginTop: "130px" }}
        />
      ) : borrowers.length !== 0 ? (
        borrowers.map((borrower) => {
          return (
            <ListItem
              button
              key={borrower.info._id}
              onClick={() => handleUserClick(borrower.info._id)}
            >
              <ListItemAvatar>
                {borrower.info.avatar ? (
                  <Avatar alt={borrower.info.name} src={borrower.info.avatar} />
                ) : (
                  <Avatar alt={borrower.info.name}>
                    {borrower.info.name[0].toUpperCase()}
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={borrower.info.name}
                secondary={
                  <Typography style={{ color: "red" }}>
                    {moneyFormatter(borrower.total, currency, true)}
                  </Typography>
                }
              />
            </ListItem>
          );
        })
      ) : (
        <div style={{ marginTop: "80.8px", color: "red" }}>
          <MoneyOffIcon style={{ fontSize: "100px" }} />
          <Typography variant="h2">Your borrowings list is empty</Typography>
        </div>
      )}
    </List>
  );
};

export default Borrowers;
