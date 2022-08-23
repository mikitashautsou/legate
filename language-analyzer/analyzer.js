import fs from 'fs'

const text = fs.readFileSync('./text.txt').toString()


const normalized_text = text.replace(/[,.–?!]/g, '').replace(/\n/g, ' ')
const tokens = normalized_text.split(' ').map(t => t.trim().toLowerCase()).filter(t => t.length !== 0)


const tokensCount = new Map()

for (const token of tokens) {
    if (!tokensCount.has(token)) {
        tokensCount.set(token, 0)
    }
    tokensCount.set(token, tokensCount.get(token) + 1)
}

const tokensCountArray = Array.from(tokensCount.entries())
tokensCountArray.sort((a1, a2) => a2[1] - a1[1])

console.table(tokensCountArray.slice(50, 100))