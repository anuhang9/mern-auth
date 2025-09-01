import { Router } from "express";
import { userAuth } from "../middleware/user.auth";
import { getUserData } from "../controller/user.controller";

const userRouter = Router();

userRouter.get('/data', userAuth, getUserData);

export default userRouter;