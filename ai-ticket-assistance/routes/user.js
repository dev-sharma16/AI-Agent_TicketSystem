import e from "express";
import { getUsers, login, signup, logout, updateUser } from "../controllers/user.js"
import { authenticate } from "../middlewares/auth.js";

const router = e.Router()

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router