import React, { useEffect, useState } from 'react';
import { SectionList, View, Text } from 'react-native';
import styles from '../stylesScreen/stylesExtrato'; // Import the styles
import { getRepository } from 'typeorm'; // Import TypeORM's getRepository
import { Transaction } from '../entities/Transaction'; // Import Transaction entity

const Extrato = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactionRepository = getRepository(Transaction);
                const allTransactions = await transactionRepository.find({ relations: ['dependent'] });
                setTransactions(allTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const groupByDate = (data) => {
        const sections = data.reduce((acc, item) => {
            const date = item.date;
            const section = acc.find(section => section.date === date);
            if (section) {
                section.data.push(item);
            } else {
                acc.push({ date, data: [item] });
            }
            return acc;
        }, []);

        sections.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
        return sections;
    };

    const sections = groupByDate(transactions);

    const renderSectionHeader = ({ section: { date } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{date}</Text>
        </View>
    );

    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 === 0 ? '#F0F0F0' : '#CACACA';

        return (
            <View style={[styles.item, { backgroundColor }]}>
                <Text style={item.type === '+' ? styles.positive : styles.negative}>{item.sign}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Extrato</Text>
                </View>
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                />
            </View>
        </View>
    );
};

export default Extrato;
