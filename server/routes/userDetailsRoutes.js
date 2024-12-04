import express from 'express';
import { handleUserDetails } from "../controller/userDetailController.js";
import authenticateToken from '../middleware/auth.js';

const userDetailRouter = new express.Router();

userDetailRouter.get("/getUserDetails", authenticateToken, handleUserDetails);

export default userDetailRouter;
