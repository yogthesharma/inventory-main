const express = require(`express`);
const cors = require(`cors`);
const mongoose = require(`mongoose`);
const path = require(`path`);
// adding dotenv configs
require(`dotenv`).config();

// starting app var
const app = express();
app.use(express.json());
app.use(cors());
// [port] var

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

// making productiion server

// getting router here
app.use("/item", cors(), require("./route/ItemRoute"));

// stackoverflow solution
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// mongoose configs
console.log(process.env.MONGO_URI);
mongoose.connect(
  "mongodb+srv://yogsharma:yogsharma@cluster0.nd35c.mongodb.net/inventorySample?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useMongoClient: true,
  },
  (err) => {
    if (err) return console.log("Database Connection Failed");
    console.log("Database Connected");
  }
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", express.static(path.join(__dirname, "/client/build")));
// starting up the server
app.listen(port, () => {
  console.log(`Server Started At Port ${port}`);
});
