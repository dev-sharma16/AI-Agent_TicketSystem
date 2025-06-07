import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import { inngest } from "./inngest/client.js";
import { onUserSignUp } from './inngest/function/on-signup.js';
import { onTicketCreated } from './inngest/function/on-ticket-create.js';

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/ticket", ticketRoutes);

app.use("/api/inngest", serve({
    client: inngest,
    functions: [onUserSignUp, onTicketCreated]
}));

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDb is connected..!✅");
        app.listen(PORT, ()=> console.log(`🚀Server at https://localhost:${PORT}`)) 
    })
    .catch((err)=>console.error("❌Mongo DB Error : ",err));
