export function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollMultipleDice(numberOfDice, sides) {
  let Dice_Results = [];
  let Dice_Total = 0;

  for (let i = 0; i < numberOfDice; i++) {
    let result = rollDice(sides);
    Dice_Results.push(result);
    Dice_Total += result;
  }

  return {
    dice: `${numberOfDice}D${sides}`,
    results: Dice_Results,
    total: Dice_Total,
  };
}
