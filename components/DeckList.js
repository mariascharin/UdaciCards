import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';

function DeckList({ route, navigation }) {
    const { allDecks } = route.params;
    const deckTitles = Object.keys(allDecks);

    const cardButton = (deckName) => {
        return (
            <View key={deckName}>
                <Icon.Button style={styles.btnContainer}
                             backgroundColor="orange"
                             onPress={() => navigation.navigate('TestScreen')}>
                    {deckName}
                </Icon.Button>
            </View>
        )
    }

    return (
        <View>
            <Icon name="cards-outline" size={200} color="orange"/>
            <Text style={{fontSize: 30, color: "orange"}}>Select Deck:</Text>

            {deckTitles.map((thisTitle) => (
                cardButton(thisTitle)
            ))}
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
});
