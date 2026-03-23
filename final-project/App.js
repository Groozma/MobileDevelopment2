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
import entities from "./entities";
import Physics from "./Physics";
import React, { useEffect, useState, useRef } from "react";
import SpriteSheet from "rn-sprite-sheet";
import Constants from "./Constants";
// import Images from "./Images";
export default function App() {
  const gameengine = useRef(null);
  const [running, setRunning] = useState(false);
  const [gameover, setGameover] = useState(false);
  useEffect(() => {
    setRunning(true);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={gameengine}
        systems={[Physics]}
        entities={entities()}
        running={running}
        style={styles.gameContainer}
        onEvent={(e) => {
          console.log(e);
          if (e.type === "gameover") {
            setRunning(false);
            setGameover(true);
          }
        }}
      >
        {<StatusBar style="auto" hidden={true} />}
      </GameEngine>
      {/* <Text
        style={{
          color: "white",
          position: "absolute",
        }}
      >
        Priyank
      </Text> */}
      {gameover && (
        <View>
          <Text style={{ color: "white", fontSize: "25", textAlign: "center" }}>
            GAME OVER
          </Text>
          <TouchableOpacity
            onPress={() => {
              setRunning(true);
              setGameover(false);
              gameengine.current.swap(entities());
            }}
          >
            <Text
              style={{ color: "white", fontSize: "25", textAlign: "center" }}
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
            onPress={() => Physics.movePlayer("left")}
          >
            <Text style={styles.text}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => Physics.movePlayer("right")}
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
