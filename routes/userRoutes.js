import express from "express";
import { authRoute, login, register } from "../controllers/authControllers.js";
import { auth } from "../middleware/auth.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  searchInDB,
  updateUserByID,
} from "../controllers/userControllers.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/details", auth, authRoute);
router.get("/details/:id", auth, getUserById);
router.get("/allusers", auth, getAllUsers);
router.put("/update/:id", auth, updateUserByID);
router.delete("/delete/:id", auth, deleteUser);
router.get("/search/:key?", searchInDB);
export default router;
