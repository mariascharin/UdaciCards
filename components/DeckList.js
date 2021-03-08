import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { orange, white } from '../utils/colors';
import {loadStartDecks} from "../utils/api";

function DeckList({ navigation, route }) {
    const [allDecks, setAllDecks] = useState({});

    useEffect(() => {
        loadStartDecks()
            .then((returnItem) => {
                console.log('Calling loadStartDecks ', returnItem);
                setAllDecks(returnItem);
            })
            .catch((e) => {
                console.log('Error when calling loadStartDecks: ', e)
            })
    }, [route])

    const deckTitles = Object.keys(allDecks);

    const cardButton = (deckName) => {
        return (
            <View key={deckName}>
                <Icon.Button
                    style={styles.btnContainer}
                     backgroundColor="orange"
                     onPress={() => {
                         navigation.navigate('IndividualDeck', {
                             deckName,
                             deck: allDecks[deckName],
                         })
                     }}
                >
                    {`${deckName} (${allDecks[deckName].questions.length} cards)`}
                </Icon.Button>
                <Text style={{fontSize: 3, color: "orange"}}> </Text>
            </View>
        )
    }

    return (
        <View>
            <Icon name="cards-outline" size={200} color="orange"/>
            <Text style={{fontSize: 50, color: "orange"}}> </Text>
            <Text style={{fontSize: 30, color: "orange"}}>Select Deck:</Text>
            <Text style={{fontSize: 10, color: "orange"}}> </Text>

            {deckTitles.map((thisTitle) => (
                cardButton(thisTitle)
            ))}
            <Text style={{fontSize: 50, color: "orange"}}> </Text>
            <Icon.Button style={styles.newDeckBtnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('NewDeck')}>
                Add New Deck
            </Icon.Button>

        </View>
    );
//}
}

export default DeckList;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },
    btnContainer: {
        alignItems: 'center',
        padding: 10,
        color: "orange",
        fontSize: 70,
        borderRadius: 0,
    },
    newDeckBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: "orange",
        fontSize: 70,
        width: 210,
}
});
