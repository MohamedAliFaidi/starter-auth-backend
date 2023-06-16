
const express = require("express");
const cors = require("cors");
const connectDB = require("./db.connect");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const path = require("path");
const postRouter = require("./Routes/post");
const userRouter = require("./Routes/auth");
const cookieParser = require('cookie-parser');

const { authenticated } = require('./middleware');
app.use(cors(
    {
        origin: "*",
        credentials: true,
        optionSuccessStatus: 200
    }
));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


connectDB();

app.use("/post" , authenticated, postRouter);
app.use("/auth", userRouter)
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
