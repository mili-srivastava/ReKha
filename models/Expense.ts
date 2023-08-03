import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    modeOfPayment: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
        consumers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema, "expenses");