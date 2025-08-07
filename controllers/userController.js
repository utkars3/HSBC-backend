import connectDB from '../config/db.js';

// Create a DB connection instance
const db = connectDB();

// Add new stock or update quantity
export const addItem = (req, res) => {
  const { stockName, stockQuantity } = req.body;

  db.query(
    'SELECT * FROM stocks WHERE stock_name = ?',
    [stockName],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error', error: err.message });

      if (result.length > 0) {
        // Update quantity
        const newQuantity = result[0].stock_quantity + Number(stockQuantity);
        db.query(
          'UPDATE stocks SET stock_quantity = ? WHERE stock_name = ?',
          [newQuantity, stockName],
          (err2) => {
            if (err2) return res.status(500).json({ message: 'Update failed', error: err2.message });
            res.status(200).json({ message: 'Stock quantity updated' });
          }
        );
      } else {
        // Insert new stock
        db.query(
          'INSERT INTO stocks (stock_name, stock_quantity) VALUES (?, ?)',
          [stockName, stockQuantity],
          (err3) => {
            if (err3) return res.status(500).json({ message: 'Insert failed', error: err3.message });
            res.status(200).json({ message: 'Stock added successfully' });
          }
        );
      }
    }
  );
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
