const LEARN = true;

const fs = require("fs");

let config;

try {
  config = JSON.parse(fs.readFileSync("config.json").toString());
} catch (e) {
  config = {
    keys: [],
  };
}

const SYMBOLS_STATS = config.keys.map((s) => ({
  symbol: s,
  success: 1,
  failure: 1,
}));

const isKeyEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const getRandomSymbol = () => {
  const SYMBOLS_SUCCESS_RATE = SYMBOLS_STATS.map((s) => ({
    symbol: s,
    failureRatio: s.failure / (s.failure + s.success),
  }));

  console.log(SYMBOLS_SUCCESS_RATE.map(ssr => `${ssr.symbol.symbol.sequence}: ${ssr.failureRatio}`).join('\n'))
  const totalFailures = SYMBOLS_SUCCESS_RATE.reduce(
    (a, c) => a + c.failureRatio,
    0
  );
  const random = Math.random() * totalFailures;

  let currentFailureLevel = 0;

  let targetSymbol;
  for (let symbol of SYMBOLS_SUCCESS_RATE) {
    currentFailureLevel += symbol.failureRatio;
    if (currentFailureLevel > random) {
      targetSymbol = symbol.symbol;
      break;
    }
  }

  return targetSymbol.symbol;
};

const readline = require("readline");

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

let target;
process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") {
    process.exit();
  }

  if (!LEARN) {
    if (config.keys.some((k) => JSON.stringify(k) === JSON.stringify(key))) {
      return;
    }
    config.keys.push(key);
    console.log("key sequence", key);
    fs.writeFileSync("config.json", JSON.stringify(config));
  }

  if (LEARN) {

    if (target) {
      if (isKeyEqual(target, key)) {
        SYMBOLS_STATS.find((s) => isKeyEqual(s.symbol, target)).success += 1;
        target = getRandomSymbol()
        console.log('OK')
      } else {
        SYMBOLS_STATS.find((s) => isKeyEqual(s.symbol, target)).failure += 1;
        console.log('WRONG, you typed: ', key)
        console.log('AGAIN')
      }
    } else {
      target = getRandomSymbol()
    }

    console.log(target);
  }
});

// var keypress = require("keypress");

// // make `process.stdin` begin emitting "keypress" events
// keypress(process.stdin);iii

// // listen for the "keypress" event
// process.stdin.on("keypress", function (ch, key) {
//   //   console.log('got "keypress"', key);
//   let target = "aaaaaaaaaa";
//   if (key && key.ctrl && key.name == "c") {
//     if (key.sequence === target[0]) {
//       target = target.slice(1);
//     }
//   }
//   process.stdin.pause();

//   while (target.length < 10) {
//     target += getRandomSymbol()
//   }
//   console.log(target)A
// });

// process.stdin.setRawMode(true);
// process.stdin.resume();
