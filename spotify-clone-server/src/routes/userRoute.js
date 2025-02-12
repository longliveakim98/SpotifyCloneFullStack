import {
  getUser,
  getUsers,
  updateName,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/user/:id", getUser);
userRouter.get("/list", getUsers);
userRouter.put("/:userId/name", updateName);
userRouter.put("/:userId/role", updateUserRole);
userRouter.put("/:userId/profile-picture", updateProfilePicture);

export default userRouter;
