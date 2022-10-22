import expess from "express";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  getUsers,
  register,
  login,
  logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = expess.Router();

router.get("/users", verifyToken, getUsers);

router.post("/login", login);
router.post("/register", register);
router.get("/token", refreshToken);
router.delete("/logout", logout);
export default router;
