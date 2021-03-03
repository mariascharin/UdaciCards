import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';
import {fetchDecks, loadStartDecks} from "../utils/api";

class NewDeck extends Component  {

    state = {
        text: ''
    }


    render(){
        const setText = (text) => {
            this.setState(() => ({
                text,
            }))
        }
        const { navigation } = this.props;

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
                    <Icon.Button style={styles.btnContainer}
                                 backgroundColor="orange"
                                 onPress={() => navigation.navigate('TestScreen')}>
                        Save new deck
                    </Icon.Button>
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
