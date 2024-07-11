import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import recordsRoute from "./routes/recordRoutes.js";
import cors from "cors";

// launches express.js into the app
const app = express();

app.use(express.json());

// cors config
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Spendometer Initializing...");
});

app.use("/records", recordsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Spendometer is connected to the database");
        // Listen to the port that is in config.js if i am connected to the database
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error received: " + error);
    });
