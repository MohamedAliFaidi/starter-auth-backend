
const express = require("express");
const cors = require("cors");
const connectDB = require("./db.connect");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;
const postRouter = require("./Routes/post");
const userRouter = require("./Routes/auth");
const { authenticated } = require('./middleware');
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/post" , authenticated, postRouter);
app.use("/auth", userRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
