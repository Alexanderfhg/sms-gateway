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
        await axios.post(
            `http://${smsData.phone.localAddress}:8080/messages`,
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
    } catch (error) {
        console.error("❌ Error sending SMS to user:", error.response?.data || error.message);
    }
}
