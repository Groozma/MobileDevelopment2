import Matter, { Sleeping } from 'matter-js';

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
      const police = entities.MonsterA

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
