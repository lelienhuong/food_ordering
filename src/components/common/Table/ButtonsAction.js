import React from "react";
import { useHistory } from "react-router-dom";

import { ButtonGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyle from "./styles";
import { useSelector } from "react-redux";
import { billService } from "../../../services/bill";
import clsx from "clsx";
import { groupService } from "../../../services/group";

function ButtonsAction(props) {
  const classes = useStyle();
  const history = useHistory();
  const { _id } = useSelector((state) => state.auth);
  const handleShowDetailBill = () => {
    if (
      props.componentName === "bill" ||
      props.componentName === "groupDetail"
    ) {
      history.push(`/my-profile/bills/bills-detail/${props.id}`);
    } else if (props.componentName === "group") {
      history.push(`/my-profile/groups/groups-detail/${props.id}`);
    }
  };
  const handleArchivedBill = async () => {
    if (props.isCompleted !== true) return;
    try {
      await billService.archiveBill(_id, props.id);
      const { data } = await billService.getMany(_id);
      props.setBillListData(data);
    } catch (err) {}
  };
  const handleArchivedGroup = async () => {
    if (props.isCompleted !== true) return;
    try {
      await groupService.archiveGroup(_id, props.id);
      const { data } = await groupService.getMany(_id);
      props.setGroupListData(data);
    } catch (err) {}
  };
  return (
    <ButtonGroup>
      <Button
        variant="contained"
        className={classes.buttonShowIcon}
        startIcon={<VisibilityIcon />}
        onClick={handleShowDetailBill}
      >
        SHOW
      </Button>
      <Button
        variant="contained"
        className={clsx(
          classes.buttonArchivedIcon,
          { [classes.hidden]: props.componentName === "groupDetail" },
          {
            [classes.buttonDisableArchivedIcon]: props.isCompleted !== true,
          }
        )}
        startIcon={<DeleteIcon />}
        onClick={
          props.componentName === "bill"
            ? handleArchivedBill
            : handleArchivedGroup
        }
      >
        {" "}
        ARCHIVE
      </Button>
    </ButtonGroup>
  );
}

export default ButtonsAction;
