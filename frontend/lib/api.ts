import Constants from 'expo-constants';

const { API_PORT } = Constants.expoConfig?.extra || {};
const BASE_URL = `http://10.0.0.235:${API_PORT}`;

export async function fetchTransactions() {
  const res = await fetch(`${BASE_URL}/api/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function fetchURL() {
  return `${BASE_URL}/api/transactions`;
}


// Example: add a new transaction
export async function createTransaction(data: any) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create transaction');
  return res.json();
}

// Add more API helpers as needed
