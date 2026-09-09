import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesComponents/stylesHeaderBack';

const HeaderBack = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.header}>
			<View style={styles.containerHeader}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<Icon name="chevron-left" size={24} color="#000" />
				</TouchableOpacity>

				<Text style={styles.title}>Cantina Conecta</Text>

			</View>

		</View>
	);
};

export default HeaderBack;
