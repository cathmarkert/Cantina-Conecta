import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './stylesExtratochild';

const screenWidth = Dimensions.get('window').width;

const ExtratoChild = ({ route }) => {
    const { transactions } = route.params;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
        });
    };

    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const date = formatDate(transaction.date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    const groupedTransactions = groupTransactionsByDate(transactions);

    const groupedTransactionsArray = Object.keys(groupedTransactions).map((date) => ({
        date,
        data: groupedTransactions[date],
    }));

    const renderTransactionItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <Text
                style={[
                    styles.symbol,
                    { color: item.type === 'debit' ? 'red' : 'green' },
                ]}
            >
                {item.type === 'debit' ? '-' : '+'}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
        </View>

    );

    const renderTransactionGroup = ({ item }) => (
        <View style={styles.groupContainer}>
            <Text style={styles.sectionTitle}>{item.date}</Text>
            <FlatList
                data={item.data}
                renderItem={renderTransactionItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={groupedTransactionsArray}
                renderItem={renderTransactionGroup}
                keyExtractor={(item) => item.date}
            />
        </View>
    );
};


export default ExtratoChild;