import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';

function IndividualDeck({ route, navigation }) {
    const { deckName, deck } = route.params;
    return (
        <View style = {styles.MainContainer}>
            <Icon name="cards-outline" size={100} color="orange" />
            <Text style={{fontSize: 35, color: "orange"}}>{deckName}</Text>
            <Text style={{fontSize: 20, color: white}}>{`${deck.questions.length} cards`}</Text>
            <Text style={{fontSize: 35, color: "orange"}}> </Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('TestScreen')}>
                Start Quiz
            </Icon.Button>
            <Text style={{fontSize: 5, color: "orange"}}> </Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('TestScreen')}>
                Add Question
            </Icon.Button>
            <Text style={{fontSize: 10, color: "orange"}}> </Text>
            <Button
                onPress={() => navigation.navigate('TestScreen')}
                title="Delete Deck"
                color={"red"}
            />
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: "blue",
        fontSize: 70,
        width: 210,
    }
});
