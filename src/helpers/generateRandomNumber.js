function generateRandomNumber(min, max) {


    const random = Math.random();
    const range = max - min;
    const randomRange = random * range;
    const randomNum = randomRange + min;


    return Math.floor(randomNum);
}

module.exports = generateRandomNumber;