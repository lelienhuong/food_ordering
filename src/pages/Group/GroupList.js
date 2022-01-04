import React, { useEffect } from "react";
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

import ButtonsAction from "../../components/common/Table/ButtonsAction";
//loading skeleton
import Skeleton from "react-loading-skeleton";
//utils
import moneyFormatter from "../../utils/moneyFormatter";
import formatDateTime from "../../utils/filters";
//styles
import useStyles from "./styles";
import clsx from "clsx";
import { groupService } from "../../services/group";
import { useState } from "react";
import { useSelector } from "react-redux";

function GroupList(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const currency = JSON.parse(localStorage.getItem("auth")).currency;

  // control skeleton
  let [isDisplay, setDisplay] = useState(false);
  setTimeout(() => {
    setDisplay(true);
  }, 2000);

  var [groupData, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await groupService.getMany(auth._id);
        setData(data);
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
                <TableCell>GROUP NAME</TableCell>
                <TableCell>DATETIME</TableCell>
                <TableCell>MEMBERS</TableCell>
                <TableCell>COSTS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupData &&
                groupData.map(
                  (
                    { id, name, datetime, members, total, creator, completed },
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
                                Number.parseFloat(total) < 0,
                            }
                          )}
                        >
                          {Number.parseFloat(total) >= 0
                            ? moneyFormatter(
                                Number.parseFloat(total),
                                currency,
                                true
                              )
                            : moneyFormatter(
                                -Number.parseFloat(total),
                                currency,
                                true
                              )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ButtonsAction
                          setGroupListData={(data) => setData(data)}
                          isCompleted={completed}
                          id={id}
                          idCreator={creator._id}
                          componentName="group"
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

export default GroupList;
