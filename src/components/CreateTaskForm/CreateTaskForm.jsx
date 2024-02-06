import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { addTaskInList } from "../../redux/Slice/TaskSlice";

const CreateTaskForm = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskNameError, setTaskNameError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);

  const validateForm = () => {
    let isValid = true;
    if (!taskName) {
      setTaskNameError(true);
      isValid = false;
    }
    if (!priority) {
      setPriorityError(true);
      isValid = false;
    }
    if (!deadline) {
      setDeadlineError(true);
      isValid = false;
    }
    return isValid;
  };

  const handleCreateTask = () => {
    setTaskNameError(false);
    setPriorityError(false);
    setDeadlineError(false);

    if (validateForm()) {
      const newTask = {
        name: taskName,
        priority,
        deadline,
      };

      dispatch(addTaskInList({ listName: "Backlog", taskItem: newTask }));

      setTaskName("");
      setPriority("");
      setDeadline("");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 1,
        border: "1px solid gray",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        marginBottom: "20px",
        justifyContent: "space-between",
      }}
    >
      <Container>
        <Grid>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 1,
              mb: 1,
              padding: "10px",
            }}
          >
            <FormControl error={taskNameError}>
              <TextField
                id="task-name"
                label="Task name"
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                error={taskNameError}
                helperText={taskNameError ? "Task name is required." : ""}
              />
            </FormControl>
            <FormControl error={priorityError}>
              <InputLabel htmlFor="priority">Priority</InputLabel>
              <Select
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
                error={priorityError}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
              {priorityError && (
                <FormHelperText>Priority is required.</FormHelperText>
              )}
            </FormControl>
            <FormControl error={deadlineError}>
              <TextField
                id="deadline"
                label="Deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                error={deadlineError}
                helperText={deadlineError ? "Deadline is required." : ""}
              />
            </FormControl>
          </FormGroup>
          <Button
            onClick={handleCreateTask}
            variant="contained"
            sx={{ padding: "10px", marginBottom: "10px", marginLeft: "5px" }}
          >
            Create Task
          </Button>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateTaskForm;
