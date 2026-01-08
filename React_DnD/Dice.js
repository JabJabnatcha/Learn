function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollMultipleDice(numberOfDice, sides) {
    let Dice_Results = [];
    let Dice_Total = 0;

    console.log(`เริ่มทอยลูกเต๋า ${numberOfDice}D${sides}`);

    for (let i = 0; i < numberOfDice; i++) {
        let result = rollDice(sides);
        Dice_Results.push(result);
        Dice_Total += result;
        console.log(`ลูกเต๋าที่ ${i + 1} ทอยได้: ${result}`);
    }

    console.log(`ผลลัพธ์ทั้งหมด: ${Dice_Results.join(', ')}`);
    console.log(`ผลรวมของลูกเต๋าทั้งหมด: ${Dice_Total}`);

    return{
        dice: `${numberOfDice}D${sides}`,
        results: Dice_Results,
        total: Dice_Total
    };
}

module.exports = {
    rollDice,
    rollMultipleDice
};