import {
  Container,
  Grid,
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  Button,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../components/Card/UserCard";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { loadTasks } from "../../redux/Slice/TaskSlice";
import * as React from "react";
import { loadTasksForUser } from "../../utils/utils";
import { logout } from "../../redux/auth/auth";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const navigateButton = () => {
    navigate("/taskmanagement");
  };

  React.useEffect(() => {
    const savedTasks = loadTasksForUser();
    if (savedTasks) {
      dispatch(loadTasks(savedTasks));
    }
  }, []);

  const isMobile = false;

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" gutterBottom>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={isMobile ? "h6" : "h2"}>
            Kanban Board..!!
          </Typography>
          <IconButton
            aria-label="logout"
            sx={{ color: "white" }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item>
              <Button variant="contained" onClick={navigateButton}>
                Task Management
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <UserCard />
              <CreateTaskForm />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
