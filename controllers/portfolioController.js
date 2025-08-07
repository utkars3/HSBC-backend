import { fetchStockData } from '../utils/fetchStockData.js';

export const getStockData = async (req, res) => {
  try {
    const { symbol } = req.query;
    console.log("getStockData called", symbol);

    const stockData = await fetchStockData(symbol);

    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock data", error: error.message });
  }
};
