import {AsyncStorage} from "react-native";
import {startDecks} from './_DATA';

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

export async function resetDecks() {
    try {

        await AsyncStorage.removeItem(DECK_STORAGE_KEY);
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        return currentDecks;

    } catch(e) {
        console.log('error: ', e)
    }
}

export async function loadStartDecks() {
    try {
        let currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        if (!currentDecks) {
            console.log('in if clause loadStartDecks startDecks: ', startDecks);
            await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(startDecks))
        }
        return(startDecks);
    } catch(e) {
        console.log('error: ', e)
    }
}

export async function fetchDecks() {
    try {
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        console.log('fetchDecks currentDecks: ', currentDecks)
        return currentDecks != null ? JSON.parse(currentDecks) : null;
    } catch(e) {
        console.log('error: ', e)
    }
}

export async function fetchDeck(deckName) {
    try {
        const currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        // console.log('currentDecks: ', currentDecks)
        const currentDecksParsed = JSON.parse(currentDecks);
        //const deck = JSON.parse(currentDecks)[deckName];
        // console.log('currentDecksParsed: ', currentDecksParsed)
        // console.log('Object.keys(currentDecksParsed): ', Object.keys(currentDecksParsed))
        const fetchedDeck = currentDecksParsed[deckName];
        // console.log('fetchedDeck: ', fetchedDeck)
        return fetchedDeck != null ? fetchedDeck : null;
    } catch(e) {
        console.log('error: ', e)
    }
}

export async function saveDeckTitle(deckName) {
    try {
        console.log('deckName ', deckName);
        const currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));
        console.log('currentDecks ', currentDecks);

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
        console.log('error: ', e)
    }
}

export async function addCardToDeck(deckName, newQuestion) {
    try {
        let currentDecks =  JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));

        const updatedDecks = {
            ...currentDecks,
            [deckName]: {
                ...currentDecks[deckName],
                questions: currentDecks[deckName].questions.concat({
                    question: newQuestion.question,
                    answer: newQuestion.answer,})
            }
        }
        return updatedDecks;
    } catch(e) {
        console.log('error: ', e)
    }
}


export async function deleteDeck(deckName) {
    try {
        const currentDecks = JSON.parse(await AsyncStorage.getItem(DECK_STORAGE_KEY));
        // console.log('currentDecks: ', currentDecks)
        //const currentDecksParsed = JSON.parse(currentDecks);
        //const deck = JSON.parse(currentDecks)[deckName];
        // console.log('currentDecksParsed: ', currentDecksParsed)
        // console.log('Object.keys(currentDecksParsed): ', Object.keys(currentDecksParsed))
        delete currentDecks[deckName];
        await AsyncStorage.setItem(DECK_STORAGE_KEY,  JSON.stringify(currentDecks));
        // console.log('fetchedDeck: ', fetchedDeck)
        return currentDecks;
    } catch(e) {
        console.log('error: ', e)
    }
}
