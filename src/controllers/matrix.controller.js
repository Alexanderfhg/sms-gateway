import { sendSMSToUi, sendSMSToUser } from '../services/matrix.service.js';

export const handleIncomingSMS = async (smsData) => {
    try {
        await sendSMSToUi(smsData);
    } catch (error) {
        console.error("❌ Error al manejar el SMS entrante:", error.message);
    }
}

export const handleOutgoingSMS = async (smsData) => {
    try {
        await sendSMSToUser(smsData);
    } catch (error) {
        console.error("❌ Error enviando SMS:", error.response?.data || error.message);
    }
}
