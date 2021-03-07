import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, white } from '../utils/colors';
import {deleteDeck} from "../utils/api";

function IndividualDeck({ route, navigation }) {
    const { deckName, deck } = route.params;

    const deleteDeckAction = (deckName) => {
        deleteDeck(deckName)
            .then((allDecks) => {
                navigation.navigate('DeckList');
            })
            .catch((e) => {
                console.log('Error in deleteDeckAction: ', e)
            })
    }

    const addQuestion = (deckName) => {
        navigation.navigate('NewQuestion', {deckName})
    }

    return (
        <View style = {styles.MainContainer}>
            <Icon name="cards-outline" size={100} color="orange" />
            <Text style={{fontSize: 35, color: "orange"}}>{deckName}</Text>
            {deck.questions.length === 1
                ? <Text style={{fontSize: 20, color: white}}>{`${deck.questions.length} card`}</Text>
                : <Text style={{fontSize: 20, color: white}}>{`${deck.questions.length} cards`}</Text>}
            <Text style={{fontSize: 35, color: "orange"}}> </Text>
            {deck.questions.length === 0
                ? <Text style={{fontSize: 20, color: white}}>You must add questions before playing!</Text>
                : <Icon.Button style={styles.btnContainer}
                    backgroundColor="orange"
                    onPress={() => navigation.navigate('Quiz', {
                    deckName,
                    deck,
                })}>
                    Start Quiz
                </Icon.Button>}
            <Text style={{fontSize: 5, color: "orange"}}> </Text>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => addQuestion(deckName)}
            >
                Add Question
            </Icon.Button>
            <Text style={{fontSize: 10, color: "orange"}}> </Text>
            <Button
                onPress={() => deleteDeckAction(deckName)}
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
