import React, { useState } from "react";
import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import useStyles from "./styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { authService } from "../../services/auth";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/actions/types";

const LoginTab = (props) => {
  const [loginError, setLoginError] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const submitLoginForm = async (e) => {
    e.preventDefault();
    const userLoginInfo = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      setIsLoading(true);
      const { data } = await authService.login(userLoginInfo);
      localStorage.setItem("auth", JSON.stringify(data));
      dispatch({ type: LOGIN, payload: { data: data } });
      const queryParams = new URLSearchParams(window.location.search);
      const redirect = queryParams.get("redirect");
      redirect !== null
        ? props.history.push(redirect)
        : props.history.push("/my-profile");
    } catch (err) {
      setLoginError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h1" className={classes.greeting}>
        Hello, Login here!
      </Typography>
      <Fade
        in={loginError}
        style={{
          marginTop: "32px",
          display: loginError ? "" : "none",
        }}
      >
        <Alert severity="error" variant="outlined">
          <AlertTitle>
            Login failed
            <br></br>
            Wrong email or password
          </AlertTitle>
        </Alert>
      </Fade>

      <form onSubmit={(e) => submitLoginForm(e)}>
        <TextField
          id="email"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          margin="normal"
          placeholder="Email Adress"
          type="email"
          fullWidth
        />

        <TextField
          id="password"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
            },
          }}
          value={loginPassword}
          error={loginPassword.length <= 6 && loginPassword.length !== 0}
          helperText={
            loginPassword.length <= 6 && loginPassword.length !== 0
              ? "Password has to have at least 6 digits"
              : ""
          }
          onChange={(e) => setLoginPassword(e.target.value)}
          margin="normal"
          placeholder="Password"
          type="password"
          fullWidth
        />

        <div className={classes.formButtons}>
          {isLoading ? (
            <CircularProgress
              size={26}
              className={classes.loginLoader}
              color="secondary"
            />
          ) : (
            <Button
              disabled={loginEmail.length === 0}
              variant="contained"
              color="secondary"
              size="large"
              fullWidth={true}
              type="submit"
              value="Submit"
            >
              Login
            </Button>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginTab;
