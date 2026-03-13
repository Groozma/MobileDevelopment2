import Matter from "matter-js";
import { Dimensions } from "react-native";
import Police from "../components/PoliceCar";
import Constants from "../Constants";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.4;

  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height - 200;

  return {
    physics: { engine, world },
    PoliceCarA: Police(
      world,
      "clear",
      { x: 150, y: screenHeight - 115 },
      { height: 100, width: 100 },
      { label: "Police", restitution: 0, frictionAir: 0 },
      { animType: "lights" }
    ),
    
  };
};