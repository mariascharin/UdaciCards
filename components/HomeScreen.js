import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {loadStartDecks} from "../utils/api";

function HomeScreen({ navigation }) {

    if (this.props.route) {
        console.log('Route is a thing!');
    }

    const handleStartPlaying = (nextScreen) => {
        loadStartDecks()
            .then((allDecks) => {
                navigation.navigate(nextScreen, {allDecks});
            })
            .catch((e) => {
                console.log('Error in handleStartPlaying: ', e)
            })
    }
    return (
        <View style = {styles.MainContainer}>
            <Icon name="cards-outline" size={200} color="orange" />
            <Text style={{fontSize: 30, color: "orange"}}>UdaciCards</Text>
            <Text style={{fontSize: 10, color: "orange"}}> </Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => handleStartPlaying('DeckList')}>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: "orange",
        fontSize: 70,
        width: 210,
    }
});
