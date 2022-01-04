import React, { useEffect, useState } from "react";
//Material-UI components
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
//components
import ButtonsAction from "../../components/common/Table/ButtonsAction";
import Search from "../../components/common/Search/Search";

//icons
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DescriptionIcon from "@material-ui/icons/Description";
import PaymentIcon from "@material-ui/icons/Payment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
//styles
import clsx from "clsx";
import useStyles from "./styles";
//api services
import { groupService } from "../../services/group";
//react-hooks
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//utils
import formatDateTime from "../../utils/filters";
import moneyFormatter from "../../utils/moneyFormatter";
//skeleton
import Skeleton from "react-loading-skeleton";
import { friendService } from "../../services/friend";
import { notificationService } from "../../services/notification";
import Alert from "../../components/common/Alert/Alert";

function GroupDetail(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const currency = JSON.parse(localStorage.getItem("auth")).currency;
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };
  const params = useParams();

  const [groupInformation, setInformation] = useState({
    id: null,
    groupName: null,
    creator: [],
    description: null,
    datetime: null,
    image: null,
  });
  const [groupMemberList, setMemberList] = useState([]);
  const [groupTransaction, setTransaction] = useState([]);
  let [friendOptions, setFriendOptions] = useState([]);

  let originalNotificationForm = {
    id: "",
    from: "",
    to: "",
    type: "group",
  };

  let [notificationForm, setNotification] = useState(originalNotificationForm);
  useEffect(() => {
    const fetchOne = async () => {
      try {
        const responseFriendData = await friendService.getMany(auth._id);
        let friendOptions = [];
        responseFriendData.data.map((friend) => {
          friendOptions.push({
            value: friend._id,
            label: friend.name,
          });
        });
        setFriendOptions(friendOptions);
        const responseGroupData = await groupService.getOne(
          auth._id,
          params.id
        );
        setInformation({
          id: responseGroupData.data.group._id,
          groupName: responseGroupData.data.group.name,
          creator: {
            _id: responseGroupData.data.creator._id,
            avatar: responseGroupData.data.creator.avatar,
            name: responseGroupData.data.creator.name,
          },
          description: responseGroupData.data.group.description,
          datetime: responseGroupData.data.group.createdAt,
          image: responseGroupData.data.group.image,
        });
        setMemberList(responseGroupData.data.listMembers);
        setTransaction(responseGroupData.data.listBills);
        // friend options in order to add members in group
      } catch (err) {
        console.log(err);
      }
    };
    fetchOne();
  }, []);
  useEffect(() => {
    if (groupMemberList.length === 0) return;
    let newFriendOptions = [];
    friendOptions.map((friend) => {
      if (groupMemberList.every((member) => friend.value !== member._id)) {
        newFriendOptions.push({
          value: friend.value,
          label: friend.label,
        });
      }
    });
    setFriendOptions(newFriendOptions);
  }, [groupMemberList]);
  const handleSelected = (array) => {
    let members = [];
    Object.keys(array).forEach((key) => {
      array[key].map((member) => {
        members.push(member.value);
      });
    });
    let notification = {
      id: groupInformation.id,
      to: members,
      type: "invitedGroup",
    };
    setNotification(notification);
  };
  const handleAddMember = () => {
    notificationService.createOne(notificationForm, auth._id);
    let newFriendOptions = friendOptions.filter(
      (friend) => notificationForm.to.includes(friend.value) === false
    );
    setFriendOptions(newFriendOptions);
    setSnackBarOpen(true);
  };
  return (
    <div>
      <div className={`${classes.groupDetailContainer} ${classes.root}`}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSnackBarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert onClose={handleCloseSnackBar} severity="success">
            Sent Request
          </Alert>
        </Snackbar>
        <div className={classes.groupInformationContainer}>
          <div className={`${classes.groupImageContainer} component-center`}>
            <img
              alt="staple"
              className={classes.groupImage_stapleIcon}
              src="/image/staple.png"
            />
            {groupInformation.image ? (
              <img
                alt="group_image"
                className={classes.groupDetailImage}
                src={groupInformation.image}
              />
            ) : (
              <Skeleton width={"35rem"} height={"24.6rem"} />
            )}
          </div>

          {/* Information */}
          <div>
            <div className={classes.groupDetailTitle}>
              <PaymentIcon
                className={`${classes.groupDetailIcons} ${classes.groupDetailIcons_title}`}
              />{" "}
              Group Information
              <div className={classes.groupDetailTitle_line}></div>
            </div>
            <div className={classes.informationContainer}>
              <div className={classes.flex}>
                <div className={classes.informationTitleContainer}>
                  <div className={classes.informationGroupTitleItem}>
                    <PeopleAltIcon className={classes.groupDetailIcons} />
                    Group Name
                  </div>
                  <div className={classes.informationGroupTitleItem}>
                    <ScheduleIcon className={classes.groupDetailIcons} />{" "}
                    Datetime
                  </div>
                  <div className={classes.informationGroupTitleItem}>
                    <DescriptionIcon className={classes.groupDetailIcons} />{" "}
                    Description
                  </div>
                  <div className={classes.informationGroupTitleItem}>
                    <PersonIcon className={classes.groupDetailIcons} /> Creator
                  </div>
                </div>
                <div>
                  <div className={classes.informationGroupContentItem}>
                    {groupInformation.groupName}
                  </div>
                  <div className={classes.informationGroupContentItem}>
                    {formatDateTime(groupInformation.datetime)}
                  </div>
                  <div className={classes.informationGroupContentItem}>
                    {groupInformation.description === null ||
                    (typeof groupInformation.description !== "undefined" &&
                      groupInformation.description.length === 0) ? (
                      <span className={classes.defaultColor}>empty</span>
                    ) : (
                      groupInformation.description
                    )}
                  </div>
                  <div className={classes.informationGroupContentItem}>
                    <div className={classes.flex}>
                      <Avatar
                        className={classes.informationCreatorGroupAvatar}
                        alt={groupInformation.creator.name}
                        src={groupInformation.creator.avatar}
                      />
                      {groupInformation.creator.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Member List */}
            <div className={classes.groupDetailTitle}>
              <PeopleAltIcon
                className={`${classes.groupDetailIcons} ${classes.groupDetailIcons_title}`}
              />{" "}
              Members
              <div className={classes.groupDetailTitle_line}></div>
            </div>
            <div className={classes.groupSelectFieldContainer}>
              <div className={classes.groupSelect}>
                <Search
                  values={groupInformation.members}
                  handleSelected={(array) => handleSelected(array)}
                  name="listGuestIDs"
                  options={friendOptions}
                />
              </div>
              <Button
                onClick={handleAddMember}
                className={classes.buttonAddMembers}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Add members
              </Button>
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
                {groupMemberList.map((member) => (
                  <TableRow>
                    <TableCell>
                      <Avatar alt={member.name} src={member.avatar} />
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell
                      className={clsx(classes.tableCellStatusLender, {
                        [classes.tableCellStatusBorrower]:
                          Number.parseInt(member.total) < 0,
                      })}
                    >
                      {Number.parseInt(member.total) >= 0
                        ? moneyFormatter(
                            Number.parseInt(member.total),
                            currency,
                            true
                          )
                        : moneyFormatter(
                            -Number.parseInt(member.total),
                            currency,
                            true
                          )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Relationship */}
            <div className={classes.groupDetailTitle}>
              <BeachAccessIcon
                className={`${classes.groupDetailIcons} ${classes.groupDetailIcons_title}`}
              />{" "}
              List all transactions
              <div className={classes.groupDetailTitle_line}></div>
            </div>
            <Paper className={`${classes.root} ${classes.paperTableContainer}`}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID </TableCell>
                    <TableCell>BILL NAME</TableCell>
                    <TableCell>DATETIME</TableCell>
                    <TableCell>MEMBERS</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupTransaction.map(
                    (
                      { id, name, datetime, members, status, creator },
                      index
                    ) => (
                      <TableRow key={id}>
                        <TableCell>#{index + 1}</TableCell>
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
                            {Number.parseInt(status) >= 0
                              ? moneyFormatter(status, currency, true)
                              : moneyFormatter(
                                  -Number.parseInt(status),
                                  currency,
                                  true
                                )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <ButtonsAction
                            id={id}
                            idCreator={creator}
                            componentName="groupDetail"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GroupDetail;
