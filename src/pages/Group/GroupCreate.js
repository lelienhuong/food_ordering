import React, { useEffect, useState } from "react";
//Material-UI components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { CircularProgress } from "@material-ui/core";
//components
import Search from "../../components/common/Search/Search";
import Alert from "../../components/common/Alert/Alert";
//icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import GroupIcon from "@material-ui/icons/Group";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneAllIcon from "@material-ui/icons/DoneAll";
//styles
import useStyles from "./styles";
//hooks
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//function
import { validate } from "../../components/common/Validates/ValidateFunctions";
//services
import { friendService } from "../../services/friend";
import { groupService } from "../../services/group";

function GroupCreate(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  let [friendOptions, setFriendOptions] = useState([]);

  const require = true;
  let textFields = {
    name: { isError: false, message: null },
  };
  let [validateField, setValidateField] = useState(textFields);

  let [imageLink, setLink] = useState(
    "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
  );

  var originalGroupForm = {
    name: null,
    description: null,
    listGuestIDs: null,
    image: null,
  };

  let [groupInformation, setInformation] = useState(originalGroupForm);

  const [isSnackBarOpen, setSnackBarOpen] = useState({
    value: false,
    message: null,
    type: "success",
  });
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  useEffect(async () => {
    try {
      const { data } = await friendService.getMany(auth._id);
      let friendOptions = [];
      data.map((friend) => {
        friendOptions.push({ value: friend._id, label: friend.name });
      });
      setFriendOptions(friendOptions);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSelected = (array) => {
    let members = [];
    Object.keys(array).forEach((key) => {
      array[key].map((member) => {
        members.push(member.value);
      });
      let data = groupInformation;
      data[key] = members;
      setInformation({ ...data });
    });
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "image") {
      value = value.trim();
      if (value === null || value.length === 0) {
        value =
          "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif";
        setLink(
          "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
        );
      } else {
        setLink(value);
      }
    } else if (name === "description") {
      value = value.trim();
    }
    let data = groupInformation;
    data[name] = value;
    setInformation({ ...data });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await groupService.createOne(groupInformation, auth._id);
      setSnackBarOpen({
        value: true,
        message: "Created successfully a new group!",
        type: "success",
      });
      setTimeout(() => {
        history.push("/my-profile/groups/groups-index");
      }, 3000);
    } catch (err) {
      setSnackBarOpen({
        value: true,
        message: "Some errors occurred while trying to creating a new group!",
        type: "error",
      });
      console.log(err);
    }
  };
  return (
    <div className={classes.root}>
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
      <div className={classes.groupImageContainer}>
        {groupInformation.image ? (
          <img
            alt="group_image"
            className={classes.groupImage}
            src={imageLink}
          />
        ) : (
          <img
            alt="group_image"
            className={classes.groupImage}
            src={imageLink}
          ></img>
        )}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={classes.groupCreateForm}
      >
        <div className={classes.groupCreateItemContainer}>
          <div className={classes.groupCreateIconWidth}>
            <PhotoCameraIcon />
          </div>
          <div className={classes.groupCreateInputWidth}>
            <TextField
              fullWidth
              onChange={(e) => {
                handleInput(e);
              }}
              name="image"
              id="input-with-icon-grid"
              label="Image Link"
            />
          </div>
        </div>
        <div className={classes.groupCreateItemContainer}>
          <div className={classes.groupCreateIconWidth}>
            <GroupIcon />
          </div>
          <div className={classes.groupCreateInputWidth}>
            <TextField
              fullWidth
              required
              error={validateField["name"].isError}
              helperText={validateField["name"].message}
              onBlur={(e) =>
                validate(e, validateField, setValidateField, require, "all")
              }
              onChange={(e) => {
                handleInput(e);
                validate(e, validateField, setValidateField, require, "all");
              }}
              name="name"
              id="input-with-icon-grid"
              label="Group Name"
            />
          </div>
        </div>
        <div className={classes.groupCreateItemContainer}>
          <div className={classes.groupCreateIconWidth}>
            <DescriptionIcon />
          </div>
          <div className={classes.groupCreateInputWidth}>
            <TextField
              fullWidth
              onChange={(e) => {
                handleInput(e);
              }}
              name="description"
              id="input-with-icon-grid"
              label="Description"
            />
          </div>
        </div>
        <div className={classes.groupSelectFieldContainer}>
          <div>Add members</div>
          <div className={classes.groupSelect}>
            <Search
              values={groupInformation.members}
              handleSelected={(array) => handleSelected(array)}
              name="listGuestIDs"
              options={friendOptions}
            />
          </div>
        </div>
        <div className={classes.submitButton}>
          {isSnackBarOpen.value ? (
            <CircularProgress size={26} className={classes.circleLoader} />
          ) : (
            <Button
              startIcon={<DoneAllIcon />}
              disabled={isSnackBarOpen.value}
              className={classes.buttonActionDone}
              type="submit"
            >
              Done
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GroupCreate;
