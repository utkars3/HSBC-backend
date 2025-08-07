import yahooFinance from 'yahoo-finance2';

export const fetchStockData = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote || !quote.quoteType) {
      throw new Error("Invalid data received from Yahoo Finance");
    }

    const type = quote.quoteType;

    // You can use this information as needed
    console.log(`Symbol: ${symbol}`);
    console.log(`Name: ${quote.shortName}`);
    console.log(`Type: ${type}`); // Example values: 'EQUITY', 'MUTUALFUND', etc.
    console.log(`Price: ${quote.regularMarketPrice}`);

    return {
      symbol: quote.symbol,
      name: quote.shortName,
      type: type,
      price: quote.regularMarketPrice,
      currency: quote.currency
    };

  } catch (err) {
    console.error("Error fetching data:", err.message);
    throw err;
  }
};
