import axios from "axios";
import readline from "readline";

const username = "sms";
const password = "agKpAbUx";
const deviceIP = "192.168.2.12";
const webhookUrl = "https://lmmn9j2f-3001.use2.devtunnels.ms/matrix/incoming-sms";
const webhookId = "sms-webhook-01";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createWebhook() {
  try {
    const response = await axios.post(
      `http://${deviceIP}:8080/webhooks`,
      {
        id: webhookId,
        url: webhookUrl,
        event: "sms:received"
      },
      {
        auth: {
          username,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Webhook creado correctamente:");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Error al crear el webhook:");
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
  } finally {
    rl.close();
  }
}

createWebhook();
