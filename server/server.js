const express     = require('express'),
      app         = express(),
      bodyParser  = require("body-parser"),
      index       = require("./routes/index"),
      user        = require("./routes/user"),
      cors        = require("cors"),
      question    = require("./routes/question"),
      answer      = require("./routes/answer"),
      comment     = require("./routes/comment"),
      vote        = require("./routes/vote");

const firebase = require('firebase');
// app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// firebase config
let config = {
  apiKey: "AIzaSyD9oblOp4KyRUCS7BO8X7n0k-V8GZecZPE",
  authDomain: "hacktivoverflow.firebaseapp.com",
  databaseURL: "https://hacktivoverflow.firebaseio.com",
  projectId: "hacktivoverflow",
  storageBucket: "hacktivoverflow.appspot.com",
  messagingSenderId: "597828351745"
};

firebase.initializeApp(config);

app.use("/", index);
app.use("/user", user);
app.use("/question", question);
app.use("/answer", answer);
app.use("/comment", comment);
app.use("/vote", vote);


app.listen(3000, () => {
  console.log("Lol.....!!!");
})
