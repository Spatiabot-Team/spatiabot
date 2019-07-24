"use strict";
exports.__esModule = true;
var express_1 = require("express");
var homeController = require("./controllers/home.controller");
var app = express_1["default"]();
app.set("port", 3000);
app.get("/", homeController.index);
app.listen(app.get("port"), function () {
    console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
