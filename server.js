require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Expense = require('./models/expense');

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- MongoDB Connection ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Mongo error:", err.message));

/* ---------- Routes ---------- */

// Add expense
app.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense({
      customerId: req.body.customerId,
      category: req.body.category,
      amount: req.body.amount,
      date: new Date(req.body.date),
      note: req.body.note
    });

    const saved = await expense.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all expenses (with filters)
app.get('/expenses', async (req, res) => {
  try {
    const { category, date, customerId } = req.query;
    let filter = {};

    if (customerId) filter.customerId = customerId;
    if (category) filter.category = category;

    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      filter.date = { $gte: d, $lt: next };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single expense
app.get('/expenses/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ error: "Not found" });
  res.json(expense);
});

// Update expense
app.put('/expenses/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.date) updates.date = new Date(updates.date);

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete expense
app.delete('/expenses/:id', async (req, res) => {
  const removed = await Expense.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// Monthly summary
app.get('/summary/:year/:month', async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const agg = await Expense.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const overallTotal = agg.reduce((sum, item) => sum + item.total, 0);

    res.json({
      year,
      month,
      overallTotal,
      byCategory: agg
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
