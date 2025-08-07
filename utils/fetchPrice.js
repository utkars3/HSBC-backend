import axios from 'axios';

export const getCurrentPrice = async (symbol) => {
  try {
    const { data } = await axios.get(`http://localhost:8980/api/portfolio/getstock?symbol=${symbol}`);
    
    if (!data || typeof data.price !== 'number') {
      throw new Error("Invalid response: missing price field");
    }

    return data.price;
  } catch (error) {
    throw new Error("Failed to fetch price: " + error.message);
  }
};
