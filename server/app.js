const express = require("express");
const bodyParser = require("body-parser");

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('./dist', {
  index: "index.html"
}))

require("./routes/users.routes.js")(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))