import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";

export const UserCard = () => {
  const tasks = useSelector((state) => state.tasks) || [];
  const taskCounts = Object.keys(tasks).map((category) => ({
    category,
    count: tasks[category].length,
  }));

  const totalTasks = taskCounts.reduce(
    (total, category) => total + category.count,
    0
  );

  const completedTaskCount =
    taskCounts.find((category) => category.category === "Completed")?.count ||
    0;

  const pendingTaskCount = totalTasks - completedTaskCount;

  return (
    <Card sx={{ display: "flex", border: "1px solid gray" }}>
      <Box sx={{ padding: 1 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
      <Box>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Tasks: {totalTasks}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Pending: {pendingTaskCount}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Completed: {completedTaskCount}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
