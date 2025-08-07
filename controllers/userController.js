import connectDB from '../config/db.js';

const db = connectDB();
import { getCurrentPrice } from '../utils/fetchPrice.js';

export const addItem = async (req, res) => {
  const { stockName, stockQuantity } = req.body;
  const quantity = Number(stockQuantity);

  try {
    const currentPrice = await getCurrentPrice(stockName); // e.g., 120.50
    const totalAmountToAdd = currentPrice * quantity;

    db.query('SELECT * FROM stocks WHERE stock_name = ?', [stockName], (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error', error: err.message });

      if (result.length > 0) {
        // Update existing stock
        const updatedQuantity = result[0].stock_quantity + quantity;
        const updatedPrice = result[0].price + totalAmountToAdd;

        db.query(
          'UPDATE stocks SET stock_quantity = ?, price = ? WHERE stock_name = ?',
          [updatedQuantity, updatedPrice, stockName],
          (err2) => {
            if (err2) return res.status(500).json({ message: 'Update failed', error: err2.message });
            res.status(200).json({ message: 'Stock updated successfully' });
          }
        );
      } else {
        // Insert new stock
        db.query(
          'INSERT INTO stocks (stock_name, stock_quantity, price) VALUES (?, ?, ?)',
          [stockName, quantity, totalAmountToAdd],
          (err3) => {
            if (err3) return res.status(500).json({ message: 'Insert failed', error: err3.message });
            res.status(200).json({ message: 'Stock added successfully' });
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Price fetch failed', error: err.message });
  }
};


// Delete stock by name
export const deleteItem = (req, res) => {
    console.log("hi")
  const { stockName } = req.body;

  db.query(
    'DELETE FROM stocks WHERE stock_name = ?',
    [stockName],
    (err) => {
      if (err) return res.status(500).json({ message: 'Delete failed', error: err.message });
      res.status(200).json({ message: 'Stock deleted successfully' });
    }
  );
};

// Get all stocks
export const getUserStock = (req, res) => {
  db.query('SELECT stock_name, stock_quantity FROM stocks', (err, results) => {
    if (err) return res.status(500).json({ message: 'Fetch failed', error: err.message });
    res.status(200).json({ stocks: results });
  });
};


import yahooFinance from 'yahoo-finance2';

export const getStockHistory = async (req, res) => {
  try {
    const { symbol, interval, from, to } = req.query;

    console.log("getStockHistory called", symbol, interval, from, to);

    if (!symbol || !interval || !from || !to) {
      return res.status(400).json({ message: 'Missing required query parameters' });
    }

    const results = await yahooFinance.historical(symbol, {
      period1: new Date(from),
      period2: new Date(to),
      interval: interval, // e.g., "1d", "1wk", "1mo"
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No data found for given parameters' });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stock data', error: error.message });
  }
};
