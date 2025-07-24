import { Router } from "express";
import { handleIncomingSMS, handleOutgoingSMS } from "../controllers/matrix.controller.js";
import { createDeviceWebhook } from "../controllers/webhook.controller.js";

const router = Router();

router.post('/incoming-sms', async (req, res) => {
    try {
        const sms = req.body.payload;
        const deviceId = req.body.deviceId;
        const smsData = { ...sms, deviceId };

        await handleIncomingSMS(smsData);
        res.status(200).send("OK");
    } catch (err) {
        console.error("❌ Error resending SMS to UI:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/outgoing-sms', async (req, res) => {
    try {
        const smsData = req.body;

        await handleOutgoingSMS(smsData);
        res.status(200).send("OK");
    } catch (err) {
        console.error("❌ Error resending SMS to user:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/create-webhook", createDeviceWebhook);

export default router;
