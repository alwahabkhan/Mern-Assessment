import express from "express";
import {
    handleGetAllUsers,
    handleDeleteUser,
    handleUpdateUser,
    handleGetUserDetails

} from "../controller/adminController.js";
import authenticateToken from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get("/getallusers", authenticateToken, handleGetAllUsers);
adminRouter.delete("/deleteuser/:id", authenticateToken, handleDeleteUser);
adminRouter.put("/updateuser/:id", authenticateToken, handleUpdateUser);
adminRouter.get("/getuserdetails/:id", authenticateToken, handleGetUserDetails);

export default adminRouter;
