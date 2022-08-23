
const fs = require('fs')
const { exit } = require('process')
const { solve, inRange } = require('yalps')
const { read_products } = require('./convert_to_flat_json')
const MIN_MAX_VALUES = {
    // 'Cryptoxanthin, beta',
    // 'Lycopene',
    // 'Tocopherol, delta',
    // 'Tocotrienol, gamma',
    // 'Tocotrienol, delta',
    'Vitamin C, total ascorbic acid': {
        min: 90,
        max: 1500,
    },
    'Thiamin': {
        min: 1.2,
        max: 40,
    },
    'Riboflavin': {
        min: 1.3,
        max: 400,
    },
    'Folate, total': {
        min: 400,
        max: 1000,
    },
    // 'Vitamin K (Dihydrophylloquinone)',
    'Vitamin K (phylloquinone)': {
        min: 70,
    },
    // 'Fatty acids, total trans', <------------ target
    // 'Fatty acids, total saturated': {
    //     min: 0,
    //     max: 27
    // },
    // 'SFA 8:0',
    // 'SFA 12:0',
    // 'SFA 14:0',
    // 'PUFA 22:6 n-3 (DHA)',
    // 'SFA 22:0',
    // 'PUFA 20:5 n-3 (EPA)',
    // 'PUFA 22:5 n-3 (DPA)',
    // 'SFA 17:0',
    // 'SFA 24:0',
    // 'TFA 16:1 t',
    // 'MUFA 24:1 c',
    // 'MUFA 18:1 c',
    // 'PUFA 18:2 n-6 c,c',
    // 'MUFA 22:1 c',
    // 'MUFA 17:1',
    // 'Fatty acids, total trans-monoenoic',
    // 'MUFA 15:1',
    // 'PUFA 18:3 n-3 c,c,c (ALA)',
    // 'PUFA 20:3 n-3',
    // 'PUFA 22:4',
    // 'Protein',
    // 'Ash',
    // 'Starch',
    // 'Fructose',
    // 'Lactose',
    'Energy': {
        min: 2000,
        max: 3000
    },
    // 'Galactose',
    'Fiber, total dietary': {
        min: 30,
        // max: 70
    },
    // 'Iron, Fe': {
    //     min: 0.2,//TODO: should be 8mg
    //     // max: 40,
    // },
    // 'Magnesium, Mg': {
    //     min: 0 //TOD: target is 300,
    //     // max:  TODO: ?
    // },
    // 'Phosphorus, P',
    'Sodium, Na': {
        min: 0,
        max: 2000,
    },
    // 'Copper, Cu',
    // 'Manganese, Mn',
    'Vitamin A, RAE': {
        min: 900,
        max: 2500,
    },
    // 'Carotene, beta',
    // 'Carotene, alpha',
    // 'PUFA 20:4',
    // 'PUFA 18:4',
    // 'Fatty acids, total monounsaturated',
    // 'Fatty acids, total polyunsaturated',
    // 'SFA 15:0',
    // 'TFA 18:1 t',
    // 'TFA 22:1 t',
    // 'TFA 18:2 t not further defined',
    // 'PUFA 18:2 CLAs',
    // 'PUFA 20:2 n-6 c,c',
    // 'MUFA 16:1 c',
    // 'PUFA 18:3 n-6 c,c,c',
    // 'Fatty acids, total trans-polyenoic',
    // 'PUFA 20:4 n-6',
    // 'SFA 4:0',
    // 'SFA 6:0',
    // 'SFA 10:0',
    // 'SFA 16:0',
    // 'SFA 18:0',
    // 'SFA 20:0',
    // 'Lutein + zeaxanthin',
    // 'Tocopherol, beta',
    // 'Tocopherol, gamma',
    // 'Tocotrienol, alpha',
    // 'Tocotrienol, beta',
    'Niacin': {
        min: 15,
        max: 1500,
    },
    'Pantothenic acid': {
        min: 5,
        max: 5_000,
    },
    'Vitamin B-6': {
        min: 1.7,
        max: 100

    },

    // 'Vitamin K (Menaquinone-4)',
    'Total lipid (fat)': {
        min: 15,
        max: 30
    },
    // 'Carbohydrate, by difference',
    // 'Sucrose',
    // 'Glucose',
    // 'Maltose',
    // 'Water',
    // 'Calcium, Ca',
    // 'Potassium, K',
    'Zinc, Zn': {
        min: 11,
        max: 40,
    },
    // 'Selenium, Se',
    'Vitamin E (alpha-tocopherol)': {
        min: 16,
        max: 1000,
    },
    // 'Nitrogen',
    // 'MUFA 14:1 c',
    // 'MUFA 20:1 c',
    // 'MUFA 22:1 n-9',
    // 'PUFA 22:2',
    // 'SFA 11:0',
    // 'TFA 18:3 t',
    // 'PUFA 20:3 n-9',
    // 'Choline, total',
    // 'Choline, from glycerophosphocholine',
    // 'Betaine',
    // 'Choline, from sphingomyelin',
    // 'Choline, free',
    // 'Choline, from phosphotidyl choline',
    // 'Choline, from phosphocholine',
    // 'Sugars, Total NLEA',
    // 'Carbohydrate, by summation',
    // 'Fatty acids, total trans-dienoic',
    // 'MUFA 17:1 c',
    // 'PUFA 18:2 c',
    // 'PUFA 18:3 c',
    // 'PUFA 20:3 c',
    // 'PUFA 20:4c',
    // 'PUFA 20:5c',
    // 'PUFA 22:5 c',
    // 'PUFA 22:6 c',
    // 'PUFA 20:2 c',
    // 'Total fat (NLEA)',
    // 'Cryptoxanthin, alpha',
    // 'trans-beta-Carotene',
    // 'cis-beta-Carotene',
    // 'cis-Lutein/Zeaxanthin',
    // 'cis-Lycopene',
    // 'Lutein',
    // 'Zeaxanthin',
    'Vitamin B-12': {
        min: 6,
        max: 500
    },
    // 'Retinol',
    // 'Vitamin D2 (ergocalciferol)',
    // 'Vitamin D3 (cholecalciferol)',
    // 'Vitamin D (D2 + D3)',
    'Vitamin D (D2 + D3), International Units': {
        min: 600,
        max: 3500,
    },
    'Cholesterol': {
        min: 0,
        max: 300,
    },
    // '25-hydroxycholecalciferol',
    // 'Iodine, I',
    // 'MUFA 20:1',
    // 'PUFA 18:3i',
    // 'Specific Gravity',
    // 'Tryptophan',
    // 'Threonine',
    // 'Methionine',
    // 'Phenylalanine',
    // 'Tyrosine',
    // 'Alanine',
    // 'Glutamic acid',
    // 'Glycine',
    // 'Proline',
    // 'Isoleucine',
    // 'Leucine',
    // 'Lysine',
    // 'Cystine',
    // 'Valine',
    // 'Arginine',
    // 'Histidine',
    // 'Aspartic acid',
    // 'Serine',
    // 'Fiber, insoluble',
    // 'Fiber, soluble',
    // 'Hydroxyproline',
    // 'MUFA 22:1',
    // 'MUFA 18:1',
    // 'PUFA 18:2',
    // 'PUFA 18:3',
    // 'SFA 5:0',
    // 'SFA 7:0',
    // 'SFA 9:0',
    // 'MUFA 12:1',
    // 'TFA 14:1 t',
    // 'TFA 20:1 t',
    // 'SFA 21:0',
    // 'MUFA 22:1 n-11',
    // 'SFA 23:0',
    // 'PUFA 22:3',
    // 'Cysteine',
    // '10-Formyl folic acid (10HCOFA)',
    // '5-Formyltetrahydrofolic acid (5-HCOH4',
    // '5-methyl tetrahydrofolate (5-MTHF)',
    // 'Phytofluene',
    // 'Phytoene',
    // 'trans-Lycopene',
    // 'Boron, B',
    // 'Cobalt, Co',
    // 'Molybdenum, Mo',
    // 'Nickel, Ni',
    // 'Sulfur, S',
    // 'PUFA 20:3',
    'Biotin': {
        min: 30,
        max: 10000,
    },
    // 'Beta-sitosterol',
    // 'Brassicasterol',
    // 'Campestanol',
    // 'Campesterol',
    // 'Delta-5-avenasterol',
    // 'Phytosterols, other',
    // 'Beta-sitostanol',
    // 'Stigmasterol',
    // 'Total dietary fiber (AOAC 2011.25)',
    // 'Citric acid',
    // 'Malic acid',
    'Sugars, total including NLEA': {
        min: 0,
        max: 62, // better to be 5%, current is 10% of 2.5k
    },
    // 'Energy (Atwater General Factors)',
    // 'Energy (Atwater Specific Factors)',
    // 'Delta-7-Stigmastenol',
    // 'Stigmastadiene',
    // 'TFA 18:2 t',
    // 'Ergosterol',
    // 'Ergothioneine',
    // 'Vitamin D4',
    // 'Ergosta-7-enol',
    // ' Ergosta-7,22-dienol',
    // ' Ergosta-5,7-dienol',
    // 'Daidzin',
    // 'Genistin',
    // 'Glycitin',
    // 'Verbascose',
    // 'Raffinose',
    // 'Stachyose',
    // 'Daidzein',
    // 'Genistein',
    // 'Carotene, gamma',
    // 'Oxalic acid',
    // 'Quinic acid',
    // 'Vitamin A',
    // 'Beta-glucan',
    // 'Low Molecular Weight Dietary Fiber (LMWDF)',
    // 'High Molecular Weight Dietary Fiber (HMWDF)',
    // 'Pyruvic acid'
}


