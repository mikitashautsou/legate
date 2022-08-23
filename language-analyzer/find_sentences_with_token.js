
const TOKEN = 'jem'
const SENTENCES_AMOUNT = 10


import fs from 'fs'
import chalk from 'chalk'
const STOP_SYMBOLS = ['.', '!', '?',]
const text = fs.readFileSync('./text.txt').toString()

let startIndex = 0
let printedExamplesCount = 0
while (printedExamplesCount < SENTENCES_AMOUNT) {
    const tokenIndex = text.indexOf(TOKEN, startIndex + 1)
    startIndex = tokenIndex
    // if (!STOP_SYMBOLS.concat(' ').includes(text[tokenIndex - 1]) || !STOP_SYMBOLS.concat(' ').includes(text[tokenIndex + TOKEN.length + 1])) {
    //     continue
    // }
    printedExamplesCount++

    let sentenceStart = tokenIndex;
    let sentenceEnd = tokenIndex;
    while (true) {
        if (STOP_SYMBOLS.includes(text[sentenceStart])) {
            sentenceStart += 2
            break;
        }
        sentenceStart--
    }
    while (true) {
        if (STOP_SYMBOLS.includes(text[sentenceEnd])) {
            sentenceEnd++
            break;
        }
        sentenceEnd++
    }
    console.log(`${printedExamplesCount}.` + text.slice(sentenceStart, tokenIndex) + chalk.bold.red(text.slice(tokenIndex, tokenIndex + TOKEN.length)) + text.slice(tokenIndex + TOKEN.length, sentenceEnd))
}