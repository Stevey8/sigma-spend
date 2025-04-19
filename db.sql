use personalFinance;
drop table payment_cards;

-- all tables dropped and not created yet


CREATE TABLE credit_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_name VARCHAR(100) NOT NULL,
    issuer VARCHAR(100) NOT NULL,
    card_type ENUM('VISA', 'MC', 'AMEX') NOT NULL,
    benefits JSON,
    card_program VARCHAR(50),  -- e.g., 'MR', 'Bonvoy', 'Aeroplan'
    notes TEXT
);

CREATE TABLE travel (
	id INT AUTO_INCREMENT PRIMARY KEY,
    trip_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    notes TEXT

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    travel_id INT DEFAULT NULL,
    price FLOAT NOT NULL,
    currency CHAR(3) NOT NULL,
    non_personal_amount FLOAT, -- e.g. deductibles from others' portion
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g. 'food', 'grocery', 'transportation', 'accommodation', 'entertainment', 'housing, utilities, bills'
    -- 'shopping', 'health & fitness', 'personal care', 'medical', 'education', 'miscellaneous'
    subcategory VARCHAR(100), 
    datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment ENUM('cash', 'debit', 'credit', 'others') NOT NULL,
    credit_card INT, -- if payment='credit'
    user INT DEFAULT 1,
    FOREIGN KEY (travel_id) REFERENCES travel(id),
    FOREIGN KEY (credit_card) REFERENCES credit_cards(id)
);

CREATE TABLE recurring_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255),
    amount DECIMAL(10, 2),
    category VARCHAR(255),
    subcategory VARCHAR(255),
    payment_card_id INT,
    start_date DATE,
    frequency_type ENUM('none', 'daily', 'weekly', 'monthly', 'yearly', 'custom') DEFAULT 'monthly',
    custom_interval_days INT DEFAULT NULL,
    next_scheduled_date DATE,
    notes TEXT,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (payment_card_id) REFERENCES payment_cards(id)
);



