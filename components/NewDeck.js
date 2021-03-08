import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { orange } from '../utils/colors';
import {saveDeckTitle} from "../utils/api";

class NewDeck extends Component  {

    state = {
        text: ''
    }

    render(){
        const { navigation } = this.props;
        const setText = (text) => {
            this.setState(() => ({
                text,
            }))
        }
        const saveDeck = () => {
            const deckName = this.state.text;
            saveDeckTitle(deckName)
                .then((returnItem) => {
                    navigation.navigate('IndividualDeck', {
                        deckName,
                        deck: returnItem[deckName],
                    })
                })
                .catch((e) => {
                    console.log('Error in saveDeck: ', e)
                })
        }

        return (
            <View style = {styles.MainContainer}>
                <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 50, color: "orange"}}>New Deck</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Type your deck name here!"
                        onChangeText={text => setText(text)}
                        defaultValue={"text"}
                        value={this.state.text}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'flex-start' }}>
                    {this.state.text.length > 0 &&
                    <Icon.Button style={styles.btnContainer}
                                  backgroundColor="orange"
                                  onPress={() => saveDeck()}>
                        Save new deck
                    </Icon.Button>}
                </View>
            </View>
        );
    }
}

export default NewDeck;

const styles = StyleSheet.create({
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
