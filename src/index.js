const express = require("express");
const app = express();
const PORT = process.env.PORT;
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
require("./db/mongoose");
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
