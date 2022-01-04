import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { authService } from "../../services/auth";
import { AvatarGroup } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import formatDateTime from "../../utils/filters";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { useHistory } from "react-router-dom";
import LayoutContext from "../../context/LayoutContext";
import moneyFormatter from "../../utils/moneyFormatter";
const TransactionsTag = (props) => {
  const [billTags, setBillTags] = useState([]);
  const history = useHistory();
  const { userID, currency } = useContext(LayoutContext);
  const fetchBillTags = async (userID, billId) => {
    try {
      const { data } = await authService.getBillTag(userID, billId);
      setBillTags(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBillTags(userID, props.billID);
  }, []);
  return (
    <Grid
      item
      xs={12}
      md={4}
      onClick={() =>
        history.push(`/my-profile/bills/bills-detail/${billTags.id}`)
      }
    >
      <Card>
        <CardActionArea style={{ height: "100%" }}>
          <CardMedia
            image={
              billTags.image === null ? "/image/default.jpg" : billTags.image
            }
            title={billTags.name}
            style={{
              height: "300px",
            }}
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "start" }}>
                <Typography gutterBottom variant="h4" component="h2">
                  {billTags.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {formatDateTime(billTags.datetime)}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: props.status === "lend" ? "green" : "red",
                  alignItems: "center",
                }}
              >
                <AccountBalanceWalletIcon fontSize="large" />
                <Typography style={{ fontSize: "1.5rem" }}>
                  {moneyFormatter(props.cost, currency, true)}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <AvatarGroup
                max={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  wordWrap: "wrap",
                }}
              >
                {!billTags.members
                  ? ""
                  : billTags.members.map((member, index) => {
                      if (member.avatar) {
                        return (
                          <Avatar src={member.avatar} key={index}></Avatar>
                        );
                      }
                      return (
                        <Avatar key={index}>
                          {member.name[0].toUpperCase()}
                        </Avatar>
                      );
                    })}
              </AvatarGroup>
              <AvatarGroup max={3}>
                {billTags.listLend === undefined &&
                billTags.listBorrow === undefined
                  ? ""
                  : props.status === "lend"
                  ? billTags.listLend[0].borrowers.map((item, index) => {
                      if (item.avatar !== undefined) {
                        return <Avatar src={item.avatar} key={index}></Avatar>;
                      }
                      return (
                        <Avatar key={index}>
                          {item.name[0].toUpperCase()}
                        </Avatar>
                      );
                    })
                  : billTags.listBorrow[0].lenders.map((item, index) => {
                      if (item.avatar) {
                        return <Avatar src={item.avatar} key={index}></Avatar>;
                      }
                      return (
                        <Avatar key={index}>
                          {item.name ? item.name[0].toUpperCase() : ""}
                        </Avatar>
                      );
                    })}
              </AvatarGroup>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default TransactionsTag;
