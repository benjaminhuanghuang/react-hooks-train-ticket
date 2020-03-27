const express = require("express");
const path = require("path");
const apiMocker = require("mocker-api");

const app = express();

apiMocker(app, path.resolve("./mocker/mocker.js"));

app.get("/json", (request, response) => {
  response.json({
    result: 1,
    message: "hello json"
  });
});
app.listen(8964);
