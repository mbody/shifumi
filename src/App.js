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
import { OPTIONS } from "./helpers/GameHelper";
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
              {this.renderOptionSelect()}
              {/* TODO 7 : si playerChoice n'est pas nul, alors afficher renderResult plutôt que renderOptionSelect */}
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
   * TODO 1 : appeler le handler onOptionPress quand l'utilisateur clique sur une option
   */
  renderOption = (option, index) => {
    return (
      <OptionButton
        option={option}
        key={"option" + index}
        style={{ backgroundColor: Colors.playerColor }}
        onPress={() => console.log("Clic sur " + option.id)}
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
    let { playerScore, computerScore, message, playerChoice } = this.state;

    // TODO 8 : si playerChoice est déjà défini, réinitialiser les choix

    // TODO 2 : générer un choix de l'ordinateur en utilisant GameHelper.generateComputerChoice();
    // TODO 3 : obtenir le résultat de la partie en utilisant GameHelper.calculateWhoWins(...);
    // TODO 4 : selon le résultat (à comparer avec RESULT.playerWon, RESULT.playerLost) modifier les scores;
    // TODO 5 : Trouver le message de résultat avec GameHelper.getResultMessage(...);
    // TODO 6 : enregistrer les choix, le message et les scores dans le state du composant;
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
