import {AsyncStorage} from "react-native";
import {startDecks} from './_DATA';

export const DECK_STORAGE_KEY = 'UdaciCards:decks'

export async function loadStartDecks() {
    try {
        let currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        if (!currentDecks) {
            currentDecks = JSON.stringify(startDecks);
            await AsyncStorage.setItem(DECK_STORAGE_KEY, currentDecks)
        }
        return(currentDecks);
    } catch(e) {
        console.log('error: ', e)
    }
}

export async function fetchDecks() {
    try {
        let currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY)
        return currentDecks != null ? JSON.parse(currentDecks) : null;
    } catch(e) {
        console.log('error: ', e)
    }
}

export async function fetchDeck(deckName) {
    try {
        let currentDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        let deck = currentDecks[currentDecks];
        return deck != null ? JSON.parse(deck) : null;
    } catch(e) {
        console.log('error: ', e)
    }
}
