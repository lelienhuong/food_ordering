import React, { useEffect, useState } from "react";
//components
import ButtonsAction from "../../components/common/Table/ButtonsAction";
//Material-UI components
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
//icons
import ScheduleIcon from "@material-ui/icons/Schedule";
//style
import useStyles from "./styles";
//services
import { billService } from "../../services/bill";
//react-hooks
import { useSelector } from "react-redux";
// making styles library
import clsx from "clsx";
//utils
import formatDateTime from "../../utils/filters";
import moneyFormatter from "../../utils/moneyFormatter";

//loading skeleton
import Skeleton from "react-loading-skeleton";

function BillList(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const currency = JSON.parse(localStorage.getItem("auth")).currency;
  let [isCompleted, setCompleted] = useState(false);
  // control skeleton
  let [isDisplay, setDisplay] = useState(false);
  setTimeout(() => {
    setDisplay(true);
  }, 4000);
  var [billData, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await billService.getMany(auth._id);
        setData(data);
        setCompleted(data.completed);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {isDisplay ? (
        <Paper className={`${classes.root} ${classes.paperTableContainer}`}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BILL NAME</TableCell>
                <TableCell>DATETIME</TableCell>
                <TableCell>MEMBERS</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billData &&
                billData.map(
                  (
                    { id, name, datetime, members, status, creator, completed },
                    index
                  ) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        <div className={classes.tableCellIconContainer}>
                          <ScheduleIcon
                            className={classes.tableCellIcon_Schedule}
                          />{" "}
                          {formatDateTime(datetime)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AvatarGroup max={4}>
                          {members.map((member, index) => (
                            <Avatar
                              key={index}
                              alt={member.name}
                              src={member.avatar}
                            />
                          ))}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell>
                        <div
                          className={clsx(
                            classes.tableCellIconContainer,
                            classes.tableCellStatusLender,
                            {
                              [classes.tableCellStatusBorrower]:
                                Number.parseInt(status) < 0,
                            }
                          )}
                        >
                          {Number.parseFloat(status) >= 0
                            ? moneyFormatter(
                                Number.parseFloat(status),
                                currency,
                                true
                              )
                            : moneyFormatter(
                                -Number.parseFloat(status),
                                currency,
                                true
                              )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ButtonsAction
                          setBillListData={(data) => setData(data)}
                          isCompleted={completed}
                          id={id}
                          idCreator={creator}
                          componentName="bill"
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Paper className={`${classes.root} ${classes.paperTableContainer}`}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell style={{ width: "25%" }}>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton circle={true} height={50} width={50} count={4} />
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton circle={true} height={50} width={50} count={4} />
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton circle={true} height={50} width={50} count={4} />
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
                <TableCell>
                  <Skeleton />{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
}

export default BillList;
