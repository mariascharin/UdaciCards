import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import IndividualDeck from './components/IndividualDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';


const Stack = createStackNavigator();

function MyStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="DeckList" component={DeckList} />
            <Stack.Screen name="NewDeck" component={NewDeck} />
            <Stack.Screen name="IndividualDeck" component={IndividualDeck} />
            <Stack.Screen name="NewQuestion" component={NewQuestion} />
            <Stack.Screen name="Quiz" component={Quiz} />
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
