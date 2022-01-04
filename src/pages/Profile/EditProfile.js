import React, { useState, useContext } from "react";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { authService } from "../../services/auth";
import { withRouter } from "react-router-dom";
import LayoutContext from "../../context/LayoutContext";
import { useHistory } from "react-router";
import { REGISTER } from "../../store/actions/types";
import currencyInfo from "../../utils/currencyInfo";
const EditProfile = () => {
  const defaultUserInfo = JSON.parse(localStorage.getItem("auth"));
  const { userID, rate, currency } = useContext(LayoutContext);
  const [passwordValue, setPasswordValue] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: defaultUserInfo.name,
    phone: defaultUserInfo.phone,
    balance: defaultUserInfo.balance * rate[currency],
    avatar: defaultUserInfo.avatar,
    currency: defaultUserInfo.currency,
  });

  const handleInput = (key, input) => {
    if (key === "currency") {
      setUserInfo((prev) => ({
        ...prev,
        balance:
          Number.parseFloat(rate[input]) *
          Number.parseFloat(defaultUserInfo.balance),
        currency: input,
      }));
    } else
      setUserInfo((prev) => ({
        ...prev,
        [key]: input,
      }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const submitEditForm = async (e) => {
    e.preventDefault();
    const userEditInfo = {
      name: userInfo.name,
      phone: userInfo.phone,
      avatar: userInfo.avatar,
      balance: userInfo.balance / rate[userInfo.currency],
      currency: userInfo.currency,
      password: passwordValue,
    };
    try {
      setIsLoading(true);
      await authService.editProfile(userID, userEditInfo);
      dispatch({
        type: REGISTER,
        payload: {
          data: {
            ...defaultUserInfo,
            ...userEditInfo,
          },
        },
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
      history.push("/my-profile");
    }
  };

  return (
    <div>
      <div className={classes.editImageContainer}>
        {userInfo.avatar ? (
          <img
            alt="your_image"
            className={classes.editImage}
            src={userInfo.avatar}
          />
        ) : (
          <div className={`component-center ${classes.editDefaultImage}`}></div>
        )}
      </div>

      <form
        onSubmit={(e) => submitEditForm(e)}
        noValidate
        className={classes.mainForm}
      >
        <TextField
          id="name"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={userInfo.name}
          onChange={(e) => handleInput("name", e.target.value)}
          margin="normal"
          type="text"
          label="Name"
          color="secondary"
          fullWidth
        />
        <TextField
          id="phone"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={userInfo.phone}
          onChange={(e) => handleInput("phone", e.target.value)}
          margin="normal"
          type="text"
          label="Phone Number"
          color="secondary"
        />
        <TextField
          id="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          error={passwordValue.length < 6 && passwordValue.length !== 0}
          helperText={
            passwordValue.length < 6 && passwordValue.length !== 0
              ? "Password must be longer or equal to 6 digits"
              : ""
          }
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          margin="normal"
          type="password"
          label="Password"
          color="secondary"
        />

        <TextField
          id="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          error={
            (reEnterPassword.length < 6 && reEnterPassword.length !== 0) ||
            reEnterPassword !== passwordValue
          }
          helperText={
            reEnterPassword.length < 6 && reEnterPassword.length !== 0
              ? "Password must be longer or equal to 6 digits"
              : passwordValue !== reEnterPassword
              ? "Password is not matched"
              : ""
          }
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
          margin="normal"
          type="password"
          label="Re-enter your password"
          color="secondary"
        />

        <TextField
          id="avatar"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={userInfo.avatar}
          onChange={(e) => handleInput("avatar", e.target.value)}
          margin="normal"
          type="text"
          label="Avatar"
          color="secondary"
        />

        <TextField
          id="balance"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={userInfo.balance}
          onChange={(e) => handleInput("balance", e.target.value)}
          margin="normal"
          type="text"
          label="Balance"
          color="secondary"
        />
        <FormControl style={{ textAlign: "left" }}>
          <InputLabel id="currency">Currency</InputLabel>
          <Select
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            id="Currency"
            label="Currency"
            value={userInfo.currency}
            onChange={(e) => handleInput("currency", e.target.value)}
            placeholder="Your preferred currency"
            className={classes.textFieldUnderline}
            color="secondary"
            name="currency"
          >
            {currencyInfo.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={classes.creatingButtonContainer}>
          {isLoading ? (
            <CircularProgress size={26} color="secondary" />
          ) : (
            <Button
              disabled={
                userInfo.name.length === 0 ||
                (passwordValue.length < 6 && passwordValue.length !== 0) ||
                passwordValue !== reEnterPassword
              }
              size="large"
              variant="contained"
              color="secondary"
              className={classes.createAccountButton}
              type="submit"
              value="Submit"
              fullWidth
              style={{ marginBottom: "10px" }}
            >
              Apply Changes
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default withRouter(EditProfile);
