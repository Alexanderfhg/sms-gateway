import axios from "axios";

export const sendSMSToUi = async (smsData) => {
    try {
        await axios.post(
            `${process.env.VITE_API_URL}/matrix/incoming-sms`,
            smsData
        );
    } catch (error) {
        console.error("❌ Error sending SMS to UI:", error.response?.data || error.message);
    }
}

export const sendSMSToUser = async (smsData) => {
    try {
        const response = await axios.post(
            `http://${smsData.phone.deviceIp}:8080/messages`,
            {
                phoneNumbers: [`+${smsData.to}`],
                message: smsData.message
            },
            {
                auth: {
                    username: smsData.phone.username,
                    password: smsData.phone.password
                }
            }
        );
        return response;
    } catch (error) {
        console.error("❌ Error sending SMS to user:", error.response?.data || error.message);
        return {
            address: error?.address || 'Unknown',
            cause: error?.cause || "Unknown",
            code: error?.code || 'Unknown',
            message: error?.message || 'Unknown'
        };
    }
}
