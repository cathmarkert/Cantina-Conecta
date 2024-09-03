import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../stylesScreen/stylesAddaviso';


const AddAviso = () => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };


    return (

        <View style={styles.container}>

            <View style={styles.backgroundSection}>

                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Adicionar aviso: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o aviso"
                        placeholderTextColor="#B0B0B0"
                        editable={true}
                    />

                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}> Notificar responsáveis </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddAviso;