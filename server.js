const express = require(`express`);
const cors = require(`cors`);
const mongoose = require(`mongoose`);
const path = require(`path`);

// starting app var
const app = express();
app.use(express.json());
app.use(cors());
// [port] var
const port = process.env.PORT || 8080;

// making productiion server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// getting router here
app.use("/item", require("./route/ItemRoute"));

// mongoose configs
mongoose.connect(
  "mongodb+srv://yogsharma:yogsharma@cluster0.nd35c.mongodb.net/inventorySample?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) return console.log("Database Connection Failed");
    console.log("Database Connected");
  }
);

// starting up the server
app.listen(port, () => {
  console.log(`Server Started At Port ${port}`);
});
