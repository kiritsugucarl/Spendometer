import mongoose from "mongoose";

const recordSchema = mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Record = mongoose.model("Record", recordSchema);
