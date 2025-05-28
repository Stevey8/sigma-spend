import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { fetchTransactions } from '../../lib/api';

type Transaction = {
  id: number;
  name: string;
  currency: string;
  price: number;
  personal_amount: number | null;
  category: string;
  subcategory: string;
  notes: string;
  datetime: string;
  payment: 'cash' | 'debit' | 'credit';
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
  
        // Sort by datetime ascending (oldest first)
        const sorted = data.sort(
          (a: Transaction, b: Transaction) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        );
  
        setTransactions(sorted);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadTransactions();
  }, []);
  
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>${item.price.toFixed(2)} {item.currency}</Text>
      <Text style={styles.cell}>{item.category} / {item.subcategory}</Text>
      <Text style={styles.cell}>{new Date(item.datetime).toLocaleDateString()}</Text>
      <Text style={styles.cell}>{item.payment.toUpperCase()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      {!loading && (
        <Text style={styles.count}>
          Found {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Category</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Payment</Text>
          </View>

          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </>
      )}

      <Link href="/transactions/new" asChild>
        <Button title="Add Transaction" />
      </Link>
      <Link href="/" asChild>
        <Button title="Return to Home" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
});
