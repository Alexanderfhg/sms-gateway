import { Router } from "express";
import { createDeviceWebhook } from "../controllers/webhook.controller.js";

const router = Router();

router.post("/create-webhook", createDeviceWebhook);

export default router;
