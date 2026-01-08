const { rollDice } = require('./dice');
// const { rollMultipleDice } = require('./dice');

function skillCheck(skillName, modifier, difficultyClass) {
    console.log(`Skill Check: ${skillName}`);
    console.log(`ความยาก (DC): ${difficultyClass}`);

    console.log(`ตัวปรับแต่ง: ${modifier >= 0 ? '+' : ''}${modifier}`);

    const roll = rollDice(20);
    const total = roll + modifier;

    console.log(`ผลการทอยลูกเต๋า D20: ${roll}`);
    console.log(`ผลรวมหลังบวกตัวปรับแต่ง: ${total}`);

    if (total >= difficultyClass) {
        console.log(`ผลลัพธ์: สำเร็จ!`);
    } else {
        console.log(`ผลลัพธ์: ล้มเหลว!`);
    }

    return {
        skill: skillName,
        dc: difficultyClass,
        modifier: modifier,
        roll: roll,
        total: total,
        success: total >= difficultyClass
    };
}
module.exports = { skillCheck };