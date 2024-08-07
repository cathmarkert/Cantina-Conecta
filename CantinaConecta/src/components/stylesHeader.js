import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header:{
        height:90,
        width:width,
        paddingTop:45,
        backgroundColor:"#FFFFFF",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    title:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color:"#000"
    },
    icon:{
        padding:5,
        
    }
})

export default styles;