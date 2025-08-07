Create database portfolio;
use portfolio;
CREATE TABLE stocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stock_name VARCHAR(255) NOT NULL UNIQUE,
  stock_quantity INT DEFAULT 0,
  price INT DEFAULT 0
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stock_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  type ENUM('buy', 'sell') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM stocks;
Select * FROM transactions;











http://localhost:8980/api/users/stock/remove
 patch 

 body
 {
    "stockName":"AAPL",
    "stockQuantity":3
}






