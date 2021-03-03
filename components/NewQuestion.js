import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';
import {fetchDecks, loadStartDecks} from "../utils/api";

class NewQuestion extends Component  {

    state = {
        text: ''
    }


    render(){
        const { navigation } = this.props;
        const setText = (questionAnswer, text) => {
            this.setState(() => ({
                [questionAnswer]: text,
            }))
        }

        return (
            <View style = {styles.MainContainer}>
                <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 50, color: "orange"}}>New Deck</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>

                    <TextInput
                        style={{height: 40}}
                        placeholder="Type your question here!"
                        onChangeText={text => setText('question', text)}
                        value={this.state.question}
                    />

                    <TextInput
                        style={{height: 40}}
                        placeholder="Type your answer here!"
                        onChangeText={text => setText('answer', text)}
                        value={this.state.answer}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'flex-start' }}>
                    <Icon.Button style={styles.btnContainer}
                                 backgroundColor="orange"
                                 onPress={() => navigation.navigate('TestScreen')}>
                        Save new question
                    </Icon.Button>
                </View>
            </View>
        );
    }
}

export default NewQuestion;

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
