import { sendSMSToUi, sendSMSToUser } from '../services/matrix.service.js';

export const handleIncomingSMS = async (smsData) => {
    try {
        await sendSMSToUi(smsData);
    } catch (error) {
        console.error("❌ Error al manejar el SMS entrante:", error.message);
    }
}

export const handleOutgoingSMS = async (req, res) => {
    const smsData = req.body;

    const response = await sendSMSToUser(smsData);

    res.status(response.status).send({
        statusText: response.statusText,
        data: response.data
    });
};
