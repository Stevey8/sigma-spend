// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Link } from 'expo-router';


export default function IndexPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Sigma Spend</Text>
      <Text style={styles.subtitle}>Sum up your life, the Sigma way.</Text>

      <Link href="/transactions" style={styles.link}>💰 Transaction</Link>
      <Link href="/transactions/new" style={styles.link}>➕ Add Transaction</Link>
      <Link href="/budgets" style={styles.link}>📊 Budgets</Link>
      <Link href="/travel" style={styles.link}>✈️ Travel</Link>
      <Link href="/cards" style={styles.link}>💳 Credit Cards</Link>
      <Link href="/settings" style={styles.link}>⚙️ Settings</Link>
    </View>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  link: {
    fontSize: 18,
    marginVertical: 8,
    color: '#007AFF', // iOS-style blue link color
    textDecorationLine: 'underline',
  },
});
