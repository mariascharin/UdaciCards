import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {purple, white} from "./utils/colors";
import TestScreen from "./components/TestScreen";
import HomeScreen from "./components/HomeScreen";
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import IndividualDeck from './components/IndividualDeck';
import NewQuestion from './components/NewQuestion';
import ResultsCard from './components/ResultsCard';
import Quiz from './components/Quiz';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TestScreen" component={TestScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DeckList" component={DeckList} />
            <Stack.Screen name="NewDeck" component={NewDeck} />
            <Stack.Screen name="IndividualDeck" component={IndividualDeck} />
            <Stack.Screen name="NewQuestion" component={NewQuestion} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="ResultsCard" component={ResultsCard} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        // Set content's vertical alignment.
        justifyContent: 'center',
        // Set content's horizontal alignment.
        alignItems: 'center',
        // Set hex color code here.
        backgroundColor: '#ffc93c',
    },
    btnContainer: {
        // justifyContent: 'flex-end',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
        padding: 20,
        color: "orange",
        fontSize: 70
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        marginBottom: 30
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 30,
        marginLeft: 30
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
    }
});
