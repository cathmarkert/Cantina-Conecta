import * as React from "react";
import { SectionList, View, Text, TouchableOpacity } from "react-native";
import styles from "../stylesScreen/stylesExtratoCompras";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const ExtratoCompra = () => {

    const navigation = useNavigation();

    const data = [
        { id: '1', studentName: 'Ana Silva', responsibleName: 'Carlos Silva', value: 'R$ 4,50', date: '11/02/2024' },
        { id: '2', studentName: 'Pedro Santos', responsibleName: 'Maria Santos', value: 'R$ 4,50', date: '11/02/2024' },
        { id: '3', studentName: 'João Oliveira', responsibleName: 'Lucia Oliveira', value: 'R$ 50,00', date: '11/02/2024' },
        { id: '4', studentName: 'Lucas Pereira', responsibleName: 'Fernanda Pereira', value: 'R$ 4,50', date: '12/02/2024' },
        { id: '5', studentName: 'Juliana Costa', responsibleName: 'Ricardo Costa', value: 'R$ 50,00', date: '12/02/2024' },
        { id: '6', studentName: 'Mariana Lima', responsibleName: 'Bruno Lima', value: 'R$ 4,50', date: '13/02/2024' },
        { id: '7', studentName: 'Roberto Almeida', responsibleName: 'Patricia Almeida', value: 'R$ 4,50', date: '13/02/2024' },
        { id: '8', studentName: 'Camila Rocha', responsibleName: 'Eduardo Rocha', value: 'R$ 4,50', date: '01/02/2024' },
        { id: '9', studentName: 'Thiago Martins', responsibleName: 'Renata Martins', value: 'R$ 4,50', date: '05/02/2024' },
        { id: '10', studentName: 'Larissa Ferreira', responsibleName: 'Gabriel Ferreira', value: 'R$ 4,50', date: '24/02/2024' },
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
                <Text style={styles.responsibleName}>{item.responsibleName}</Text>
                <Text style={styles.studentName}>{item.studentName}</Text>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>

            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Extrato de Compras</Text>
                </View>

                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Responsável</Text>
                    <Text style={styles.headerText}>Aluno</Text>
                    <Text style={styles.headerText}>Valor</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <SectionList
                        sections={sections}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                    />
                </View>

                <View style={styles.footerSpacer} />

            </View>

            <View style={styles.ContainerButton}>
                <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('Selecionar')}>
                    <Icon name="pencil" color="#fff" size={20} />
                    <Text style={styles.selectButtonText}>Adicionar Compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ExtratoCompra;
