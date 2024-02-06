import {
  Container,
  Grid,
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
} from "@mui/material";
import { Card, CardContent, IconButton, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTask,
  deleteTask,
  editTask,
  loadTasks,
} from "../../redux/Slice/TaskSlice";
import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  getNextListName,
  getPrevListName,
  loadTasksForUser,
} from "../../utils/utils";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { logout } from "../../redux/auth/auth";

const TaskManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const navigateDashBoard = () => {
    navigate("/dashboard");
  };
  React.useEffect(() => {
    const savedTasks = loadTasksForUser();
    if (savedTasks) {
      dispatch(loadTasks(savedTasks));
    }
  }, []);

  const tasks = useSelector((state) => state.tasks) || [];

  const [taskName, setTaskName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [draggedItem, setDraggedItem] = React.useState(null);

  const handleDragStart = (e, task, listName) => {
    setDraggedItem({ task, listName });
  };

  const handleEditTask = (listName, taskId) => {
    setEditingTaskId(taskId);
    const task = tasks[listName].find((t) => t.id === taskId);
    setTaskName(task.name);
    setPriority(task.priority);
  };

  const handleSaveTask = (listName, taskId) => {
    dispatch(
      editTask({
        listName,
        taskId,
        newTaskDetails: {
          name: taskName,
          priority,
          deadline,
        },
      })
    );
    setEditingTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetListName) => {
    e?.preventDefault();
    if (draggedItem && targetListName === "bin") {
      dispatch(
        deleteTask({
          listName: draggedItem.listName,
          taskId: draggedItem.task.id,
        })
      );
    } else if (draggedItem && draggedItem.listName !== targetListName) {
      dispatch(
        moveTask({
          fromList: draggedItem.listName,
          toList: targetListName,
          taskItem: draggedItem.task,
        })
      );
    }
    setDraggedItem(null);
  };

  const handleDeleteIcon = (e, targetListName, index) => {
    dispatch(
      deleteTask({
        listName: targetListName,
        taskId: tasks[targetListName][index].id,
      })
    );
  };

  const priorityColorMap = {
    High: "#FF0000",
    Medium: "#FFFF00",
    Low: "#008000",
  };

  const handleNextButton = (currentListName, task) => {
    const toList = getNextListName(currentListName);
    dispatch(moveTask({ fromList: currentListName, toList, taskItem: task }));
  };

  const handlePrevButton = (currentListName, task) => {
    const toList = getPrevListName(currentListName);
    dispatch(moveTask({ fromList: currentListName, toList, taskItem: task }));
  };

  const handleBinDrop = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const isMobile = false;

  const handleDialogClose = (confirmed) => {
    setOpen(false);
    if (confirmed) {
      handleDrop(null, "bin");
    }
  };

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
        <Container maxWidth="lg">
          <Grid container>
            <Grid item>
              <Button
                sx={{ marginBottom: "10px", marginTop: "10px" }}
                variant="contained"
                onClick={navigateDashBoard}
              >
                Dashboard
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={2}>
                {Object.keys(tasks).map((listName) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={listName}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, listName)}
                    sx={{
                      marginTop: "10px",
                      minHeight: "65vh",
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography
                      variant="h6"
                      backgroundColor="yellow"
                      m={1}
                      p={1}
                      justifyContent="center"
                    >
                      {listName}
                    </Typography>
                    <Box sx={{ maxHeight: "65vh", overflowY: "auto" }}>
                      {tasks[listName].map((task, index) => (
                        <Card
                          key={index}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, task, listName)
                          }
                          sx={{
                            marginBottom: "10px",
                            boxShadow: "2px 2px 5px rgba(0.3, 0.3, 0.3, 0.3)",
                            borderRadius: "8px",
                          }}
                        >
                          <CardContent>
                            {editingTaskId === task.id ? (
                              <Box
                                sx={{
                                  bgcolor: "rgba(255, 255, 255, 0.9)",
                                  flexDirection: "column",
                                  marginTop: "10px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Grid>
                                  <FormGroup
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 1,
                                      mt: 1,
                                    }}
                                  >
                                    <FormControl>
                                      <InputLabel htmlFor="task-name" />
                                      <TextField
                                        id="ask-name"
                                        label="Task name"
                                        variant="outlined"
                                        value={taskName}
                                        onChange={(e) =>
                                          setTaskName(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <InputLabel htmlFor="priority">
                                        Priority
                                      </InputLabel>
                                      <Select
                                        labelId="priority-select-label"
                                        id="priority-select"
                                        value={priority}
                                        label="Priority"
                                        onChange={(e) =>
                                          setPriority(e.target.value)
                                        }
                                      >
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Medium">
                                          Medium
                                        </MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                      </Select>
                                    </FormControl>
                                    <FormControl>
                                      <InputLabel htmlFor="deadline" />
                                      <TextField
                                        id="deadline"
                                        label="Deadline"
                                        type="datetime-local"
                                        value={deadline}
                                        onChange={(e) =>
                                          setDeadline(e.target.value)
                                        }
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </FormControl>
                                    <FormHelperText sx={{ color: "gray" }}>
                                      All fields are mandatory.
                                    </FormHelperText>
                                  </FormGroup>
                                  <Button
                                    sx={{
                                      bgcolor: "#fdd835",
                                      color: "black",
                                    }}
                                    onClick={() => {
                                      handleSaveTask(listName, task.id);
                                    }}
                                    variant="contained"
                                  >
                                    Save
                                  </Button>
                                </Grid>
                              </Box>
                            ) : (
                              <>
                                <Typography>Task name: {task.name}</Typography>
                                <Typography>
                                  Priority: {task.priority}
                                </Typography>
                                <Typography>
                                  Deadline: {task.deadline}
                                </Typography>
                              </>
                            )}
                          </CardContent>
                          <CardActions>
                            <IconButton
                              color="primary"
                              aria-label="edit"
                              onClick={() => {
                                handlePrevButton(listName, task);
                              }}
                              disabled={listName === "Backlog"}
                              sx={{ margin: "0px", padding: "0px" }}
                            >
                              <NavigateBeforeIcon />
                            </IconButton>

                            <IconButton
                              color="primary"
                              aria-label="edit"
                              onClick={() => {
                                handleNextButton(listName, task);
                              }}
                              disabled={listName === "Completed"}
                              sx={{ margin: "0px", padding: "0px" }}
                            >
                              <NavigateNextIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              aria-label="edit"
                              onClick={() => {
                                handleEditTask(listName, task.id);
                              }}
                              sx={{ margin: "0px", padding: "0px" }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="delete"
                              onClick={(e) =>
                                handleDeleteIcon(e, listName, index)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="priority">
                              <FlagIcon
                                sx={{
                                  color:
                                    priorityColorMap[task?.priority] ||
                                    "default",
                                }}
                              />
                            </IconButton>
                          </CardActions>
                        </Card>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
      {draggedItem ? (
        <Box
          onDragOver={handleDragOver}
          onDrop={handleBinDrop}
          sx={{
            position: "fixed",
            bottom: 40,
            left: 0,
            right: 0,
            height: "50px",
            bgcolor: "red",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Drag here to delete <DeleteForeverIcon />
        </Box>
      ) : null}
      <ConfirmationDialog open={open} handleDialogClose={handleDialogClose} />
    </>
  );
};

export default TaskManagement;
