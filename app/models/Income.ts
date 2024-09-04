import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Income = mongoose.models.Income || mongoose.model('Income', IncomeSchema);

export default Income;