import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../utils/utils";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      name: data.name,
      userName: data.userName,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
      profileImage: data.profileImage,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    if (authenticateUser) {
      navigate("/signin");
    }
    console.log("User registered:", data);
  };

  const validatePassword = (value) => {
    const originalPassword = getValues("password");
    return value === originalPassword || "Passwords do not match";
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registration
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            marginTop: 1,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="User Name"
            variant="outlined"
            name="userName"
            {...register("userName", { required: "User Name is required" })}
            error={!!errors.userName}
            helperText={errors.userName && errors.userName.message}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Contact Number"
            variant="outlined"
            name="contactNumber"
            type="number"
            {...register("contactNumber", { required: false })}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: validatePassword,
            })}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <InputLabel htmlFor="profile-image" sx={{ marginTop: 1 }}>
            Profile Image
          </InputLabel>
          <TextField
            id="profile-image"
            variant="outlined"
            name="profileImage"
            type="file"
            {...register("profileImage", { required: false })}
            margin="normal"
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
          <br />
          <br />
          <Link to="/signin" className="alreadyRegisteredLink">
            Already Registered
          </Link>
          <br />
          <br />
        </Box>
      </Box>
    </Container>
  );
}
