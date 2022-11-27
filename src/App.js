import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import OptionButton from "./components/OptionButton";
import Score from "./components/Score";
import { GameHelper, OPTIONS, RESULT } from "./helpers/GameHelper";
import { Colors } from "./theme/Theme";

export default class App extends Component {
  //------------------------------------------------------------ LIFECYCLE

  constructor(props) {
    super(props);
    this.state = {
      computerScore: 0,
      playerScore: 0,
      message: "",
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
            <View style={{ flex: 1 }}>
              <View style={styles.section}>
                <Text style={[styles.message, { color: Colors.computerColor }]}>
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
              {/* TODO 7 : afficher le résultat du joueur en vous aidant de la méthode renderResult */}
              {this.renderResult(playerChoice)}
              {this.renderOptionSelect()}
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
    const { message, playerChoice } = this.state;
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
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "center",
          }}
        >
          {OPTIONS.map(this.renderOption)}
        </View>
      </View>
    );
  };

  /**
   * Affichage d'une option de jeu (pierre / feuille / ciseau)
   * TODO 1 : remplacer l'appel au handler actuel pour le handler onOptionPress quand l'utilisateur clique sur une option
   * Indice : regarder le composant OptionButton pour trouver la props qu'il utilise pour détecter le clic utilisateur !!
   */
  renderOption = (option, index) => {
    return (
      <OptionButton
        option={option}
        key={"option" + index}
        style={{ backgroundColor: Colors.playerColor }}
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
  onOptionPress = (playerChoice) => {
    console.log("Le joueur joue " + playerChoice.id);
    let { playerScore, computerScore, message } = this.state;

    // TODO 2 : générer un choix de l'ordinateur en utilisant GameHelper.generateComputerChoice() et placer le dans une constante computerChoice;
    const computerChoice = GameHelper.generateComputerChoice();
    // TODO 3 : obtenir le résultat de la partie en utilisant GameHelper.calculateWhoWins(...);
    const result = GameHelper.calculateWhoWins(playerChoice, computerChoice);
    // TODO 4 : selon le résultat (à comparer avec RESULT.playerWon, RESULT.playerLost) modifier les scores;
    if (result === RESULT.playerWon) {
      playerScore++;
    }
    if (result === RESULT.playerLost) {
      computerScore++;
    }
    // TODO 5 : Trouver le message de résultat avec GameHelper.getResultMessage(...);
    message = GameHelper.getResultMessage(result);
    // TODO 6 : enregistrer les choix, le message et les scores dans le state du composant;
    this.setState({
      playerScore,
      computerScore,
      message,
      playerChoice,
      computerChoice,
    });
  };

  //------------------------------------------------------------ PRIVATES
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
});
