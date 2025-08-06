// utils/fetchStockData.js or wherever you define it
// import axios from 'axios';
import yahooFinance from 'yahoo-finance2'; // Make sure you're using ES modules or adjust for CommonJS

export const fetchStockData = async (symbol) => {
  try {
    const result = await yahooFinance.quote(symbol); // e.g., "RELIANCE.NS"
    return result;
  } catch (error) {
    throw new Error("Failed to fetch stock data: " + error.message);
  }
};
