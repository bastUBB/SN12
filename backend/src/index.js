import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
// import { initialSetup } from './config/initialSetup.js';
import indexRoutes from './routes/index.routes.js';

const app = express();
const FRONTEND_URL = 'http://localhost:5173';
const BACKEND_URL = 'http://localhost:5500'; 
const url = new URL(BACKEND_URL);

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL
  })
);
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: false })); 
app.use("/api", indexRoutes); // Rutas de la API

// initialSetup()
//     .then(() => console.log('Initial setup completed'))
//     .catch(err => console.error('Error during initial setup:', err));

app.listen(url.port, () => {
  connectDB();
  console.log(`Backend corriendo en: ${BACKEND_URL}`);
});