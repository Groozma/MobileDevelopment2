import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const CATEGORY_POLICE = 0x0001;
const CATEGORY_CAR    = 0x0002;
const CATEGORY_WALL   = 0x0004;
const Truck = (props) => {
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
            source={require('../assets/Mini_truck.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
        />
        </View>

  );
};

export default (world, color, pos, size) => {
  const truck = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Truck",
      collisionFilter: {
        category: CATEGORY_CAR,
        mask: CATEGORY_POLICE | CATEGORY_CAR
    }, 

    },
  );
  Matter.World.add(world, truck);
  return { body: truck, color, pos, size, renderer: <Truck /> };
};
