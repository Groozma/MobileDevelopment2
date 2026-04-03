import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Dimensions, Image } from "react-native";
import Matter from "matter-js";
import createEntities from "./entities";
import Physics from "./Physics";
import React, { useEffect, useState, useRef } from "react";
import SpriteSheet from "rn-sprite-sheet";
import Constants from "./Constants";
// import Images from "./Images";
export default function App() {
  const gameEngineRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const entities = createEntities();

  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
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
              setScore(score+10); 
              break; 
            }
        }}
      >
        {<StatusBar style="auto" hidden={true} />}
      </GameEngine>
      <View style={styles.score}>
        <Text style={{ color: "white", fontSize: 25, textAlign: "center"}}>Score: {score}</Text>
      </View>
      {!running && !gameover && (
        <View>
          <Text style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: "white", fontSize: 25, textAlign: "center", paddingHorizontal: 20}}>Instructions: Avoid the other cars and obstacles, collect gas cans to speed up</Text>
          <TouchableOpacity onPress={() => {
            setRunning(true);
          }}>
            <Text style={{ color: "white", fontSize: 25, textAlign: "center"}}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {gameover && (
        <View>
          <Text style={{ color: "white", fontSize: 25, textAlign: "center" }}>
            GAME OVER
          </Text>
          <TouchableOpacity
            onPress={() => {
              setRunning(true);
              setGameover(false);
              setScore(0);
              gameEngineRef.current.swap(entities);
            }}
          >
            <Text
              style={{ color: "white", fontSize: 25, textAlign: "center" }}
            >
              Reset?
            </Text>
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

    backgroundColor: "#fff",
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
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
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
