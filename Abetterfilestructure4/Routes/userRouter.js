const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();
//Creating UserRoute something like the create User
userRouter
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
