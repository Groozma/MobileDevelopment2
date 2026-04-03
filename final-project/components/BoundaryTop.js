import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const CATEGORY_POLICE = 0x0001;
const CATEGORY_CAR    = 0x0002;
const CATEGORY_WALL   = 0x0004;

const BoundaryTop = (props) => {
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
    />
  );
};

export default (world, color, pos, size) => {
  const boundary = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "BoundaryTop",
      isStatic: true,
      collisionFilter: {
        category: CATEGORY_WALL,
        mask: CATEGORY_POLICE
      },
    },
  );
  Matter.World.add(world, boundary);
  return { body: boundary, color, pos, size, renderer: <BoundaryTop /> };
};
