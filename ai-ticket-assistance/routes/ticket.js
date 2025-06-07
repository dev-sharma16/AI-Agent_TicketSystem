import e from "express";
import { createTicket, getTickets, getTicket } from "../controllers/ticket.js";
import { authenticate } from "../middlewares/auth.js";

const router = e.Router()

router.get("/", authenticate, getTickets)
router.get("/:id", authenticate, getTicket)
router.post("/", authenticate, createTicket)

export default router;