import { Router } from "express";
import { Routes } from "./utils";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  getMyTickets,
} from "./controllers";
import { requireAuth } from "@triki/common";

const router = Router();

router.get(Routes.INDEX, requireAuth, getMyTickets);
router.post(Routes.INDEX, requireAuth, createTicket);
router.get(Routes.ALL, getTickets);
router.get(Routes.INDEX_WITH_ID, getTicketById);
router.put(Routes.INDEX_WITH_ID, requireAuth, updateTicket);

export { router };
