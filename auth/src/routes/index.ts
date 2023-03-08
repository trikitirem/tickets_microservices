import { Router } from "express";
import { getCurrentUser, signIn, signOut, signUp } from "./resolvers";
import { Routes } from "./utils";
import { requireAuth } from "@triki/common";

const router = Router();

router.get(Routes.CurrentUser, requireAuth, getCurrentUser);
router.post(Routes.SignIn, signIn);
router.post(Routes.SignOut, signOut);
router.post(Routes.SignUp, signUp);

export { router };
