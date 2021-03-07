import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {resetDecks, loadStartDecks, fetchDecks, fetchDeck, saveDeckTitle, addCardToDeck, deleteDeck} from "../utils/api";

// TEST SCREENS:
// HomeScreen
// DeckList
// NewDeck
// IndividualDeck
// NewQuestion
// Quiz
// TEST API FUNCTIONS:
// fetchDecks - to make sure there is no data for DECK_STORAGE_KEY = 'UdaciCards:decks'
// loadStartDecks
// fetchDecks
// fetchDeck(deckName)
// saveDeckTitle(deckName)
// addCardToDeck(deckName, newQuestion)



function TestScreen({ navigation }) {

    const deckName = 'React';
    const deck = {
        "title": "React",
        "questions": [
            {
                "answer": "A library for managing user interfaces",
                "question": "What is React?",
            }, {
                "answer": "The componentDidMount lifecycle event",
                "question": "Where do you make Ajax requests in React?",
            },
        ],
    }
    const allDecks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
    }
    const result = {
        correctAnswers: 3,
        incorrectAnswers: 2,
        unanswered: 1,
    }

    function testResetDecks() {
        resetDecks()
            .then((returnItem) => {
                if (!returnItem) {
                    console.log('testResetDecks succeeded');
                } else {
                    console.log('testResetDecks not working as expected');
                }
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testStartPosition() {
        fetchDecks()
            .then((returnItem) => {
                console.log('testStartPosition all decks:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testLoadStartDecks() {
        loadStartDecks()
            .then((returnItem) => {
                console.log('testLoadStartDecks all decks:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testFetchDecks() {
        fetchDecks()
            .then((returnItem) => {
                console.log('testFetchDecks all decks:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testFetchDeck(deckName) {
        fetchDeck(deckName)
            .then((returnItem) => {
                console.log('testFetchDeck all decks:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testSaveDeckTitle(addedDeckName) {
        saveDeckTitle(addedDeckName)
            .then((returnItem) => {
                console.log('testSaveDeckTitle returnItem:', returnItem);
                console.log('testSaveDeckTitle returnItem keys:', Object.keys(returnItem));
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testAddCardToDeck(deckName, addedQuestion) {
        addCardToDeck(deckName, addedQuestion)
            .then((returnItem) => {
                console.log('testAddCardToDeck returnItem:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    function testDeleteDeck(deckName) {
        deleteDeck(deckName)
            .then((returnItem) => {
                console.log('testDeleteDeck returnItem:', returnItem);
            })
            .catch((e) => {
                console.log('error: ', e)
            })
    }

    return (
        <View style = {styles.MainContainer}>
            <Button
                onPress={() => navigation.navigate('HomeScreen')}
                title="Check HomeScreen"
            />
            <Button
                onPress={() => navigation.navigate('DeckList', {allDecks})}
                title="Check DeckList"
            />
            <Button
                onPress={() => navigation.navigate('NewDeck')}
                title="Check NewDeck"
            />
            <Button
                onPress={() => navigation.navigate('IndividualDeck',
                    {
                        deckName,
                        deck,
                    })}
                title="Check IndividualDeck"
            />
            <Button
                onPress={() => navigation.navigate('NewQuestion',
                    {
                        deckName,
                        deck,
                    })}
                title="Check NewQuestion"
            />
            <Button
                onPress={() => navigation.navigate('Quiz',
                    {
                        deckName,
                        deck,
                    })}
                title="Check Quiz"
            />
            <Button
                onPress={() => testResetDecks()}
                title="function: testResetDecks"
            />
            <Button
                onPress={() => testStartPosition()}
                title="function: testStartPosition"
            />
            <Button
                onPress={() => testLoadStartDecks()}
                title="function: testLoadStartDecks"
            />
            <Button
                onPress={() => testFetchDecks()}
                title="function: testFetchDecks"
            />
            <Button
                onPress={() => testFetchDeck("React")}
                title="function: testFetchDeck"
            />
            <Button
                onPress={() => testSaveDeckTitle("FunFairs")}
                title="function: testSaveDeckTitle"
            />
            <Button
                onPress={() => testAddCardToDeck("JavaScript", {
                    question: "z",
                    answer: "v"
                })}
                title="function: testAddCardToDeck"
            />
            <Button
                onPress={() => testDeleteDeck("CapitalVillages")}
                title="function: testDeleteDeck"
            />
        </View>
    );
}

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        //backgroundColor: Platform.OS === 'ios' ? "#ffc93c" : 'blue'
        backgroundColor: "#ffc93c"
    },
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
