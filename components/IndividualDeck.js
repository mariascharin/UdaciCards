import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';

function IndividualDeck({ route, navigation }) {
    const { deckName, deck } = route.params;
    return (
        <View style = {styles.MainContainer}>
            <Icon name="cards-outline" size={100} color="orange" />
            <Text style={{fontSize: 35, color: "orange"}}>{deckName}</Text>
            <Text style={{fontSize: 20, color: white}}>{`${deck.questions.length} cards`}</Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('TestScreen')}>
                Start Quiz
            </Icon.Button>
        </View>
    );
}

export default IndividualDeck;

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
        color: "blue",
        fontSize: 70
    }
});
