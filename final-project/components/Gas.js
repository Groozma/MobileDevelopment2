import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const CATEGORY_POLICE = 0x0001;
const CATEGORY_CAR    = 0x0002;
const CATEGORY_WALL   = 0x0004;
const Gas = (props) => {
    const width = props.body.bounds.max.x - props.body.bounds.min.x;
    const height = props.body.bounds.max.y - props.body.bounds.min.y;

    const xPos = props.body.position.x - width / 2;
    const yPos = props.body.position.y - height / 2;


    return (
        <View
        style={{
            position: "absolute",
            left: xPos,
            top: yPos,
            width: width,
            height: height,
            backgroundColor: props.color,
        }}
        >
        <Image
            source={require('../assets/gas-can.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
        />
        </View>

  );
};

export default (world, color, pos, size) => {
  const gas = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Gas",
      collisionFilter: {
        category: CATEGORY_CAR,
        mask: CATEGORY_POLICE | CATEGORY_CAR
    }, 
    },
  );
  Matter.World.add(world, gas);
  return { body: gas, color, pos, size, renderer: <Gas /> };
};
