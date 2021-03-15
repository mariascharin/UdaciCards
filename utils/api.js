import {AsyncStorage, Alert, Linking} from "react-native";
import {startDecks} from './_DATA';
import {thisMoment, timeToString} from './helpers';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const NOTIFICATION_KEY = 'UdaciCards:notification';
export const DECK_STORAGE_KEY = 'UdaciCards:decks';

export async function clearNotifications() {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    Notifications.cancelAllScheduledNotificationsAsync();
}

export async function resetReminder() {
    // Cancels reminder if it exists, then creates new reminder
    clearNotifications()
        .then(() => console.log('Successfully cancelled notification in resetReminder'))
        .catch(e => console.error('Error in resetReminder: ', e))
    setDailyNotification();
}

export const setDailyNotification = (notificationId) => {
    // Specifies reminder message and schedules it for next time due
    const localNotification = {
        content: {
            title: "Remember to keep learning 👋",
            body: "👋 A gentle reminder to do your daily quiz!",
        },
        trigger: {
            hour: 20,
            repeats: true
        }
    }
    Notifications.scheduleNotificationAsync(localNotification)
        .then(id => console.info(`Notification scheduled (${id}) for 20.00 tomorrow`))
        .catch(e => console.error('Error in scheduleNotificationAsync: ', e))
}

export const sendImmediateNotification = () => {
    const localNotification = {
        content: {
            title: "Remember to keep learning 👋",
            body: "👋 A gentle reminder to do your daily quiz!",
        },
        trigger:
            null
    }

    console.log('Scheduling immediate notification:', { localNotification })

    Notifications.scheduleNotificationAsync(localNotification)
        .then(id => console.info(`Immediate notification scheduled (${id}) at ${thisMoment()}`))
        .catch(err => console.error(err))

}

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
        //console.log('currentDecks', currentDecks);
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
        console.log('Error in deleteDeck: ', e)
    }
}
