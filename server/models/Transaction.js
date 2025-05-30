// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: String, // e.g. 'funding'
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reference: { type: String, unique: true }, // <-- Add this
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
