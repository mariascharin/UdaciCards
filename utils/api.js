import {AsyncStorage} from "react-native";
import {startDecks} from './_DATA';

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

export async function resetDecks() {
    try {

        await AsyncStorage.removeItem(DECK_STORAGE_KEY);
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        return currentDecks;

    } catch(e) {
        console.log('Error in resetDecks: ', e)
    }
}

export async function loadStartDecks() {
    try {
        let currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));
        if (!currentDecks) {
            console.log('No decks discovered. Loading start decks.');
            await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(startDecks));
            return(startDecks);
        }
        return(currentDecks);
    } catch(e) {
        console.log('Error in loadStartDecks: ', e)
    }
}

export async function fetchDecks() {
    try {
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        return currentDecks != null ? JSON.parse(currentDecks) : null;
    } catch(e) {
        console.log('Error in fetchDecks: ', e)
    }
}

export async function fetchDeck(deckName) {
    try {
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        const currentDecksParsed = JSON.parse(currentDecks);
        const fetchedDeck = currentDecksParsed[deckName];
        return fetchedDeck != null ? fetchedDeck : null;
    } catch(e) {
        console.log('Error in fetchDeck: ', e)
    }
}

export async function saveDeckTitle(deckName) {
    try {
        const currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));

        const updatedDecks = {
            ...currentDecks,
            [deckName]: {
                title: deckName,
                questions: [],
            }
        }
        await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(updatedDecks));

        return updatedDecks;
    } catch(e) {
        console.log('Error in saveDeckTitle: ', e)
    }
}

export async function addCardToDeck(deckName, newQuestion) {
    try {
        const currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));

        const updatedDecks = {
            ...currentDecks,
            [deckName]: {
                ...currentDecks[deckName],
                questions: currentDecks[deckName].questions.concat({
                    question: newQuestion.question,
                    answer: newQuestion.answer,})
            }
        }
        await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(updatedDecks));
        return updatedDecks;
    } catch(e) {
        console.log('Error in addCardToDeck: ', e)
    }
}


export async function deleteDeck(deckName) {
    try {
        const currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));
        delete currentDecks[deckName];
        await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(currentDecks));
        return currentDecks;
    } catch(e) {
        console.log('error: ', e)
    }
}
