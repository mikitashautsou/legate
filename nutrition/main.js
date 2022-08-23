
const fs = require('fs')
const { exit } = require('process')

const [namesRecord, ...valueRecords] = fs.readFileSync('./nutrition.csv').toString().split('\n')



const names = namesRecord.split(',').map(v => v.trim())
let products = []


for (const productRecord of valueRecords) {
    const product = {}
    const rawProductAttirubtes = productRecord.trim()
    let attributeIndex = 0
    let token = ''
    let stringIndex = 0
    let isInParenthsis = false
    while (stringIndex < rawProductAttirubtes.length) {
        const character = rawProductAttirubtes[stringIndex]
        if (character === '"') {
            isInParenthsis = !isInParenthsis
        } else if (character === ',' && !isInParenthsis) {
            product[names[attributeIndex++]] = token
            token = ''
        } else {
            token += character
        }
        stringIndex++
    }
    products.push(product)
}

// products = products.slice(0, 100)

const TARGET_VALUES = {
    calories: 2500,
    total_fat: 56, // fat calories = 9, 20% - 30% from all calories
    saturated_fat: 30, // minimize
    cholesterol: 200,//less that 2000
    sodium: 2000, //minimize
    choline: 500, //mg
    folate: 400,
    folic_acid: 400,
    niacin: 16,
    pantothenic_acid: 5,
    riboflavin: 1.3,
    thiamin: 1.2,
    vitamin_a: 3000,
    vitamin_a_rae: 900,
    carotene_alpha: 600,
    carotene_beta: 4000,
    // cryptoxanthin_beta: ?
    lutein_zeaxanthin: 12_000, // not more than 20 mg
    // lucopene: 15 ?, can't use this values, because dataset lacks of lucopene
    vitamin_b12: 2.4,
    vitamin_b6: 1.7,
    vitamin_c: 90,
    vitamin_d: 600,
    vitamin_e: 15,
    // // tocopherol_alpha: that same as vitamin e,
    vitamin_k: 120,
    calcium: 1000,
    copper: 1.4,
    irom: 8.7,
    magnesium: 400,
    manganese: 0, // normal 2.3 mg
    phosphorous: 4000,
    potassium: 3400,
    selenium: 55,
    zink: 11,
    protein: 56, //for 70kg,
    alaniene: 3,
    arginine: 18,
    aspartic_acid: 3,
    cystine: 0.246,
    // glutamic_acid: 
    // glycine
    histidine: 0.6,
    // hydroxyproline: 
    isoleucine: 1.2,
    leucine: 3.3,
    // lysine: 
    // // -----
    sugars: 24,
    fatty_acids_total_trans: 0,
    fat: 50,

}

const calculate_total_plan_values = (plan) => {

    const result_values = {}
    for (const item of plan) {
        for (const attribute in item) {
            if (result_values[attribute] === undefined) {
                result_values[attribute] = 0
            }
            result_values[attribute] += parseFloat(item[attribute]) || 0
        }
    }
    return result_values
}
const getPlanDiff = (plan_values) => {
    const diffs = {}
    for (const targetValueName in TARGET_VALUES) {
        diffs[targetValueName] = ((plan_values[targetValueName] || 0) / (TARGET_VALUES[targetValueName] * 7 + 1e-10))
    }
    return diffs
}
const calculatePlanFitness = (plan_values) => {


    let fitness = 0
    for (const targetValueName in TARGET_VALUES) {
        fitness += Math.abs((1 - ((plan_values[targetValueName] || 0) / (TARGET_VALUES[targetValueName] * 7 + 1e-10))))
    }
    return 1 / fitness
}

