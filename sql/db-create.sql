use personalFinance;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS credit_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_name VARCHAR(100) NOT NULL,
    issuer VARCHAR(100) NOT NULL,
    card_type ENUM('VISA', 'MC', 'AMEX') NOT NULL,
    card_program VARCHAR(50),  -- e.g., 'cash back (Rogers)', 'MR', 'Bonvoy', 'Aeroplan'
    benefits JSON,
    notes TEXT,
    UNIQUE (user_id, card_name),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    monthly_recurring BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, name),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE budget_periods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    budget_id INT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    UNIQUE (budget_id, period_start),
    FOREIGN KEY (budget_id) REFERENCES budgets(id)
);

CREATE TABLE IF NOT EXISTS travel (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trip_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    notes TEXT,
    UNIQUE (user_id, trip_name, start_date),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    travel_id INT DEFAULT NULL,
    budget_id INT DEFAULT NULL,
    name VARCHAR(100) NOT NULL,
    currency CHAR(3) NOT NULL,
    price FLOAT NOT NULL, -- full payment amount (may include others' portion)
    personal_amount FLOAT, -- if splitting with others, this is the amount you're responsible for
    category VARCHAR(100) NOT NULL, -- e.g. 'restaurant', 'grocery', 'transportation', 'accommodation', 'entertainment', 'housing, utilities, bills'
    -- 'shopping', 'health & fitness', 'personal care', 'medical', 'education', 'miscellaneous'
    subcategory VARCHAR(100), 
    notes TEXT,
    datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment ENUM('cash', 'debit', 'credit', 'others') NOT NULL,
    credit_card_id INT, -- if payment='credit', otherwise NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (travel_id) REFERENCES travel(id),
    FOREIGN KEY (budget_id) REFERENCES budgets(id),
    FOREIGN KEY (credit_card_id) REFERENCES credit_cards(id)
);

CREATE TABLE IF NOT EXISTS recurring_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255),
    amount DECIMAL(10, 2),
    category VARCHAR(255),
    subcategory VARCHAR(255),
    payment ENUM('cash', 'debit', 'credit', 'others') NOT NULL,
    credit_card_id INT,
    start_date DATE,
    frequency_type ENUM('none', 'daily', 'weekly', 'monthly', 'yearly', 'custom') DEFAULT 'monthly',
    custom_interval_days INT DEFAULT NULL,
    next_scheduled_date DATE,
    notes TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (credit_card_id) REFERENCES credit_cards(id)
);



