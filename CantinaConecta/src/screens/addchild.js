import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddchild';


const AddChild = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>

                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Nome Completo: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Nome"
                        placeholderTextColor="#B0B0B0"
                        editable={false}
                    />

                    <Text style={styles.textText}>Matrícula: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Matrícula"
                        placeholderTextColor="#B0B0B0"
                    />

                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddChild;