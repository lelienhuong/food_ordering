import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LayoutContext from "../../context/LayoutContext";
import { authService } from "../../services/auth";
import { useHistory } from "react-router";
import useStyles from "./styles";
import moneyFormatter from "../../utils/moneyFormatter";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import { CircularProgress } from "@material-ui/core";
const Lenders = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { userID, currency } = useContext(LayoutContext);
  const [lenders, setLenders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchListLenders = async (id) => {
    try {
      setLoading(true);
      const { data } = await authService.getListLend(id);
      setLenders(data);
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
    fetchListLenders(userID);
  }, []);

  return (
    <List className={classes.containerLenderBorrower}>
      {isLoading ? (
        <CircularProgress
          size={26}
          color="secondary"
          style={{ marginTop: "130px" }}
        />
      ) : lenders.length !== 0 ? (
        lenders.map((lender) => {
          return (
            <ListItem
              button
              key={lender._id}
              onClick={() => handleUserClick(lender._id, lender)}
            >
              <ListItemAvatar>
                <Avatar alt={lender.info.name} src={lender.info.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={lender.info.name}
                secondary={
                  <Typography style={{ color: "green" }}>
                    {moneyFormatter(lender.total, currency, true)}
                  </Typography>
                }
              />
            </ListItem>
          );
        })
      ) : (
        <div style={{ marginTop: "80.8px", color: "green" }}>
          <MoneyOffIcon style={{ fontSize: "100px" }} />
          <Typography variant="h2">Your lendings list is empty</Typography>
        </div>
      )}
    </List>
  );
};

export default Lenders;
