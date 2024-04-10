import * as React from "react";
import HeaderHome from '../components/header'
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const Home = () => {
  return (
    <View>
        <HeaderHome />
    </View>
  );
}

const styles= StyleSheet.create({
    text:{
        alignItems:"center"
    }
})
export default Home;