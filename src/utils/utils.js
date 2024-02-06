import { StateList } from "../redux/Slice/TaskSlice";

export function getNextListName(currentListName) {
    const currentIndex = StateList.indexOf(currentListName);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= StateList.length) {
      return null;
    }
    return StateList[nextIndex];
  }
  
  export function getPrevListName(currentListName) {
    const currentIndex = StateList.indexOf(currentListName);
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      return null;
    }
    return StateList[prevIndex];
  }

  export const authenticateUser = (userName, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.userName === userName && user.password === password);
  
    if (user) {
      localStorage.setItem("userName", userName)
      return true;
    } else {
      return false;
    }
  };

  export const saveTasksForUser = (tasks) => {
    const userName = localStorage.getItem("userName")
    localStorage.setItem(`tasks_${userName}`, JSON.stringify(tasks));
  };
  
  export const loadTasksForUser = () => {
    const userName = localStorage.getItem("userName")
    const savedTasks = localStorage.getItem(`tasks_${userName}`);
    return savedTasks ? JSON.parse(savedTasks) : null;
  };
  