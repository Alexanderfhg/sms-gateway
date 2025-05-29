import { Router } from "express";
import { handleIncomingSMS, handleOutgoingSMS } from "../controllers/matrix.controller.js";

const router = Router();

router.post('/incoming-sms', async (req, res) => {
    try {
        const sms = req.body.payload;
        const deviceId = req.body.deviceId;
        const smsData = { ...sms, deviceId };

        await handleIncomingSMS(smsData);
        res.status(200).send("OK");
    } catch (err) {
        console.error("❌ Error reenviando el SMS a Matrix:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/outgoing-sms', async (req, res) => {
    try {
        const smsData = req.body;

        await handleOutgoingSMS(smsData);
        res.status(200).send("OK");
    } catch (err) {
        console.error("❌ Error reenviando el SMS a Matrix:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
