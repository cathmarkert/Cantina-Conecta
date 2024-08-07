import * as React from "react";
import { SectionList, View, Text } from "react-native";
import HeaderHome from "../components/header";
import styles from "./stylesExtrato";

const Extrato = () => {
  const data = [
    { id: '1', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '11/02/2024' },
    { id: '2', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '11/02/2024' },
    { id: '3', type: 'Saldo', value: 'R$ 50,00 ', sign: '+', date: '11/02/2024' },
    { id: '4', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '12/02/2024' },
    { id: '5', type: 'Saldo', value: 'R$ 50,00 ', sign: '+', date: '12/02/2024' },
    { id: '6', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '13/02/2024' },
    { id: '7', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '13/02/2024' },
    { id: '8', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '01/02/2024' },
    { id: '9', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '05/02/2024' },
    { id: '10', type: 'Lanche', value: 'R$ 4,50 ', sign: '-', date: '24/02/2024' },
  ];

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

  const sections = groupByDate(data);

  const renderSectionHeader = ({ section: { date } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{date}</Text>
    </View>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? '#F0F0F0' : '#CACACA';

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text style={item.sign === '+' ? styles.positive : styles.negative}>{item.sign}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View>
        <HeaderHome />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Extrato</Text>
        </View>

        <View style={styles.contentContainer}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        </View>
      </View>
    </View>
  );
};

export default Extrato;
