import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'

// We'll use AsyncStorage to store our decks and flashcards. Redux is optional for this project.
// Using AsyncStorage you'll manage an object whose shape is similar to below.
// Notice each deck creates a new key on the object.
// Each deck has a title and a questions key.
// title is the title for the specific deck and questions is an array of questions
// and answers for that deck.
const DeckExample = {
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
    }
};




// To manage your AsyncStorage database, you'll want to create four different helper methods:
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.


export function getMetricMetaInfo (metric) {
    const info = {
        run: {
            displayName: 'Run',
            max: 50,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: red}]}>
                        <MaterialIcons
                            name='directions-run'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        bike: {
            displayName: 'Bike',
            max: 100,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: orange}]}>
                        <MaterialCommunityIcons
                            name='bike'
                            color={white}
                            size={32}
                        />
                    </View>
                )
            }
        },
        swim: {
            displayName: 'Swim',
            max: 9900,
            unit: 'meters',
            step: 100,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: blue}]}>
                        <MaterialCommunityIcons
                            name='swim'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        sleep: {
            displayName: 'Sleep',
            max: 24,
            unit: 'hours',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
                        <FontAwesome
                            name='bed'
                            color={white}
                            size={30}
                        />
                    </View>
                )
            }
        },
        eat: {
            displayName: 'Eat',
            max: 10,
            unit: 'rating',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: pink}]}>
                        <MaterialCommunityIcons
                            name='food'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
    }

    return typeof metric === 'undefined'
        ? info
        : info[metric]
}

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}
