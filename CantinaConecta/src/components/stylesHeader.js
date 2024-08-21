import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        paddingVertical: 15,
        backgroundColor: "#FFFFFF",
    },
    title: {
        justifyContent: 'center',
        textAlign: "center",
        fontWeight: "bold",
        paddingLeft: 90,
        fontSize: 20,
        color: "#000"
    },
    perfil: {
        textAlign: 'right',
        fontWeight: "bold",
        fontSize: 20,
        color: "#000"
    },
    icon: {
        padding: 5,

    },
    containerHeader: {
        width: width,
        paddingTop: 45,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
})

export default styles;