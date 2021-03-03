import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {loadStartDecks} from "../utils/api";

function HomeScreen({ navigation }) {

    const handleStartPlaying = (nextScreen) => {
        let allDecks;
        loadStartDecks()
            .then((returnItem) => {
                allDecks = returnItem;
                navigation.navigate(nextScreen, {allDecks});
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }
    return (
        <View style = {styles.MainContainer}>
            <Icon name="cards-outline" size={200} color="orange" />
            <Text style={{fontSize: 30, color: "orange"}}>UdaciCards</Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('TestScreen')}>
                Start playing
            </Icon.Button>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc93c',
    },
    btnContainer: {
        alignItems: 'center',
        padding: 20,
        color: "orange",
        fontSize: 70
    }
});