const find_plan = () => {


    let currentPlan = []
    let maxFitness = -Infinity
    let bestPlan = []

    while (true) {
        currentPlan.push(products[Math.floor(Math.random() * products.length)])
        const plan_totals = calculate_total_plan_values(currentPlan)
        if (plan_totals.calories >= 2500 * 7) {
            break;
        }
    }

    while (true) {


        const previousPlan = currentPlan.slice()

        for (let i = 0; i < 10; i++) {
            currentPlan[Math.floor(Math.random() * currentPlan.length)] = products[Math.floor(Math.random() * products.length)]
        }
        let plan_totals = calculate_total_plan_values(currentPlan)

        if (plan_totals.calories > 2500 * 7) {
            while (true) {
                if (plan_totals.calories > 2500 * 7) {
                    currentPlan.pop()
                    plan_totals = calculate_total_plan_values(currentPlan)
                } else {
                    break;
                }
            }
        } else {
            while (true) {
                if (plan_totals.calories < 2500 * 7) {
                    currentPlan.push(products[Math.floor(Math.random() * products.length)])
                    plan_totals = calculate_total_plan_values(currentPlan)
                } else {
                    break;
                }

            }
        }

        plan_totals = calculate_total_plan_values(currentPlan)

        const fitness = calculatePlanFitness(plan_totals)
        if (fitness > maxFitness) {
            maxFitness = fitness
            bestPlan = currentPlan
            console.log('plan: ', bestPlan.map(p => p.name), plan_totals, 'current fitness', fitness,)
        } else {
            currentPlan = previousPlan
        }

    }
}


const gradient_search = () => {

    let currentPlanFitness = -Number.MAX_VALUE

    let plan = []
    const productFitnessIncreaseMap = new Map()
    while (true) {

        for (let product of products) {
            plan.push(product)
            const totals = calculate_total_plan_values(plan)
            const fitness = calculatePlanFitness(totals)
            productFitnessIncreaseMap.set(product, fitness - currentPlanFitness)
            plan.pop()
        }

        let fitnessMaximizationProduct = 0
        let maxUtilityIncrease = 0
        for (const productUtitliyIncrease of productFitnessIncreaseMap) {
            if (maxUtilityIncrease < productUtitliyIncrease[1]) {
                fitnessMaximizationProduct = productUtitliyIncrease[0]
                maxUtilityIncrease = productUtitliyIncrease[1]

            }
        }
        if (maxUtilityIncrease <= 0) {
            break;
        }
        plan.push(fitnessMaximizationProduct)
        const totals = calculate_total_plan_values(plan)
        if (totals.calories > 2500 * 7) {
            break
        }
        currentPlanFitness += maxUtilityIncrease
        console.log(plan.map(e => e.name), 'utility', currentPlanFitness)
    }

}

const test_human_plan = () => {

    const plan = []
    for (let i = 0; i < 7; i++) {
        plan.push(products[1808])
    }
    for (let i = 0; i < 7 * 2; i++) {
        plan.push(products[14])
        plan.push(products[1045])
    }



    const totals = calculate_total_plan_values(plan)
    const result = calculatePlanFitness(totals)
    console.log('diffs: ', getPlanDiff(totals))
    console.log('fitness: ', result)
    console.log(plan[plan.length - 1].name)


}
test_human_plan()
// find_plan()
// const GA = require('canonical-ga');

// const ga = new GA({ maxIterations: 1000 });

// ga.newBestChromo = function (data) {
//     console.log('Fitness: ', data.fitness)
//     // console.log('new best -> Fitness: ' + data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
// }

// const MAX_PORTIONS = 4
// var evalFn = function (chromo) {


//     const plan = []
//     for (let i = 0; i < products.length; i++) {
//         for (let j = 0; j < MAX_PORTIONS; j++) {
//             if (Number.isNaN(chromo[i * MAX_PORTIONS + j])) {
//                 process.exit(1)
//             }
//             if (chromo[i * MAX_PORTIONS + j]) {
//                 plan.push(products[i])
//             }
//         }
//     }

//     const totals = calculate_total_plan_values(plan)
//     return calculatePlanFitness(totals)

// }

// ga.run(10, products.length * MAX_PORTIONS, evalFn, function (err, data) {
//     if (err) { console.error(err); return; }
//     console.dir(data);
// });