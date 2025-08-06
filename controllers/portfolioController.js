

export const allItems=async (req,res)=>{
    try{
        const items=await portfolio.find({});
        res.status(200).json(items);
    }catch(error){
        res.status(500).json({message: "Error fetching items", error: error.message});
    }
}


// controllers/stockController.js
import {fetchStockData} from '../utils/fetchStockData.js'; // adjust path accordingly

export const getStockData = async (req, res) => {
  try {
    // Fetch stock data using the utility function
    const {symbol}  = req.query; // e.g., RELIANCE.NS
    console.log("getStockData called",symbol);

    const stockData = await fetchStockData(symbol);

    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock data", error: error.message });
  }
};

// http://localhost:5001/stock/RELIANCE.NS