import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {loadStartDecks} from "../utils/api";

// HomeScreen
// DeckList
// NewDeck
// IndividualDeck
// NewQuestion
// Quiz
// ResultsCard

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
                onPress={() => navigation.navigate('NewQuestion')}
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
                onPress={() => navigation.navigate('ResultsCard', {result})}
                title="Check ResultsCard"
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
