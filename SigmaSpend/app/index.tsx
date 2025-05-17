// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function IndexPage() {
  const handleAddTransaction = () => {
    Alert.alert('Navigate', 'This would navigate to the Add Transaction screen.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Sigma Spend</Text>
      <Text style={styles.subtitle}>Sum up your life, the Sigma way.</Text>
      <Button title="➕ Add Transaction" onPress={handleAddTransaction} />
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
});
