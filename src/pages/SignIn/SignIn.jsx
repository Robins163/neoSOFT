import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { authenticateUser } from "../../utils/utils";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onRecaptchaSucessChange = () => {
    setValidated(true);
  };

  const onSubmit = async (data) => {
    if (validated) {
      if (
        authenticateUser(
          data.userName,
          data.password || data.email,
          data.password
        )
      ) {
        dispatch(login());
        navigate("/dashboard");
      } else {
        setPasswordError(true);
      }
    } else {
      console.error("reCAPTCHA validation failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          SignIn
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            marginTop: 1,
            "& .error": {
              color: "red",
            },
          }}
        >
          <TextField
            label="User Name or Email"
            variant="outlined"
            name="userName"
            {...register("userName", {
              required: "User Name or Email is required",
            })}
            error={!!errors.userName}
            helperText={errors.userName && errors.userName.message}
            margin="normal"
            fullWidth
          />

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters.",
              },
            })}
            error={!!errors.password || passwordError}
            helperText={
              (errors.password && errors.password.message) ||
              (passwordError && "Incorrect password. Please try again.")
            }
            margin="normal"
            fullWidth
          />

          <Box sx={{ marginY: 2 }}>
            <ReCAPTCHA
              onChange={onRecaptchaSucessChange}
              sitekey={process.env.REACT_APP_SITE_KEY}
            />
            {!validated && (
              <Typography variant="body2" color="error" className="error">
                ReCAPTCHA verification is mandatory.
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
        <br />
        <br />
        <Link to="/register" className="alreadyRegisteredLink">
          Not Registered ?
        </Link>
        <br />
        <br />
      </Box>
    </Container>
  );
}
