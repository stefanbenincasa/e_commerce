# E_Commerce

A full-stack e_commerce application

# Database Setup

1 . CREATE DATABASE e_commerce;

2 . USE DATABASE e_commerce;

3 . CREATE TABLE IF NOT EXISTS product (
    productId INT NOT NULL PRIMARY KEY,
    productName VARCHAR(200),
    description VARCHAR(500),
    price INT,
    category VARCHAR(50) NOT NULL,
    dateAdded DATETIME,
    thumbnail VARCHAR(200)
    )  ENGINE=INNODB;
    
4 . INSERT INTO product 
    (productId, productName, description, price, category, dateAdded, thumbnail)
    VALUES
    (12345, 'hammer', 'A durable hammer', 10, 'hand_tools', NOW(), 'https://images.unsplash.com/photo-1579445710183-f9a816f5da05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80'),
    (17586, 'torch', 'Arlec rechargeable LED torch', 15, 'electrical', NOW(), 'https://images.unsplash.com/photo-1561916960-dea3b9b0355a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'),
    (34567, 'drill',  'The impact driver is the perfect addition to the ONE+ range.', 30, 'power_tools', NOW(), 'https://images.freeimages.com/images/large-previews/012/power-drill-3-1416795.jpg');

4 . SELECT * FROM PRODUCT \G

# Additional Information
- Database default port is 3306
- Server application runs on port 5000
- Client application runs on port 3000
- MYSQL can be installed from Homebrew via CLI
