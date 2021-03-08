const getRandomInt = (minInput, maxInput) => {
  const min = Math.ceil(minInput);
  const max = Math.floor(maxInput);
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomPrimeNumber = () => {
  const number = 2;
  const min = getRandomInt(number, number * 100);
  const max = getRandomInt(number * 1000, number * 10000);

  for (let i = min; i < max; i++) {
    let isPrimeNumber = true;
    for (let j = 2; j < max; j++) {
      if (i % j === 0 && j != i) {
        isPrimeNumber = false;
      }
    }
    if (isPrimeNumber)
      return i;
  }
}

const getCoprimeIntegersNumber = (fiN) => {
  while (true) {
    const randomPrimeNumber = getRandomPrimeNumber();
    if (randomPrimeNumber > 1 && randomPrimeNumber < fiN && fiN % randomPrimeNumber !== 0)
      return randomPrimeNumber;
  }
}

const getD = (e, fiN) => {
  for (let d = getRandomInt(10, 1000); d < Infinity; d++) {
    if ((e * d) % fiN === 1)
      return d;
  }
}

const stringToCharcodesArray = text => {
  return text.split('').map(char => BigInt(char.charCodeAt(0)));
}

const encryptMessage = (message, e, n) => {
  return message.map(charCode => (BigInt(charCode) ** BigInt(e)) % BigInt(n));
}

const decryptMessage = (message, d, n) => {
  return message.map(charCode => (BigInt(charCode) ** BigInt(d)) % BigInt(n));
}

export { getRandomPrimeNumber, getCoprimeIntegersNumber, getD, stringToCharcodesArray, encryptMessage, decryptMessage }
