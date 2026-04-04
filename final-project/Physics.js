import Matter, { Sleeping } from 'matter-js';
import Constants from './Constants';
import { useState } from 'react';

// let playerRef = null

// export const registerPlayer = (playerBody) => {
//   playerRef = playerBody
// }

// export const movePlayer = (direction) => {
//   if (!playerRef) {
//     console.log('error');
//     return
//   }
//   const speed = 5

//   switch (direction) {
//     case "left":
//       moveLeft(speed)
//       console.log(playerRef);
//       break
//     case "right":
//       moveRight(speed)
//       break
//   }
// }

// export const moveLeft = (speed) => {
//   Matter.Body.setVelocity(playerRef, { x: -speed, y: playerRef.velocity.y })
// }

// export const moveRight = (speed) => {
//   Matter.Body.setVelocity(playerRef, { x: speed, y: playerRef.velocity.y })
// }
let velocity = 1;
const Physics = (entities, { touches, time, events, dispatch }) => {
  let engine = entities.physics.engine;
  const police = entities.Police.body;
  const car = entities.Car.body;
  const truck = entities.Truck.body;
  const gas = entities.Gas.body;

  const randomPosition = () => {
    return Math.random() * ((Constants.WINDOW_WIDTH - 45) - 45) + 1;
  }

  if (car.position.y > Constants.WINDOW_HEIGHT) {
    dispatch({ type: "score" });
    Matter.Body.setPosition(car, {
      x: randomPosition(), y: 150 
    });
    Matter.Body.setVelocity(car, {x:0, y: velocity})
  }
  if (truck.position.y > Constants.WINDOW_HEIGHT) {
    dispatch({ type: "score" });
    Matter.Body.setPosition(truck, {
      x: randomPosition(), y: 150 
    });
    Matter.Body.setVelocity(truck, {x:0, y: velocity})
  }
  if (gas.position.y > Constants.WINDOW_HEIGHT) {
    Matter.Body.setPosition(gas, {
      x: randomPosition(), y: 150 
    });
    Matter.Body.setVelocity(gas, {x:0, y: velocity})
  }

  events.forEach(e => {
    if (e.type === "left") {
      // Matter.Body.setStatic(police, false);
      Matter.Body.setVelocity(police,{ x: -2, y: 0.05 });
    }
    else if (e.type === "right") {
      // Matter.Body.setStatic(police, false);
      Matter.Body.setVelocity(police, { x: 2, y: 0.05});
    }
  });
  // console.logr("Physics tick", entities.Police.body.position);

  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    const a = pairs[0].bodyA.label;
    const b = pairs[0].bodyB.label;

    if (
      (a === "Police" && b === "Car") ||
      (b === "Police" && a === "Car") ||
      (a === "Police" && b === "Truck") ||
      (b === "Police" && a === "Truck")
      ) {
        dispatch({ type: "gameover" });
    }
    if (
      (a === "Police" && b === "Gas") ||
      (b === "Police" && a === "Gas")
    ) {
      dispatch({ type: "score" });
      velocity += .005;
      Matter.Body.setPosition(gas, {
      x: randomPosition(), y: 150 
      });
      Matter.Body.setVelocity(gas, {x:0, y: velocity})
      };
  });
//   touches
//     .filter((t) => t.type === 'press')
//     .forEach((t) => {
//       if (monster.animOpitons.animType === 'walk' ) {
//         monster.direction = !monster.direction
//       }
//       entities.MonsterA.animOpitons.animType = 'walk'; // set the cycle to walk after pressing the screen.



//       // if (entities.MonsterA.animOpitons.animType === 'walk') {
//       //   Matter.Body.applyForce(
//       //     entities.MonsterA.body,
//       //     entities.MonsterA.body.position,
//       //     {
//       //       x: 0.001,
//       //       y: 0,
//       //     }
//       //   );
//       // }
//       //Sleeping.set(entities.MonsterA.body, true);
//     });
//   if(monster.animOpitons.animType === 'walk' && monster.direction !== null) {
//       Matter.Body.setVelocity(entities.MonsterA.body, {
//         x: 0.4 * monster.direction ? 1 : -1,
//         y: 0,//0.05,
//       });
//   }

//   const collisionStart = (event) => {
//     var pairs = event.pairs;
//     //objDel = pairs[0].bodyB;
//     var objA = pairs[0].bodyA.label;
//     var objB = pairs[0].bodyB.label;
//     if (
//       (objA == 'Candle' && objB == 'Monster') ||
//       (objA === 'Monster' && objB === 'Candle')
//     ) {
//       entities.MonsterA.animOpitons.animType = 'die';

//       Sleeping.set(entities.MonsterA.body, true);

//       setTimeout(() => {
//         Matter.Composite.remove(engine.world, entities.MonsterA.body);
//         entities.MonsterA.animOpitons.visibility = 'none';
//         dispatch({type:'gameover'})
//       }, 1000);
//     }
//     else if (
//       ((objA == 'FloatA' || objA == 'FloatB') && objB == 'Monster') ||
//       (objA === 'Monster' && (objA == 'FloatA' || objA == 'FloatB'))
//     ) {
//       let float = (objA == 'FloatA' || objA == 'FloatB') ? pairs[0].bodyA : pairs[0].bodyB
//       Matter.Body.setStatic(float, false)
//       // Matter.Body.setMass(float, 1)
//       Matter.Body.setVelocity(float, {x:0, y:-20})
//     } else if (
//       (objA == 'FloatA' && objB == 'TopEdge') ||
//       (objA === 'TopEdge' && objB === 'FloatA')
//     ) {
//       let float = objA === 'FloatA' ? pairs[0].bodyA : pairs[0].bodyB
//       Matter.Composite.remove(engine.world, float);
//       entities.Square.visible = false
//     }
//     else if (
//       (objA == 'FloatB' && objB == 'TopEdge') ||
//       (objA === 'TopEdge' && objB === 'FloatB')
//     ) {
//       let float = objA === 'FloatB' ? pairs[0].bodyA : pairs[0].bodyB
//       Matter.Composite.remove(engine.world, float);
//       entities.CandleRight2.visible = false
//     }
//   }

//   Matter.Events.on(engine, 'collisionStart', collisionStart);
  Matter.Engine.update(engine, time.delta);
//   Matter.Events.off(engine, 'collisionStart', collisionStart);

  return entities;
};

export default Physics;
