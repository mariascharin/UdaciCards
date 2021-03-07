import React, { Component } from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, white } from '../utils/colors';
import {fetchDecks} from "../utils/api";

class Quiz extends Component  {

    state = {
        questionFaceUp: true,
        currentIndex: 0,
        nbrQuestions: 0,
        nbrCorrectAnswers: 0,
        questions: [],
        answers: [],
        result: {
            correctAnswers: 0,
            incorrectAnswers: 0,
        },
    }

    componentDidMount() {
        const questions = this.props.route.params.deck.questions;
        const nbrQuestions = this.props.route.params.deck.questions.length;
        this.setState(() => ({
            ...this.state,
            nbrQuestions,
            questions: questions,
        }));
    }

    render(){
        const { route, navigation } = this.props;
        const { deckName, deck } = route.params;
        const {nbrQuestions, currentIndex, result} = this.state;
        const showResults = currentIndex === nbrQuestions
        const ticker = !showResults ? `${currentIndex + 1}/${nbrQuestions}` : ' ';

        const answer = (correct) => {
            const correctAnswers = correct ? result.correctAnswers + 1 : result.correctAnswers;
            const incorrectAnswers = !correct ? result.incorrectAnswers + 1 : result.incorrectAnswers;
            const nextIndex = currentIndex + 1;
            this.setState(() => ({
                ...this.state,
                questionFaceUp: true,
                currentIndex: nextIndex,
                result: {
                    correctAnswers,
                    incorrectAnswers,
                }
            }))
        }

    const cardContents = () => {
        const {questionFaceUp, currentIndex} = this.state;
        const text = questionFaceUp
            ? deck.questions[currentIndex].question
            : deck.questions[currentIndex].answer;
        const buttonText = questionFaceUp
            ? 'View Answer'
            : 'View Question';
        const flipCardAction = () => {
            this.setState(() => ({
                ...this.state,
                questionFaceUp: !questionFaceUp,
            }))
        }

        return (
            <View style = {styles.MainContainer}>
                <View style = {styles.QuestionContainer}>
                    <Text style={{
                        fontSize: 40,
                        color: "orange",
                        textAlign: "center"
                    }}>
                        {text}
                    </Text>
                    <Button
                        color={white}
                        title={buttonText}
                        onPress={() => flipCardAction()}
                    />
                </View>
                <View style = {styles.BottomButtonContainer}>
                    <Icon.Button
                        style={styles.correctBtnContainer}
                        onPress={() => answer(true)}
                    >
                        Correct
                    </Icon.Button>
                    <Icon.Button
                        style={styles.incorrectBtnContainer}
                        onPress={() => answer(false)}
                    >
                        Incorrect
                    </Icon.Button>
                </View>
            </View>
        )
    }

    const resultContents = () => {
        const correctAnswers = this.state.result.correctAnswers;
        const incorrectAnswers = this.state.result.incorrectAnswers;
        const percent = Math.round(100 * correctAnswers/(correctAnswers + incorrectAnswers));
        const playAgain = () => {
            this.setState(() => (
                {...this.state,
                currentIndex: 0,
                    result: {
                        correctAnswers: 0,
                        incorrectAnswers: 0,
                    },
                }))
            }
            return (
                <View style = {styles.MainContainer}>
                <View style = {styles.QuestionContainer}>
                    <View style={{flex: 3, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 50, color: "orange"}}>Result</Text>
                        <Text style={{fontSize: 50, color: "orange"}}>{`${percent} %`}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={{ color: white }}>Correct: {correctAnswers}</Text>
                        <Text style={{ color: white }}>Incorrect: {incorrectAnswers}</Text>
                    </View>
                    <View style = {styles.BottomButtonContainer}>
                        <Icon.Button style={styles.btnContainer}
                                     backgroundColor="orange"
                                     onPress={() => navigation.navigate('DeckList')}>
                            Back to Start Screen
                        </Icon.Button>
                        <Icon.Button style={styles.btnContainer}
                                     backgroundColor="orange"
                                     onPress={() => playAgain()}>
                            Play Again
                        </Icon.Button>
                    </View>
                </View>
                </View>
            );
        }

    return (
        <View style = {styles.MainContainer}>
            <Text style={styles.TickerContainer}>{ticker}</Text>
            {!showResults && cardContents()}
            {showResults && resultContents()}
            <View style={styles.BottomMargin}></View>
        </View>
    )}
}

export default Quiz;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#ffc93c',
    },
    TickerContainer: {
        fontSize: 20,
        padding: 10,
        color: white,
    },
    backForwardBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 70,
        width: 210,
        backgroundColor: 'orange',
    },
    TopButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    QuestionMainContainer: {
        flex: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    QuestionContainer: {
        height: 40,
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BottomButtonContainer: {
        padding: 40,
        height: 50,
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    BottomMargin: {
        height: 50,
        flex: 1,
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        fontSize: 70,
        width: 210,
        backgroundColor: 'orange',
    },
    correctBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 70,
        width: 210,
        backgroundColor: 'green',
    },
    incorrectBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 70,
        width: 210,
        backgroundColor: 'red',
    }
});
