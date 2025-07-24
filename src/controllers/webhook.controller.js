import axios from "axios";

const username = "sms";
const password = "confirma-pedido";
const webhookId = "sms-received-webhook";

export const createDeviceWebhook = async (req, res) => {
    const { deviceIp, webhookUrl } = req.body;

    if (!deviceIp || !webhookUrl) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await axios.post(
            `http://${deviceIp}:8080/webhooks`,
            {
                id: webhookId,
                url: webhookUrl,
                event: "sms:received",
            },
            {
                auth: { username, password },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = {...response.data, username, password, deviceIp, webhookUrl};

        console.log("✅ Webhook created successfully:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("❌ Error creating webhook:", error.response?.data || error.message);
        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data || "Webhook creation failed",
            });
        }
        return res.status(500).json({ error: error.message });
    }
};
