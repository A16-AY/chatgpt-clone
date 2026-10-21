

import 'dotenv/config'; 
import express from 'express'; 
import cors from 'cors';
import db from './db/db.config.js';
import mainRouter from './src/api/main.routes.js'; 
import { errorHandler } from './src/middleware/error-handler.js'; 

const app = express();


// app.use(
//   cors({
//     origin: 'http://localhost:5173', 
//   })
// );
app.use(cors());

app.use(express.json());


app.use('/api', mainRouter);

// 2.  error handler middleware
app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('Db connected');
    connection.release();
  } catch (error) {
    console.error('Error connecting to DB (continuing without DB):', error.message);
  }

  const PORT = process.env.PORT || 3888;
  app.listen(PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err.message);
      return;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();