const PRODUCTS = read_products()


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']

let i = 0
const generate_var_name = () => {
    let temp_i = i
    let var_name = ''
    while (temp_i > 0) {
        const alphabet_idx = Math.floor(temp_i % alphabet.length)
        temp_i = Math.floor(temp_i / alphabet.length)
        var_name = alphabet[alphabet_idx] + var_name

    }
    i++
    return var_name

}

const ALIASES_PRODUCT_NAMES = new Map()

for (const product of Object.keys(PRODUCTS)) {
    ALIASES_PRODUCT_NAMES.set(generate_var_name(), product)
}


const PRODUCT_NAMES_ALIASES = new Map(Array.from(ALIASES_PRODUCT_NAMES.entries()).map(([k, v]) => [v, k]))

const SimpleSimplex = require('simple-simplex');

const model = {
    objective: {
        // a: 70,
        // b: 210,
        // c: 140,
        ...(Object.fromEntries(Object.entries(PRODUCTS).map(([name, nutries]) => {
            return [PRODUCT_NAMES_ALIASES.get(name), nutries['Protein']]
        })))
    },
    constraints: [
        ...Object.entries(MIN_MAX_VALUES).reduce((constraints, [constrain_name, { min, max }]) => {
            const namedVector = {}
            for (const product of Object.entries(PRODUCTS)) {
                namedVector[PRODUCT_NAMES_ALIASES.get(product[0])] = product[1][constrain_name]
            }
            if (max != undefined) {
                constraints.push({
                    namedVector: structuredClone(namedVector),
                    constraint: '<=',
                    constant: max
                })
            }

            if (min != undefined) {
                constraints.push({
                    namedVector: structuredClone(namedVector),
                    constraint: '>=',
                    constant: min
                })

            }
            return constraints
        }, [])
        // {
        //     namedVector: { a: 1, b: 1, c: 1 },
        //     constraint: '<=',
        //     constant: 100,
        // },
        // {
        //     namedVector: { a: 5, b: 4, c: 4 },
        //     constraint: '<=',
        //     constant: 480,
        // },
        // {
        //     namedVector: { a: 40, b: 20, c: 30 },
        //     constraint: '<=',
        //     constant: 3200,
        // },
    ],
    isOptimal: true,
    optimizationType: 'max',
}
// initialize a solver
const solver = new SimpleSimplex(model);

// call the solve method with a method name
const result = solver.solve({
    methodName: 'simplex',
});

// see the solution and meta data
console.log({
    solution: result.solution,
    isOptimal: result.details.isOptimal,
});

// const model = {
//     "direction": "minimize",
//     "objective": "Fatty acids, total trans",
//     "constraints": {
//         ...(Object.fromEntries(Object.entries(MIN_MAX_VALUES).map(([key, value]) => [key, inRange(value.min, value.max)]))),
//         // "plane": { "max": 44 },
//         // "person": { "max": 512 },
//         // "cost": { "max": 300000 }
//     },
//     "variables": PRODUCTS,
// }
// const solution = solve(model)
// console.log(solution)