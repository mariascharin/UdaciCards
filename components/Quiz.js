import React, { Component } from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';

class Quiz extends Component  {

    state = {
        questionFaceUp: true,
        currentIndex: 0,
        nbrQuestions: 0,
        nbrCorrectAnswers: 0,
        questions: [],
        answers: [],
    }

    componentDidMount() {
        const questions = this.props.route.params.deck.questions;
        const nbrQuestions = this.props.route.params.deck.questions.length;
        this.setState(() => ({
            ...this.state,
            nbrQuestions,
            questions: questions,
            answers: questions,
        }));
    }

    render(){
        const { route, navigation } = this.props;
        const { deckName, deck } = route.params;

        const calculateResult = () => {
            const correctAnswers = this.state.answers.map((question) => (
                question.correctAnswer === true))
                .length;
            const incorrectAnswers = this.state.answers.map((question) => (
                question.correctAnswer === false))
                .length;
            return {
                correctAnswers,
                incorrectAnswers,
                unanswered: this.state.nbrQuestions - correctAnswers - incorrectAnswers
            };
        }

        const handleViewResults = () => {

            const result = calculateResult();

            this.setState(() => ({
                questionFaceUp: true,
                currentIndex: 0,
                nbrQuestions: 0,
                nbrCorrectAnswers: 0,
                questions: [],
                answers: [],
            }))

            navigation.navigate('ResultsCard', {
                result,
            })

        }

        const nextCard = () => {
            const {nbrQuestions, currentIndex} = this.state;
            if (currentIndex <= nbrQuestions - 1){
                const nextIndex = currentIndex + 1;
                this.setState((state) => ({
                    ...state,
                    questionFaceUp: true,
                    currentIndex: nextIndex,
                }))
            }
        }

        const previousCard = () => {
            const currentIndex = this.state.currentIndex;
            if (currentIndex > 0){
                const nextIndex = currentIndex - 1;
                this.setState(() => ({
                    ...this.state,
                    questionFaceUp: true,
                    currentIndex: nextIndex,
                }))
            }
        }

    const cardContents = () => {
        const {questionFaceUp, currentIndex, nbrQuestions} = this.state;
        const ticker = `${currentIndex + 1}/${nbrQuestions}`;
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
        const disableForward = currentIndex + 1 === nbrQuestions
        const disableBackward = currentIndex === 0
        return (
            <View style = {styles.MainContainer}>
                <Text style={styles.TickerContainer}>{ticker}</Text>
                <View style = {styles.TopButtonContainer}>
                    <View style = {{alignItems: "flex-end"}}>
                    {!disableBackward && <Icon.Button
                        style={styles.backForwardBtnContainer}
                        onPress={() => previousCard(deck)}
                    >
                        Previous Question
                    </Icon.Button>}
                    </View>
                    <View style = {{alignItems: "flex-start"}}>
                        {!disableForward && <Icon.Button
                            style={styles.backForwardBtnContainer}
                            onPress={() => nextCard(deck)}
                        >
                            Next Question
                        </Icon.Button>}
                        {disableForward && <Icon.Button
                            style={styles.backForwardBtnContainer}
                            onPress={() => handleViewResults()}
                        >
                            View results
                        </Icon.Button>}
                    </View>
            </View>
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
                        onPress={() => navigation.navigate('TestScreen')}
                    >
                        Correct
                    </Icon.Button>
                    <Icon.Button
                        style={styles.incorrectBtnContainer}
                        onPress={() => navigation.navigate('TestScreen')}
                    >
                        Incorrect
                    </Icon.Button>
                </View>
                <View style={styles.BottomMargin}></View>
            </View>
        )
    }

    return (
        <View style = {styles.MainContainer}>
            {cardContents()}
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
        justifyContent: 'space-around',
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
