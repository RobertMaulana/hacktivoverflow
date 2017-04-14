const express     = require('express'),
      app         = express(),
      bodyParser  = require("body-parser"),
      index       = require("./routes/index"),
      user        = require("./routes/user"),
      question    = require("./routes/question"),
      answer      = require("./routes/answer");

app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);
app.use("/user", user);
app.use("/question", question);
app.use("/answer", answer);

app.listen(3000, () => {
  console.log("Lol.....!!!");
})
