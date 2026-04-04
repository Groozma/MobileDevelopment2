import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import React, { useEffect, useState, useRef } from "react";
import createEntities from "./entities";
import Physics from "./Physics";
import Constants from "./Constants";

export default function App() {
  const gameEngineRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);

  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);

  const entities = createEntities();

  useEffect(() => {
    setRunning(false);

    // Hide splash after 7 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />

      {/* Splash Screen */}
      {showSplash && (
        <View style={styles.splashContainer}>
          <Text style={styles.splashTitle}>Cop For A Day</Text>

          <Text style={styles.splashCreators}>
            Game developed by
            {"\n"}
            Adhip Bashar & Ryan Maguire
          </Text>

          <Text style={styles.splashInstructions}>
            Instructions:{"\n"}
            Avoid traffic and obstacles.{"\n"}
            Collect gas cans to boost speed.{"\n"}
            Avoid collusion with traffic.
          </Text>
        </View>
      )}

      {/* Game Engine */}
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        entities={entities}
        running={running}
        style={styles.gameContainer}
        onEvent={(e) => {
          switch (e.type) {
            case "gameover":
              setRunning(false);
              setGameover(true);
              break;
            case "score":
              setScore(score + 10);
              break;
          }
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {/* Score */}
      <View style={styles.score}>
        <Text style={{ color: "white", fontSize: 25 }}>Score: {score}</Text>
      </View>

      {/* Start Screen (after splash disappears) */}
      {!running && !gameover && !showSplash && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.instructions}>
            Instructions: Avoid the other cars and obstacles, collect gas cans
            to speed up
          </Text>

          <TouchableOpacity onPress={() => setRunning(true)}>
            <Text style={styles.startButtonText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Game Over Screen */}
      {gameover && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.gameOverText}>GAME OVER</Text>

          <TouchableOpacity
            onPress={() => {
              setRunning(true);
              setGameover(false);
              setScore(0);
              gameEngineRef.current.swap(entities);
            }}
          >
            <Text style={styles.startButtonText}>Reset?</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => gameEngineRef.current.dispatch({ type: "left" })}
          >
            <Text style={styles.text}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => gameEngineRef.current.dispatch({ type: "right" })}
          >
            <Text style={styles.text}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  gameContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
  },

  score: {
    position: "absolute",
    top: 10,
    left: 10,
  },

  /* Splash Screen */
  splashContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 999,
  },

  splashTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 200,
    textAlign: "center",
  },

  splashCreators: {
    fontSize: 20,
    color: "white",
    marginBottom: 180,
    textAlign: "center",
    lineHeight: 24,
  },

  splashInstructions: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    lineHeight: 28,
  },

  /* Start & Game Over Screens */
  welcomeContainer: {
    position: "absolute",
    top: "35%",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  instructions: {
    backgroundColor: "black",
    color: "white",
    fontSize: 22,
    textAlign: "center",
    padding: 15,
    marginBottom: 20,
  },

  startButtonText: {
    backgroundColor: "green",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },

  gameOverText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  /* Controls */
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },

  text: {
    color: "white",
    fontSize: 24,
  },
});
