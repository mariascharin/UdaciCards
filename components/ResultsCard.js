import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors';

function ResultsCard({ route, navigation }) {
    const { result } = route.params;
    const percent = 100 * result.correctAnswers/(result.correctAnswers + result.incorrectAnswers + result.unanswered)
    return (
        <View style = {styles.MainContainer}>
            <View style={{flex: 2, justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 50, color: "orange"}}>Result</Text>
                <Text style={{fontSize: 50, color: "orange"}}>{`${percent} %`}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <Text style={{ color: white }}>Correct: {result.correctAnswers}</Text>
                <Text style={{ color: white }}>Incorrect: {result.incorrectAnswers}</Text>
                <Text style={{ color: white }}>Unanswered: {result.unanswered}</Text>
            </View>
            <View style={{flex: 2, justifyContent: 'flex-start' }}>
            <Icon.Button style={styles.btnContainer}
                         backgroundColor="orange"
                         onPress={() => navigation.navigate('TestScreen')}>
                Back to Start Screen
            </Icon.Button>
            </View>
        </View>
    );
}

export default ResultsCard;

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
