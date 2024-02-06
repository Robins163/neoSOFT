import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { saveTasksForUser } from "../../utils/utils";

const initialState = {
  Backlog: [],
  Todo: [],
  Progress: [],
  Completed: [],
};

export const StateList = ["Backlog", "Todo", "Progress", "Completed"];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (_, action) => {
      return action.payload;
    },
    moveTask: (state, action) => {
      const { fromList, toList, taskItem } = action.payload;
      state[fromList] = state[fromList].filter(
        (task) => task.id !== taskItem.id
      );
      state[toList] = [...state[toList], taskItem];
      saveTasksForUser(state);
    },
    addTaskInList: (state, action) => {
      const { listName, taskItem } = action.payload;
      const newTaskItem = { ...taskItem, id: uuidv4() };
      state[listName] = [...state[listName], newTaskItem];
      saveTasksForUser(state);
    },
    editTask: (state, action) => {
      const { listName, taskId, newTaskDetails } = action.payload;
      const taskIndex = state[listName].findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state[listName][taskIndex] = {
          ...state[listName][taskIndex],
          ...newTaskDetails,
        };
      }
      saveTasksForUser(state);
    },
    deleteTask: (state, action) => {
      const { listName, taskId } = action.payload;
      state[listName] = state[listName].filter((task) => task.id !== taskId);
      saveTasksForUser(state);
    },
  },
});

export const { moveTask, addTaskInList, deleteTask, editTask, loadTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
