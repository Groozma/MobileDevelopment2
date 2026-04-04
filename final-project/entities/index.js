import Matter from "matter-js";
import { Dimensions } from "react-native";
import Police from "../components/PoliceCar";
import Car from "../components/Car";
import Truck from "../components/Truck";
import Gas from "../components/Gas";
import Constants from "../Constants";

import BoundaryLeft from "../components/BoundaryTop";
import BoundaryTop from "../components/BoundaryRight";
import BoundaryRight from "../components/BoundaryLeft";
import BoundaryBottom from "../components/BoundaryBottom";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.2;

  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;

  return {
    physics: { engine, world },
    Police: Police(
      world,
      "clear",
      { x: 150, y: screenHeight - 200 },
      { height: 100, width: 100 },
      { label: "Police", restitution: 0, frictionAir: 0 },
      { animType: "lights" },
    ),

    Car: Car(
      world,
      "clear",
      { x: Constants.WINDOW_WIDTH / 4, y: 200 },
      { height: 110, width: 50 },
    ),
    Gas: Gas(
      world,
      "clear",
      { x: Constants.WINDOW_WIDTH / 2, y: 150 },
      { height: 58, width: 58 },
    ),
    Truck: Truck(
      world,
      "clear",
      { x: Constants.WINDOW_WIDTH / 2 + 100, y: 100 },
      { height: 102, width: 54 },
    ),
    TopBoundary: BoundaryTop(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      { height: 200, width: Constants.WINDOW_WIDTH },
    ),

    BottomBoundary: BoundaryBottom(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 300, width: Constants.WINDOW_WIDTH },
    ),

    LeftBoundary: BoundaryLeft(
      world,
      "green",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 45 },
    ),

    RightBoundary: BoundaryRight(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 45 },
    ),
  };
};
