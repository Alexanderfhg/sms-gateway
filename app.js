import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config.js';
import matrixRoutes from "./src/routes/matrix.routes.js";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/matrix', matrixRoutes);

app.listen(port, () => {
    console.log(`📡 Servidor escuchando en http://localhost:${port}`);
});

export default app;
