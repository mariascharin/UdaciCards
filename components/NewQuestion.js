import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { orange } from '../utils/colors';
import {addCardToDeck} from "../utils/api";

class NewQuestion extends Component  {

    state = {
        question: {
            question: '',
            answer: '',
        },
        activeButton: false,
    }

    render(){
        const { navigation, route } = this.props;
        const { deckName } = route.params;
        // Warning: Failed prop type: Invalid prop `value` of type `object`
        // supplied to `ForwardRef(TextInput)`, expected `string`.

        const addCardToDeckAction = (deckName, addedQuestion) => {
            addCardToDeck(deckName, addedQuestion)
                .then((returnItem) => {
                    navigation.navigate('IndividualDeck', {
                        deckName,
                        deck: returnItem[deckName],
                    })
                })
                .catch((e) => {
                    console.log('Error in addCardToDeckAction: ', e)
                })
        }

        const updateQuestion = (question) => {
            this.setState(() => ({
                question: {
                    question,
                    answer: this.state.question.answer,
                },
                activeButton:  ((this.state.question.question !== '')
                    && (this.state.question.answer !== ''))
            }))
        }

        const updateAnswer = (answer) => {
            this.setState(() => ({
                question: {
                    question: this.state.question.question,
                    answer,
                },
                activeButton:  ((this.state.question.question !== '')
                    && (this.state.question.answer !== ''))
            }))
        }

        // Check if there is both a question and answer before button appears
        // Change onPress to use addCardToDeckAction with this.state.question
        return (
            <View style = {styles.MainContainer}>
                <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 50, color: "orange"}}>{deckName}</Text>
                    <Text style={{fontSize: 20, color: "orange"}}> </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Type your question here!"
                        onChangeText={text => updateQuestion(text)}
                        value={this.state.question.question}
                    />
                    <Text style={{fontSize: 10, color: "orange"}}> </Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Type your answer here!"
                        onChangeText={text => updateAnswer(text)}
                        value={this.state.question.answer}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'flex-start'}}>
                    {this.state.question.question.length > 0 && this.state.question.answer.length > 0
                    && <Icon.Button style={styles.btnContainer}
                                  backgroundColor="orange"
                                  onPress={() => addCardToDeckAction(deckName, this.state.question)}
                    >
                        Save new question
                    </Icon.Button>}
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
