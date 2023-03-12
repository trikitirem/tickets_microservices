import { Router } from "express";
import { Routes } from "./utils";
import { requireAuth } from "@triki/common";
import { createOrder, getOrders } from "./resolvers";

const router = Router();

router.get(Routes.INDEX, requireAuth, getOrders);
router.post(Routes.INDEX, requireAuth, createOrder);

export { router };
