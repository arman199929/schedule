const express = require("express");
const homeController = require("../../controllers/frontend/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/contact", homeController.about);
homeRouter.get("/", homeController.index);

module.exports = homeRouter;