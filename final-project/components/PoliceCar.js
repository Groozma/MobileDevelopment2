import Matter from "matter-js";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions, View, TouchableWithoutFeedback } from "react-native";
import SpriteSheet from "rn-sprite-sheet";
const Police = (props) => {
  let police = useRef(null);

  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  useEffect(() => {
    police.current.stop();
    police.current.play({
      type: props.animOpitons.animType ?? "lights",
      fps: 24,
      loop: true,
    });
  }, [props.animOpitons.animType]);

  let initiateObj = () => {
    // console.log(police.current);
    for (let [key, value] of Object.entries(police.current)) {
      // console.log(key, value);
    }
    let policeI = police.current;
    // police.current.play({
    //   type: 'appear',
    // });
  };

  return (
    <View
      style={{
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        display: props.animOpitons.visibility,
        //backgroundColor: props.color,
      }}
    >
      <SpriteSheet
        ref={police}
        source={require("../assets/police-spritesheet.png")}
        columns={2}
        rows={2}
        height={height}
        onLoad={() => initiateObj()} //start action on loading the spritesheet; uncomment this if you want a default animation
        imageStyle={{ marginTop: 0 }}
        animations={{
          lights: [0, 1, 2],
        }}
      />
    </View>
  );
};
const CATEGORY_POLICE = 0x0001;
const CATEGORY_CAR = 0x0002;
const CATEGORY_WALL = 0x0004;

export default (world, color, pos, size, extraOptions, animOpitons) => {
  const thePolice = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label ?? "Police",
      restitution: extraOptions.restitution ?? 0,
      frictionAir: extraOptions.frictionAir ?? 0.1,
      density: 0.001,
      inertia: 1,
      mass: 1,
      collisionFilter: {
        category: CATEGORY_POLICE,
        mask: CATEGORY_POLICE | CATEGORY_CAR | CATEGORY_WALL,
      },
    },
  );
  Matter.World.add(world, thePolice);
  return {
    body: thePolice,
    color,
    pos,
    size,
    direction: false,
    extraOptions,
    animOpitons,
    renderer: <Police />,
  };
};
