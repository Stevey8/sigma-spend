INSERT INTO users (id, username, email)
VALUES (1, 'admin', NULL) ON DUPLICATE KEY UPDATE id = id;



INSERT INTO credit_cards (
    id, user_id, card_name, issuer, card_type, card_program, benefits, notes
) VALUES
(
    1,
    1,
    'Rogers World Elite Mastercard',
    'Rogers',
    'MC',
    'cash back (Rogers)',
    JSON_OBJECT(
        'stub', true,
        'note', 'Reward program structure TBD. Placeholder for future parsing logic.'
    ),
    'go-to card if not paying for grocery or restaurant with Amex'
),
(
    2,
    1,
    'Amex Cobalt',
    'American Express',
    'AMEX',
    'MR',
    JSON_OBJECT(
        'stub', true,
        'note', 'Reward program structure TBD. Placeholder for future parsing logic.'
    ),
    'go-to card for groceries and restaurants if they take Amex'
)
ON DUPLICATE KEY UPDATE
    issuer = VALUES(issuer),
    card_type = VALUES(card_type),
    card_program = VALUES(card_program),
    benefits = VALUES(benefits),
    notes = VALUES(notes);



INSERT INTO budgets (  
    id, user_id, name, monthly_recurring, notes
) VALUES (
    1,
    1,
    'dine out myself',
    TRUE,
    'tired of cooking bruh'
),
(
    2,
    1,
    'dine out with friends',
    TRUE,
    'happy happy happy'
),
(
    3,
    1,
    'allowance',
    TRUE,
    'this is called adult money man'
),
(
    4,
    1,
    '2025 trip to NYC',
    FALSE,
    'trip with Irene'
) 
ON DUPLICATE KEY UPDATE
    monthly_recurring = VALUES(monthly_recurring),
    notes = VALUES(notes);



INSERT INTO budget_periods (
    id, budget_id, period_start, period_end, amount
) VALUES (
    1,
    1,
    '2025-04-01',
    '2025-04-30',
    300
),
(
    2,
    2,
    '2025-04-01',
    '2025-04-30',
    300
),
(
    3,
    3,
    '2025-04-01',
    '2025-04-30',
    300
),
(
    4,
    4,
    '2025-04-25',
    '2025-04-28',
    2000
),
(
    5,
    1,
    '2025-05-01',
    '2025-05-31',
    300
)
ON DUPLICATE KEY UPDATE
    period_end = VALUES(period_end),
    amount = VALUES(amount);



INSERT INTO travel (
    id, user_id, trip_name, start_date, end_date, notes
) VALUES (
    1,
    1,
    'NYC w Irene',
    '2025-04-25',
    '2025-04-28',
    'Short trip to New York with Irene'
)
ON DUPLICATE KEY UPDATE
    end_date = VALUES(end_date),
    notes = VALUES(notes);



INSERT INTO transactions (
    id, user_id, travel_id, budget_id, name, currency, price, personal_amount,
    category, subcategory, notes, datetime, payment, credit_card_id
) VALUES (
    1,
    1,
    NULL,
    2,
    'Taverniti North',
    'CAD',
    117.34,
    117.34,
    'restaurant',
    'dinner',
    'explored an Italian restaurant with Meg',
    '2025-04-09 19:00:00',
    'credit',
    2
)
ON DUPLICATE KEY UPDATE
    travel_id = VALUES(travel_id),
    budget_id = VALUES(budget_id),
    name = VALUES(name),
    currency = VALUES(currency),
    price = VALUES(price),
    personal_amount = VALUES(personal_amount),
    category = VALUES(category),
    subcategory = VALUES(subcategory),
    notes = VALUES(notes),
    datetime = VALUES(datetime),
    payment = VALUES(payment),
    credit_card_id = VALUES(credit_card_id);



INSERT INTO recurring_templates (
    id,
    user_id,
    name,
    amount,
    category,
    subcategory,
    payment,
    credit_card_id,
    start_date,
    frequency_type,
    custom_interval_days,
    next_scheduled_date,
    notes
) VALUES (
    1,
    1,
    'Rent',
    2400.00,
    'housing, utilities, bills',
    'rent',
    'debit',
    NULL,  -- or your rent payment card if applicable
    '2025-04-01',
    'monthly',
    NULL,
    '2025-05-01',
    'Recurring rent payment every 1st of the month'
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    amount = VALUES(amount),
    category = VALUES(category),
    subcategory = VALUES(subcategory),
    payment = VALUES(payment),
    credit_card_id = VALUES(credit_card_id),
    start_date = VALUES(start_date),
    frequency_type = VALUES(frequency_type),
    custom_interval_days = VALUES(custom_interval_days),
    next_scheduled_date = VALUES(next_scheduled_date),
    notes = VALUES(notes);
