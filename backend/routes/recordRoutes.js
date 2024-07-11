import express from "express";
import { Record } from "../models/Record.js";

const router = express.Router();

// Route to save a new expense (POST)
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.amount ||
            !request.body.category
        ) {
            return response.status(400).send({
                message:
                    "Send all required fields: title, amount, category, description",
            });
        }
        const newRecord = {
            title: request.body.title,
            amount: request.body.amount,
            category: request.body.category,
        };

        const record = await Record.create(newRecord);

        return response.status(201).send(record);
    } catch (error) {
        console.log("Saving record error received: " + error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Get All Expenses from DB (GET)
router.get("/", async (request, response) => {
    try {
        const records = await Record.find({});

        return response.status(200).json({
            count: records.length,
            data: records,
        });
    } catch (error) {
        console.log("Error received in getting expenses : " + error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Get Single Expense from DB (GET)
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const record = await Record.findById(id);

        return response.status(200).json(record);
    } catch (error) {
        console.log(
            "Error received in getting specific expense/s : " + error.message
        );
        response.status(500).send({ message: error.message });
    }
});

// Route to update a book (PUT)
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.amount ||
            !request.body.category
        ) {
            return response.status(400).send({
                message:
                    "Send all required fields: title, amount, category, description",
            });
        }

        const { id } = request.params;

        const result = await Record.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Record not Found" });
        } else {
            return response
                .status(200)
                .send({ message: "Record updated successfully" });
        }
    } catch (error) {
        console.log(
            "Error received in updating specific expense/s : " + error.message
        );
        response.status(500).send({ message: error.message });
    }
});

// Route to Delete a Reocrd
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Record.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Record not Found" });
        } else {
            return response
                .status(200)
                .send({ message: "Record deleted successfully" });
        }
    } catch (error) {
        console.log(
            "Error received in deleting specific expense/s : " + error.message
        );
        response.status(500).send({ message: error.message });
    }
});

export default router;
