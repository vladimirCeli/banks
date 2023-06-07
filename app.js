const { json } = require("express");
const express = require("express");
const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express(json));

app.use("/", require("./routes/bank"));
app.use("/", require("./routes/client"));
app.use("/", require("./routes/count"));
app.use("/", require("./routes/transac"));

app.listen(5000, () => {
  console.log("Server corriendo en http://localhost:5000");
});

