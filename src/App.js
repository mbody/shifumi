/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from './theme/Theme';
import OptionButton from './components/OptionButton';
import {GameHelper, OPTIONS, RESULT} from './helpers/GameHelper';
import Score from './components/Score';

type Props = {};
export default class App extends Component<Props> {
  //------------------------------------------------------------ LIFECYCLE

  constructor(props) {
    super(props);
    this.state = {
      computerScore: 0,
      playerScore: 0,
      message: '',
    };
  }

  //------------------------------------------------------------ RENDERERS

  render() {
    const {
      computerScore,
      playerScore,
      computerChoice,
      message,
      playerChoice,
    } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback style={styles.container}>
            <View style={{flex: 1}}>
              <View style={styles.section}>
                <Text style={[styles.message, {color: Colors.computerColor}]}>
                  Ordinateur
                </Text>
                <OptionButton
                  option={computerChoice}
                  style={{
                    backgroundColor: Colors.computerColor,
                  }}
                />
              </View>
              <Score computerScore={computerScore} playerScore={playerScore} />
              {playerChoice ? this.renderResult() : this.renderOptionSelect()}
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </>
    );
  }

  /**
   * Affiche le résultat d'une partie à partir des données du state.
   */
  renderResult = () => {
    const {message, playerChoice} = this.state;
    return (
      <View style={styles.section}>
        <Text style={styles.message}>{message}</Text>
        {this.renderOption(playerChoice, -1, true)}
      </View>
    );
  };

  /**
   * Affiche les trois options pour que le joueur puisse faire son choix
   */
  renderOptionSelect = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.message}>Que choisissez-vous ?</Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
          }}>
          {OPTIONS.map(this.renderOption)}
        </View>
      </View>
    );
  };

  /**
   * Affichage d'une option de jeu (pierre / feuille / ciseau)
   */
  renderOption = (option, index) => {
    return (
      <OptionButton
        option={option}
        key={'option' + index}
        style={{backgroundColor: Colors.playerColor}}
        onPress={() => this.onOptionPress(option)}
      />
    );
  };

  //------------------------------------------------------------ HANDLERS

  /**
   * Lorsque l'utilisateur appuye sur un bouton d'option,
   * soit la partie est réinitialisée
   * soit la partie démarre...
   *
   * @param option
   */
  onOptionPress = (option) => {
    let {playerScore, computerScore, message, playerChoice} = this.state;

    if (playerChoice) {
      // reset game
      this.setState({computerChoice: null, message: null, playerChoice: null});
      return;
    } else {
      // play new game
      const computerChoice = GameHelper.generateComputerChoice();
      const result = GameHelper.calculateWhoWins(option, computerChoice);
      if (result == RESULT.playerWon) {
        playerScore++;
      } else if (result == RESULT.playerLost) {
        computerScore++;
      }
      message = GameHelper.getResultMessage(result);

      this.setState({
        playerScore,
        computerScore,
        computerChoice,
        playerChoice: option,
        message,
      });
    }
  };

  //------------------------------------------------------------ PRIVATES

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});
